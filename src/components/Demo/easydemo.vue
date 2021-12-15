<template>
  <div style="height: 100%;width:100%;">
    easyDemo---
    <div id="container" style="height: 100%;width:100%;" />
  </div>
</template>

<script setup>
import Chart from '@antv/chart-node-g6';

const state = reactive({
  graph: null
})
const trendData = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const data = {
  nodes: [
    {
      id: 'node0',
      trendData: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      type: 'node-with-interval',
      x: 10,
      y: 100,
    },
    {
      id: 'node1',
      trendData,
      x: 550,
      y: 100,
    },
  ],
};
G6.registerNode('dom-node', {
  draw: (cfg, group) => {
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
G6.registerNode(
  'node-with-interval',
  {
    draw(cfg, group) {
      const keyShape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 400,
          height: 200,
          fill: cfg.style.fill,
        },
      });

      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 400,
          height: 40,
          fill: '#69c0ff',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '浏览申请完成率',
          x: 20,
          y: 25,
          fontSize: 24,
          fill: '#fff',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '2020-06-07 ~ 2020-06-14 | 均值',
          x: 20,
          y: 70,
          fontSize: 23,
          fill: '#8c8c8c',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '8.8%',
          x: 20,
          y: 110,
          fontSize: 30,
          fill: '#000',
        },
      });

      // 实际开发中把 (Chart || window.Chart) 换成 Chart
      // Replace (Chart || window.Chart) by Chart in your project
      const view = new Chart({
        group,
        padding: 1,
        width: 360,
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
const main = async () => {
  const container = document.getElementById('container');
  const width = container.scrollWidth;
  const height = (container.scrollHeight || 500) - 100;
  const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    // translate the graph to align the canvas's center, support by v3.5.1
    fitCenter: true,
    renderer: 'svg',
    linkCenter: true,
    defaultNode: {
      // type: 'node-with-interval',
      style: {
        fill: '#e6f7ff',
      },
    },
    nodeStateStyles: {
      hover: {
        stroke: '#b37feb',
      },
    },
    defaultEdge: {
      style: {
        lineWidth: 5,
        stroke: '#666',
      },
    },
    // defaultNode: {
    //   type: 'dom-node',
    //   size: [120, 40],
    // },
    modes: {
      default: ['drag-canvas', 'drag-node',
      ],

    },
  });

  graph.data(data);
  graph.render();
  // 点击节点，更新柱状图数据
  graph.on('node:click', (evt) => {
    const newTrendData = [
      { genre: 'Sports', sold: 75 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 320 },
      { genre: 'Shooter', sold: 150 },
      { genre: 'Other', sold: 250 },
    ];

    graph.updateItem(evt.item, {
      trendData: newTrendData,
    });
  });

  // click listener for dom nodes to response the click by changing stroke color
  // const listener = (dom) => {
  //   const nodeId = dom.id;
  //   if (!nodeId) return;
  //   const node = graph.findById(nodeId);
  //   let stroke = '';
  //   if (!node.hasState('selected')) {
  //     stroke = '#f00';
  //     graph.setItemState(node, 'selected', true);
  //   } else {
  //     stroke = '#5B8FF9';
  //     graph.setItemState(node, 'selected', false);
  //   }
  //   graph.updateItem(nodeId, {
  //     style: {
  //       stroke,
  //     },
  //   });
  // };

  // const bindClickListener = () => {
  //   const domNodes = document.getElementsByClassName('dom-node');
  //   for (let i = 0; i < domNodes.length; i++) {
  //     const dom = domNodes[i];
  //     // open the following lines pls!
  //     dom.addEventListener('click', (e) => {
  //       listener(dom);
  //     });
  //   }
  // };

  // bindClickListener();

  // after update the item, all the DOMs will be re-rendered
  // so the listeners should be rebinded to the new DOMs
  // graph.on('afterupdateitem', (e) => {
  //   bindClickListener();
  // });
  // graph.on('afterrender', (e) => {
  //   bindClickListener();
  // });
}
onMounted(() => {
  main()
})
onUnmounted(() => {
  // console.log('销毁grp');
  // const grp = toRaw(state.graph)
  // state.graph.destroy()
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