<template>
  <div style="height: 100%;width:100%;">
    Antv-Demo---{{ state.tes }}
    <div id="container" style="height: 100%;width:100%;" />
  </div>
</template>

<script setup>
const data3 = {
  nodes: [
    {
      id: "node1",
      label: "Circle13",
      x: 850,
      y: 150
    },
    {
      id: "node2",
      label: "Circle2",
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    }
  ]
};
const data4 = {
  nodes: [
    {
      id: "node1",
      label: "122Circle",
      x: 850,
      y: 150
    },
    {
      id: "node2",
      label: "Circle2",
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    }
  ]
};
const state = reactive({
  tes: 'tesssss',
  testData: null,
  graph: null
})
state.testData = data3
const main = async () => {
  //   // 实例化 minimap 插件
  //   const minimap = new G6.Minimap({
  //     size: [100, 100],
  //     className: 'minimap',
  //     type: 'delegate',
  //   });
  //   // 实例化 Image Minimap 插件
  // const imageMinimap = new G6.ImageMinimap({
  //   width: 200,
  //   graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ'
  // });
  // const remoteData = {
  //   // 点集
  //   nodes: [
  //     {
  //       id: 'node1', // String，该节点存在则必须，节点的唯一标识
  //       x: 100, // Number，可选，节点位置的 x 值
  //       y: 200, // Number，可选，节点位置的 y 值
  //     },
  //     {
  //       id: 'node2', // String，该节点存在则必须，节点的唯一标识
  //       x: 300, // Number，可选，节点位置的 x 值
  //       y: 200, // Number，可选，节点位置的 y 值
  //     },
  //   ],
  //   // 边集
  //   edges: [
  //     {
  //       source: 'node1', // String，必须，起始点 id
  //       target: 'node2', // String，必须，目标点 id
  //     },
  //   ],
  // }
  // 实例化 grid 插件
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
  );
  const remoteData = await response.json();
  const nodes = remoteData.nodes;
  const edges = remoteData.edges;
  nodes.forEach((node) => {
    if (!node.style) {
      node.style = {};
    }
    node.style.lineWidth = 1;
    node.style.stroke = '#666';
    node.style.fill = 'steelblue';
    switch (node.class) {
      case 'c0': {
        node.type = 'circle';
        node.size = 30;
        break;
      }
      case 'c1': {
        node.type = 'rect';
        node.size = [35, 20];
        break;
      }
      case 'c2': {
        node.type = 'ellipse';
        node.size = [35, 20];
        break;
      }
    }
  });
  edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {};
    }
    edge.style.lineWidth = edge.weight;
    edge.style.opacity = 0.6;
    edge.style.stroke = 'grey';
  });

  G6.registerNode(
    'rect-xml',
    (cfg) => `
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }} keyshape="true" name="test">
    <text style={{ 
			marginTop: 2, 
			marginLeft: 50, 
      textAlign: 'center', 
      fontWeight: 'bold', 
      fill: '#fff' }} 
			name="title">${cfg.label || cfg.id}</text>
    <polygon style={{
      points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
          fill: 'red'
    }} />
        <polyline style={{ points: [[ 30, 30 ], [ 40, 20 ], [ 60, 100 ]] }} />
        <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 48, height: 48, marginTop: 100 }} />
  </rect>
`,
  );

  state.graph = new G6.Graph({
    container: 'container', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    // width: 800, // Number，必须，图的宽度
    // height: 500, // Number，必须，图的高度
    fitView: true,
    fitViewPadding: [20, 40, 50, 20],
    layout: {
      // type: 'force',
      preventOverlap: true,
      linkDistance: 100, // 指定边距离为100
    },
    // animate: true, // Boolean，可选，全局变化时否使用动画过渡
    // plugins: [grid], // 将 grid 实例配置到图上
    // plugins: [minimap], // 将 minimap 实例配置到图上
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node',
        {
          type: 'tooltip', // 提示框
          formatText(model) {
            // 提示框文本内容
            const text = 'label: ' + model.label + '<br/> class: ' + model.class;
            return text;
          },
        }, {
          type: 'edge-tooltip', // 边提示框
          formatText(model) {
            // 边提示框文本内容
            const text =
              'source: ' +
              model.source +
              '<br/> target: ' +
              model.target +
              '<br/> weight: ' +
              model.weight;
            return text;
          },
        },], // 允许拖拽画布、放缩画布、拖拽节点
    },
    nodeStateStyles: {
      // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
      hover: {
        fill: 'lightsteelblue',
      },
      // 鼠标点击节点，即 click 状态为 true 时的样式
      click: {
        stroke: '#000',
        lineWidth: 3,
      },
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
      // 鼠标点击边，即 click 状态为 true 时的样式
      click: {
        stroke: 'steelblue',
      },
    },
  })
  state.graph.data(state.testData); // 读取 Step 2 中的数据源到图上
  state.graph.render(); // 渲染图
  setTimeout(() => {
    state.testData = data4
    const gr = toRaw(state.graph)
    console.log(3312132333, gr)
    gr.changeData(state.testData)
  }, 3000)
  
}
onMounted(() => {
  main()

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