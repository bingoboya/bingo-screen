<template>
  <div style="height: 100%;width:100%;">
    AntvDemo
    <div id="container" style="height: 100%;width:100%;" />
  </div>
</template>

<script setup>
import request from '@/utils/request';
import qs from 'qs'
import _ from 'lodash'
// import { data1, data2, data3 } from './testData.js'
import { newGraph, } from '@/components/AntvDemo/newGraph.js'
import testImage from '@/assets/userAvatar.jpeg'
import three from '@/assets/three.svg'
import two from '@/assets/two.svg'
import bolang from '@/assets/bolang.svg'
import Chart from '@antv/chart-node-g6';
const Util = G6.Util;


const state = reactive({
  graph: null,
  testImage,
  three,
  bolang,
  two,
  antvData: {}
})
let addedCount = 0;
const registerBehaviors = () => {
  G6.registerBehavior('click-add-node', {
    // Set the events and the corresponding responsing function for this behavior
    getEvents() {
      // The event is canvas:click, the responsing function is onClick
      return {
        'canvas:click': 'onClick',
      };
    },
    // Click event
    onClick(ev) {
      const self = this;
      // const graph = self.state.graph;
      // Add a new node
      state.graph.addItem('node', {
        x: ev.canvasX,
        y: ev.canvasY,
        id: `node-${addedCount}`, // Generate the unique id
      });
      addedCount++;
    },
  });
}
const main = async () => {
  G6.registerNode( // 注册节点 Scale Animation
    'circle-animate',
    {
      afterDraw(cfg, group) {
        const shape = group.get('children')[0];
        shape.animate(
          (ratio) => {
            const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
            return {
              r: cfg.size / 2 + diff,
            };
          },
          {
            repeat: true,
            duration: 3000,
            easing: 'easeCubic',
          },
        );
      },
    },
    'circle',
  );
  G6.registerNode( // 注册节点 Background Animation
    'background-animate',
    {
      afterDraw(cfg, group) {
        const r = cfg.size / 2;
        const back1 = group.addShape('circle', {
          zIndex: -3,
          attrs: {
            x: 0,
            y: 0,
            r,
            fill: cfg.color,
            opacity: 0.6,
          },
          name: 'back1-shape',
        });
        const back2 = group.addShape('circle', {
          zIndex: -2,
          attrs: {
            x: 0,
            y: 0,
            r,
            fill: cfg.color,
            opacity: 0.6,
          },
          name: 'back2-shape',
        });
        const back3 = group.addShape('circle', {
          zIndex: -1,
          attrs: {
            x: 0,
            y: 0,
            r,
            fill: cfg.color,
            opacity: 0.6,
          },
          name: 'back3-shape',
        });
        group.sort(); // Sort according to the zIndex
        back1.animate(
          {
            // Magnifying and disappearing
            r: r + 10,
            opacity: 0.1,
          },
          {
            duration: 3000,
            easing: 'easeCubic',
            delay: 0,
            repeat: true, // repeat
          },
        ); // no delay
        back2.animate(
          {
            // Magnifying and disappearing
            r: r + 10,
            opacity: 0.1,
          },
          {
            duration: 3000,
            easing: 'easeCubic',
            delay: 1000,
            repeat: true, // repeat
          },
        ); // 1s delay
        back3.animate(
          {
            // Magnifying and disappearing
            r: r + 10,
            opacity: 0.1,
          },
          {
            duration: 3000,
            easing: 'easeCubic',
            delay: 2000,
            repeat: true, // repeat
          },
        ); // 3s delay
      },
    },
    'circle',
  );
  G6.registerNode( // 注册节点 Image animation
    'inner-animate',
    {
      getAnchorPoints() {
        return [
          [0, 0.5], // 左侧中间
          [1, 0.5], // 右侧中间
        ];
      },
      afterDraw(cfg, group) {
        const size = cfg.size;
        const width = size[0] - 12;
        const height = size[1] - 12;
        const image = group.addShape('image', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            width,
            height,
            img: state[cfg.img],
          },
          name: 'image-shape',
        });
        // image.animate(
        //   (ratio) => {
        //     const toMatrix = Util.transform(
        //       [1, 0, 0, 0, 1, 0, 0, 0, 1],
        //       [['r', ratio * Math.PI * 2]],
        //     );
        //     return {
        //       matrix: toMatrix,
        //     };
        //   },
        //   {
        //     repeat: true,
        //     duration: 3000,
        //     easing: 'easeCubic',
        //   },
        // );
      },
    },
    'rect',
  );
  G6.registerEdge( // 注册边
    'circle-running',
    {
      afterDraw(cfg, group) {
        // get the first shape in the group, it is the edge's path here=
        const shape = group.get('children')[0];
        // the start position of the edge's path
        const startPoint = shape.getPoint(0);

        // add red circle shape
        const circle = group.addShape('circle', {
          attrs: {
            x: startPoint.x,
            y: startPoint.y,
            fill: '#1890ff',
            r: 3,
          },
          name: 'circle-shape',
        });

        // animation for the red circle
        circle.animate(
          (ratio) => {
            // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
            // get the position on the edge according to the ratio
            const tmpPoint = shape.getPoint(ratio);
            // returns the modified configurations here, x and y here
            return {
              x: tmpPoint.x,
              y: tmpPoint.y,
            };
          },
          {
            repeat: true, // Whether executes the animation repeatly
            duration: 3000, // the duration for executing once
          },
        );
      },
    },
    'cubic', // extend the built-in edge 'cubic'
  );
  G6.registerNode('justline', { // 使用svg的path自定义直线
    draw(cfg, group) {
      console.log('justline', group);
      // 如果 cfg 中定义了 style 需要同这里的属性进行融合
      const keyShape = group.addShape('path', {
        attrs: {
          path: this.getPath(cfg), // 根据配置获取路径
          stroke: cfg.color, // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
          lineWidth: 6, // 设置直线的宽度
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'path-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      if (cfg.label) {
        // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        const label = group.addShape('text', {
          // attrs: style
          attrs: {
            x: 0, // 居中
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.label,
            fill: '#666',
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'text-shape',
          // 设置 draggable 以允许响应鼠标的图拽事件
          draggable: true,
        });
      }
      return keyShape;
    },
    // 返回菱形的路径
    getPath(cfg) {
      const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
      const width = size[0];
      const height = size[1];
      //  / 1 \
      // 4     2
      //  \ 3 /
      const path = [
        ['M', 0, 0 - height / 2], // 上部顶点
        ['L', width / 2, 0], // 右侧顶点
        // ['L', 0, height / 2], // 下部顶点
        // ['L', -width / 2, 0], // 左侧顶点
        // ['Z'], // 封闭
      ];
      return path;
    },
  });
  G6.registerNode('justpath', { // 使用svg的path自定义直线
    draw(cfg, group) {
      console.log('justpath', group);
      // 如果 cfg 中定义了 style 需要同这里的属性进行融合
      const keyShape = group.addShape('path', {
        attrs: {
          // startArrow: {
          //   // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
          //   path: 'M 0,0 L 20,10 L 20,-10 Z',
          //   // 箭头的偏移量，负值代表向 x 轴正方向移动
          //   // d: -10,
          // },
          // endArrow: {
          //   // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
          //   path: 'M 0,0 L 20,10 L 20,-10 Z',
          //   // 箭头的偏移量，负值代表向 x 轴正方向移动
          //   // d: -10,
          // },
          path: [
            ['M', 100, 100],
            ['L', 200, 100],
          ],
          stroke: '#000',
          lineWidth: 18,
          lineAppendWidth: 5,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'path-shape',
      });
      if (cfg.label) {
        // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        const label = group.addShape('text', {
          // attrs: style
          attrs: {
            x: 0, // 居中
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.label,
            fill: '#666',
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'text-shape',
          // 设置 draggable 以允许响应鼠标的图拽事件
          draggable: true,
        });
      }
      return keyShape;
    },
    // 返回菱形的路径
    getPath(cfg) {
      const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
      const width = size[0];
      const height = size[1];
      //  / 1 \
      // 4     2
      //  \ 3 /
      const path = [
        ['M', 0, 0 - height / 2], // 上部顶点
        ['L', width / 2, 0], // 右侧顶点
        // ['L', 0, height / 2], // 下部顶点
        // ['L', -width / 2, 0], // 左侧顶点
        // ['Z'], // 封闭
      ];
      return path;
    },
  });
  G6.registerNode('custompath', { // 使用svg的path自定义电力符号
    draw(cfg, group) {
      console.log('justpath', group);
      // 如果 cfg 中定义了 style 需要同这里的属性进行融合
      const keyShape = group.addShape('path', {
        attrs: {
          path: this.getPath(cfg).path, // 根据配置获取路径
          stroke: cfg.color || 'red', // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
          lineWidth: 2,
          fill: cfg.fill || "transparent",
          lineAppendWidth: 5,
        },
        name: 'path-shape',
      });
      const { width, height, path } = this.getPath(cfg)
      console.log(333333, width);
      // 倾斜的对角线
      group.addShape('path', {
        attrs: {
          path: `M ${width} 0 L 0 ${height}`, // 根据配置获取路径
          stroke: cfg.color || 'red', // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
          lineWidth: 2,
          fill: cfg.fill || "transparent",
          lineAppendWidth: 5,
        },
        name: 'slash-shape',
      });
      group.addShape('path', {
        attrs: {
          path: `M ${width / 2} ${height / 4 * 3} H ${width / 4 * 3}`, // 根据配置获取路径
          stroke: cfg.color || 'red', // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
          lineWidth: 2,
          fill: cfg.fill || "transparent",
          lineAppendWidth: 5,
        },
        name: 'slash-shape',
      });
      group.addShape('path', {
        attrs: {
          path: 'M 4 10 C 8 3, 8 3, 8 10 S 10 10, 16 10',
          // path: 'M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80',
          // path: `M ${width/2} ${height/4*3} H ${width/4*3}`, // 根据配置获取路径
          stroke: cfg.color || 'red', // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
          lineWidth: 2,
          fill: cfg.fill || "transparent",
          lineAppendWidth: 5,
        },
        name: 'slash-shape',
      });
      return keyShape;
    },
    // 返回菱形的路径
    getPath(cfg) {
      const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
      const width = size[0];
      const height = size[1];
      const path = `M0 0 H ${width} V ${height} H 0 Z`
      return { width, height, path };
    },
  });
  G6.registerNode( // 有bug
    'dom-node', {
    draw: (cfg, group) => {
      console.log('dom-node-group', group);
      const stroke = cfg.style ? cfg.style.stroke || '#5B8FF9' : '#5B8FF9';
      const shape = group.addShape('dom', {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          html: `
        <div id=${cfg.id
            } class='dom-node' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px; width: ${cfg.size[0] - 5
            }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="" style="line-height: 100%; margin-left: 7px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `,
        },
        draggable: true,
      });
      return shape;
    },
  });
  G6.registerNode('rect-xml', {
    jsx: (cfg) => `
    <group>
      <rect style={{
        width: 220,
        height:1,
      }}>
        <rect style={{
          width: 150,
          height: 55,
          stroke: ${cfg.color},
          fill: #ffffff,
          radius: [0, 0, 6, 6],
        }}>
          <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
          <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
        </rect>
      </rect>
      <circle style={{
        stroke: ${cfg.color},
        r: 10,
        fill: '#fff',
        marginLeft: 75,
        cursor: 'pointer'
      }} name="circle">
        <image name="img" style={{ img: ${testImage}, width: 12, height: 12,  marginLeft: 69,  marginTop: -5 }} />
      </circle>
    </group>
  `,
    afterDraw: (cfg, group) => {
      console.log(group);
      const img = group.findAllByName('img');
      if (img[0]) {
        img[0].animate(
          (ratio) => {
            return {
              opacity: Math.abs(0.5 - ratio),
            };
          },
          {
            duration: 3000,
            repeat: true,
          },
        );
      }
    },
  });
  G6.registerNode( //g2柱状图
    'node-with-interval',
    {
      draw(cfg, group) {
        const keyShape = group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 200,
            fill: cfg.style.fill,
          },draggable: true,
        });

        group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            fill: '#69c0ff',
          },draggable: true,
        });

        group.addShape('text', {
          attrs: {
            text: '完成率',
            x: 20,
            y: 25,
            fontSize: 24,
            fill: '#fff',
          },draggable: true,
        });

        group.addShape('text', {
          attrs: {
            text: '均值',
            x: 20,
            y: 70,
            fontSize: 23,
            fill: '#8c8c8c',
          },draggable: true,
        });
        console.log('g2柱状图：', cfg)
        group.addShape('text', {
          attrs: {
            text: '8.8%',
            x: 20,
            y: 110,
            fontSize: 30,
            fill: '#000',
          },draggable: true,
        });
        // 实际开发中把 (Chart || window.Chart) 换成 Chart
        // Replace (Chart || window.Chart) by Chart in your project
        const view = new Chart({
          group,
          padding: 1,
          width: 100,
          height: 70,
          x: 20,
          y: 100,
        });

        view.data(cfg.trendData);

        view.interval().position('genre*sold').color('genre');

        view.legend('genre', false);

        view.scale({
          genre: {
            alias: '游戏种类1111111', // 列定义，定义该属性显示的别名
          },
          sold: {
            alias: '销售量2222222',
          },
        });

        view.axis('sold', false);

        // 极坐标下的柱状图
        // view.coordinate('polar');

        view.render();

        keyShape.set('intervalView', view);

        return keyShape;
      },
      update(cfg, item) {
        const keyShape = item.getKeyShape();
        const view = keyShape.get('intervalView');
        view.changeData(cfg.trendData);
      },
    },
    'single-node',
  );
  G6.registerNode('diamond', {
    draw(cfg, group) {
      console.log('diamond');
      // 如果 cfg 中定义了 style 需要同这里的属性进行融合
      const keyShape = group.addShape('path', {
        attrs: {
          path: this.getPath(cfg), // 根据配置获取路径
          stroke: cfg.color, // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'path-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      if (cfg.label) {
        console.log('cf1g', cfg);
        // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        const label = group.addShape('text', {
          // attrs: style
          attrs: {
            x: 0, // 居中
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.label,
            fill: '#666',
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'text-shape',
          // 设置 draggable 以允许响应鼠标的图拽事件
          draggable: true,
        });
      }
      return keyShape;
    },
    // 返回菱形的路径
    getPath(cfg) {
      const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
      const width = size[0];
      const height = size[1];
      //  / 1 \
      // 4     2
      //  \ 3 /
      const path = [
        ['M', 0, 0 - height / 2], // 上部顶点
        ['L', width / 2, 0], // 右侧顶点
        ['L', 0, height / 2], // 下部顶点
        ['L', -width / 2, 0], // 左侧顶点
        ['Z'], // 封闭
      ];
      return path;
    },
  });
  // 电池组件
  G6.registerNode('diamond2', {
    draw(cfg, group) {
      console.log('diamond2');
      // 主外框
      const keyShape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 40,
          height: 100,
          fill: 'green',
          // fill: cfg.style.fill,
          radius: [4, 4, 4, 4],
        },
        name: 'radio-react',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      // 电池的头部
      group.addShape('rect', {
        attrs: {
          x: 11,
          y: -4,
          width: 16,
          height: 8,
          fill: '#b5afaf',
          radius: [2, 2, 0, 0],
        },
        name: 'left-border-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      // 上半部分负责填充
      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 40,
          height: cfg.height,
          fill: '#837e7e',
          radius: [4, 4, 0, 0],
        }, name: 'radio-change-react',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true
      });
      // 如果 cfg 中定义了 height 需要同这里的属性进行融合
      if (cfg.height) {
        console.log('diamond2-cf1g', cfg);
        // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        const label = group.addShape('text', {
          attrs: {
            x: 20, // 居中
            y: 50,
            textAlign: 'center',
            textBaseline: 'middle',
            text: `${100 - cfg.height}%`,
            fill: '#000',
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'text-shape',
          // 设置 draggable 以允许响应鼠标的图拽事件
          draggable: true,
        });
      }
      return keyShape;
    },
  });

  /**
   * 自定义 储能系统信息 节点 (sysinfo节点)
  */
  const getNodeConfig = (node) => {
    let config = {
      basicColor: '#5B8FF9',
      fontColor: '#5B8FF9',
      borderColor: '#5B8FF9',
      bgColor: '#C6E5FF',
    };
    return config;
  };
  const nodeBasicMethod = {
    createNodeBox: (group, config, w, h, cfg) => {
      /* 最外面的大矩形 */
      const container = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: w,
          heigh: h,
        },
        name: 'big-rect-shape',
        draggable: true,
      });
      /* 矩形 */
      group.addShape('rect', {
        attrs: {
          x: 3,
          y: 0,
          width: w - 19,
          height: h,
          fill: config.bgColor,
          fillOpacity: 0.1,
          stroke: 'green',
          // stroke: config.borderColor,
          radius: 12,
          lineDash: [10],
          lineWidth: 1,
          cursor: 'pointer',
        },
        name: 'rect-shape',
        draggable: true,
      });
      // 头部标题
      group.addShape('rect', {
        attrs: {
          x: w / 4,
          y: -14,
          width: w / 4 * 2,
          height: 28,
          fill: '#b5afaf',
          fillOpacity: 1,
          radius: 12,
          lineDash: [10],
          lineWidth: 3,
          radius: [2, 2, 0, 0],
        },
        name: 'left-border-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      const label = group.addShape('text', {
        attrs: {
          x: w / 2, // 居中
          y: 0,
          fontSize: 20,
          textAlign: 'center',
          textBaseline: 'middle',
          text: '储能系统信息',
          fill: '#666',
        },
        name: 'text-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      group.addShape('rect', {
        attrs: {
          x: w - 80,
          y: 40,
          width: 40,
          height: 100,
          fill: 'green',
          // fill: cfg.style.fill,
          radius: [4, 4, 4, 4],
        },
        name: 'radio-react',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      // 电池的头部
      group.addShape('rect', {
        attrs: {
          x: w - 80 + 12,
          y: 33,
          width: 16,
          height: 8,
          fill: '#b5afaf',
          radius: [2, 2, 0, 0],
        },
        name: 'left-border-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      console.log('上半部分负责填充', config)
      // 上半部分负责填充
      group.addShape('rect', {
        attrs: {
          x: w - 80,
          y: 40,
          width: 40,
          height: cfg.content.chartpercent,
          fill: '#837e7e',
          radius: [4, 4, 0, 0],
        }, name: 'radio-change-react',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true
      });
      // 如果 cfg 中定义了 height 需要同这里的属性进行融合
      if (cfg.content.chartpercent) {
        // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        const label = group.addShape('text', {
          attrs: {
            x: w - 80 + 20, // 居中
            y: 90,
            textAlign: 'center',
            textBaseline: 'middle',
            text: `${100 - cfg.content.chartpercent}%`,
            fill: '#000',
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'text-shape',
          // 设置 draggable 以允许响应鼠标的图拽事件
          draggable: true,
        });
      }
      return container;
    },
    afterDraw: (cfg, group) => { },
    setState: (name, value, item) => { },
  };
  G6.registerNode('sysinfo', {
    draw: (cfg, group) => {
      console.log('sysinfo-------');
      const config = getNodeConfig(cfg);
      const width = 343
      const height = 164
      /* the biggest rect */
      const container = nodeBasicMethod.createNodeBox(group, config, width, height, cfg);
      group.addShape('text', { /* name */
        attrs: {
          text: cfg.name,
          x: 9,
          y: 19,
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
          cursor: 'pointer',
        },
        name: 'name-text-shape',
      });
      group.addShape( //放电状态
        'text', { /* the description text */
        attrs: {
          text: '放电状态',
          x: 19,
          y: 45,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'fangdian',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '放电闭锁',
          x: 19,
          y: 65,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'chuneng',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '充电状态',
          x: 19,
          y: 85,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '充电闭锁',
          x: 19,
          y: 105,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '功率指令',
          x: 89,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '储能功率',
          x: 89,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '可充功率',
          x: 89,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '可放功率',
          x: 89,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '可充电量',
          x: 89,
          y: 115,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '可放电量',
          x: 89,
          y: 135,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });

      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num1,
          x: 159,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
          // fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num2,
          x: 159,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num3,
          x: 159,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num4,
          x: 159,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num5,
          x: 159,
          y: 115,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num6,
          x: 159,
          y: 135,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });

      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 189,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 189,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 189,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 189,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MWh',
          x: 189,
          y: 115,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MWh',
          x: 189,
          y: 135,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      
      return container;
    },
    afterDraw: nodeBasicMethod.afterDraw,
    setState: nodeBasicMethod.setState,
  })

  /**
   * 自定义 statusinfo节点
  */
  const getNodeStatusConfig = (node) => {
    let config = {
      basicColor: '#5B8FF9',
      fontColor: '#5B8FF9',
      borderColor: '#5B8FF9',
      bgColor: '#C6E5FF',
    };
    return config;
  };
  const nodeBasicStatusMethod = {
    createNodeBox: (group, config, w, h, cfg) => {
      /* 最外面的大矩形 */
      const container = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: w,
          heigh: h,
        },
        name: 'big-rect-shape',
        draggable: true,
      });
      /* 矩形 */
      group.addShape('rect', {
        attrs: {
          x: 3,
          y: 0,
          width: w - 19,
          height: h,
          fill: config.bgColor,
          fillOpacity: 0.1,
          stroke: 'green',
          // stroke: config.borderColor,
          radius: 12,
          lineDash: [10],
          lineWidth: 1,
          cursor: 'pointer',
        },
        name: 'rect-shape',
        draggable: true,
      });
      return container;
    },
    afterDraw: (cfg, group) => { },
    setState: (name, value, item) => { },
  };
  G6.registerNode( // 调试状态 节点
    'statusinfo', {
    draw: (cfg, group) => {
      const config = getNodeStatusConfig(cfg);
      const width = 200
      const height = 144
      /* the biggest rect */
      const container = nodeBasicStatusMethod.createNodeBox(group, config, width, height, cfg);
      group.addShape('text', { /* name */
        attrs: {
          text: cfg.name,
          x: 9,
          y: 19,
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
          cursor: 'pointer',
        },
        name: 'name-text-shape',
      });
      const title = cfg.content.titlenum
      group.addShape('text', { /* the description text */
        attrs: {
          text: `#${title} AGC指令`,
          x: 20,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `#${title} 联合功率`,
          x: 20,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `#${title} 机组功率`,
          x: 20,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text:  `#${title} 储能功率`,
          x: 20,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num1,
          x: 110,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
          // fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num2,
          x: 110,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num3,
          x: 110,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num4,
          x: 110,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });

      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 140,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 140,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 140,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'MW',
          x: 140,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `#${title}机组一次调试状态`,
          x: 35,
          y: 120,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      return container;
    },
    afterDraw: nodeBasicStatusMethod.afterDraw,
    setState: nodeBasicStatusMethod.setState,
  })

  /**
   * 自定义 wholedata节点
  */
  const getNodeWholeDataConfig = (node) => {
    let config = {
      basicColor: '#5B8FF9',
      fontColor: '#5B8FF9',
      borderColor: '#5B8FF9',
      bgColor: '#C6E5FF',
    };
    return config;
  };
  const nodeBasicWholeDataMethod = {
    createNodeBox: (group, config, w, h, cfg) => {
      /* 最外面的大矩形 */
      const container = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: w,
          heigh: h,
        },
        name: 'big-rect-shape',
        draggable: true,
      });
      /* 矩形 */
      group.addShape('rect', {
        attrs: {
          x: 3,
          y: 0,
          width: w - 19,
          height: h,
          fill: config.bgColor,
          fillOpacity: 0.1,
          stroke: 'green',
          // stroke: config.borderColor,
          radius: 12,
          lineDash: [10],
          lineWidth: 1,
          cursor: 'pointer',
        },
        name: 'rect-shape',
        draggable: true,
      });
      return container;
    },
    afterDraw: (cfg, group) => { },
    setState: (name, value, item) => { },
  };
  G6.registerNode( // 调试状态 节点
    'wholedata', {
    draw: (cfg, group) => {
      const config = getNodeWholeDataConfig(cfg);
      const width = 200
      const height = 214
      /* the biggest rect */
      const container = nodeBasicWholeDataMethod.createNodeBox(group, config, width, height, cfg);
      group.addShape('text', { /* name */
        attrs: {
          text: cfg.name,
          x: 9,
          y: 19,
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
          cursor: 'pointer',
        },
        name: 'name-text-shape',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '有功P(KW)：',
          x: 100,
          y: 35,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: '无功Q(KVar)：',
          x: 100,
          y: 55,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `频率F(Hz)：`,
          x: 100,
          y: 75,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text:  `线电压1：`,
          x: 100,
          y: 95,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `线电压2：`,
          x: 100,
          y: 115,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `线电压3：`,
          x: 100,
          y: 135,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `A相电流(A)：`,
          x: 100,
          y: 155,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text:  `B相电流(A)：`,
          x: 100,
          y: 175,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `C相电流(A)：`,
          x: 100,
          y: 195,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });

      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num1,
          x: 110,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
          // fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num2,
          x: 110,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num3,
          x: 110,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num4,
          x: 110,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num5,
          x: 110,
          y: 115,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num6,
          x: 110,
          y: 135,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num7,
          x: 110,
          y: 155,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num8,
          x: 110,
          y: 175,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num9,
          x: 110,
          y: 195,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      
      return container;
    },
    afterDraw: nodeBasicWholeDataMethod.afterDraw,
    setState: nodeBasicWholeDataMethod.setState,
  })

  /**
   * 自定义 pkdata节点 
  */
  const getNodePkDataConfig = (node) => {
    let config = {
      basicColor: '#5B8FF9',
      fontColor: '#5B8FF9',
      borderColor: '#5B8FF9',
      bgColor: '#C6E5FF',
    };
    return config;
  };
  const nodeBasicPkDataMethod = {
    createNodeBox: (group, config, w, h, cfg) => {
      /* 最外面的大矩形 */
      const container = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: w,
          heigh: h,
        },
        name: 'big-rect-shape',
        draggable: true,
      });
      /* 矩形 */
      group.addShape('rect', {
        attrs: {
          x: 3,
          y: 0,
          width: w - 19,
          height: h,
          fill: config.bgColor,
          fillOpacity: 0.1,
          stroke: 'green',
          // stroke: config.borderColor,
          radius: 12,
          lineDash: [10],
          lineWidth: 1,
          cursor: 'pointer',
        },
        name: 'rect-shape',
        draggable: true,
      });
      return container;
    },
    afterDraw: (cfg, group) => { },
    setState: (name, value, item) => { },
  };
  G6.registerNode( // Pk 节点
    'pkdata', {
    draw: (cfg, group) => {
      const config = getNodePkDataConfig(cfg);
      const width = 200
      const height = 160
      /* the biggest rect */
      const container = nodeBasicPkDataMethod.createNodeBox(group, config, width, height, cfg);
      group.addShape('text', { /* name */
        attrs: {
          text: cfg.name,
          x: 9,
          y: 19,
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: config.fontColor,
          cursor: 'pointer',
        },
        name: 'name-text-shape',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'P(KW)：',
          x: 100,
          y: 35,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: 'Q(KVar)：',
          x: 100,
          y: 55,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `La(A)：`,
          x: 100,
          y: 75,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text:  `Lb(A)：`,
          x: 100,
          y: 95,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `Lc(A)：`,
          x: 100,
          y: 115,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: `P(Hz)：`,
          x: 100,
          y: 135,
          fontSize: 14,
          textAlign: 'right',
          textBaseline: 'middle',
          fill: config.fontColor,
        },
        name: 'congdian2',
      });


      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num1,
          x: 110,
          y: 35,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
          // fill: config.fontColor,
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num2,
          x: 110,
          y: 55,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num3,
          x: 110,
          y: 75,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num4,
          x: 110,
          y: 95,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num5,
          x: 110,
          y: 115,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });
      group.addShape('text', { /* the description text */
        attrs: {
          text: cfg.content.num6,
          x: 110,
          y: 135,
          fontSize: 14,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: 'green',
        },
        name: 'congdian2',
      });

      return container;
    },
    afterDraw: nodeBasicPkDataMethod.afterDraw,
    setState: nodeBasicPkDataMethod.setState,
  })

  registerBehaviors()
  // 实例化graph
  const graph = newGraph(document.getElementById('container'))
  state.graph = graph
  const rawAntvData = toRaw(state.antvData)
  console.log('antvData', state.antvData, rawAntvData);
  // graph.data(data1);
  graph.data(rawAntvData);
  graph.render();
  // setTimeout(() => {
  //   console.log('3000-从新渲染数据', data2);
  //   // graph.changeData(data2);
  // }, 3000);
  // 切换默认行为 Listen to the selector, change the mode when the selector is changed
  selector.addEventListener('change', (e) => {
    const value = e.target.value;
    // change the behavior mode
    state.graph.setMode(value);
    console.log('state.graph.save()', state.graph.save());
  });
}
onMounted(async () => {
  state.antvData = await getAntvData()
  await main()
  setInterval(() => {
    getAntvDataLoop()
  }, 3000)
})
const getAntvDataLoop = async () => {
  const newData = await getAntvData()
  const grp = toRaw(state.graph)
  // console.log('轮询--从新渲染数据newData', newData)
  // 更新数据时要重新赋值才会更新视图
  grp && grp.changeData(newData);
}
const getAntvData = async () => {
  return request({
    url: '/weather/getantvdata',
    method: 'get'
  })
}
onUnmounted(() => {
  console.log('销毁grp');
  // const grp = toRaw(state.graph)
  state.graph.destroy()
  state.graph = null
})
</script>

<style lang="scss">
/* 提示框的样式 */
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>