<template>
  <div style="width: 100%; height: 100%; position: relative">
    <!-- 控制面板 -->
    <Control v-if="state.lf" class="demo-control" :lf="state.lf" @catData="catData" />
    <!-- 节点面板 -->
    <NodePanel v-if="state.lf" :lf="state.lf" :node-list="nodeList" />
    <div style="width: 100%; height: 100%" id="lf-container"></div>
  </div>
  <a-modal
    v-model:visible="state.dataVisible"
    wrapClassName="show-flow-data"
    :footer="null"
    destroyOnClose
    title="查看数据"
  >
    <vue-json-pretty style="height: 100%; overflow-y: auto" :path="'res'" :data="state.graphData" />
  </a-modal>
</template>

<script setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import request from "@/utils/request";
import LogicFlow from "@logicflow/core";
import qs from 'qs'
import _ from 'lodash'
import {
  Menu,
  DndPanel,
  CurvedEdge,
  Snapshot,
  SelectionSelect,
} from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import { nodeList, themeApprove, constructorConfig } from "./config.js";
import Control from "./LFComponents/Control.vue";
import NodePanel from "./LFComponents/NodePanel.vue";
import ProRectNode from "./registerNode/proNode/RectNodeResize.js";
import ProTextNode from "./registerNode/proNode/TextNodeResize.js";
import {
  registerPush,
  registerRect,
  registerTask,
  registerLine,
  registerPolyline,
  registerDownload,
  registerEnd,
  registerUser,
  registerStart,
  registerFinish,
  registerCondition,
  registerInitiate,
} from "./registerNode/index.js";
const state = reactive({
  lf: null,
  graphData: null,
  dataVisible: false,
});
const handleOk = () => {
  state.dataVisible = false;
};
// window.LogicFlow = LogicFlow
const lfData = {
  nodes: [
    {
      id: "afcbc403-c9cf-41a8-b840-375082e82e03",
      type: "pro-text",
      x: 271,
      y: 718,
      properties: {},
      text: {
        x: 271,
        y: 718,
        value: "有功PK: ",
      },
    },
    {
      id: "dbf1e8d7-dab8-4b64-b08f-a9c75948b054",
      type: "pro-text",
      x: 325,
      y: 718,
      properties: { fontSize: '30px', },
      text: {
        x: 325,

        y: 718,
        value: "-2000.1",
      },
    },
    {
      id: "30d3e0d0-12e5-4922-8a31-aa4e7aae014b",
      type: "pro-rect",
      x: 300,
      y: 724,
      properties: {
        nodeSize: {
          width: 170,
          height: 92,
          fillOpacity: .5,
          stroke: 'red'
        },
      },
    },
    {
      id: "cc1395a3-a3d4-4ed0-9978-a9d9af0dfc4e",
      type: "pro-rect",
      x: 300,
      y: 648,
      properties: {
        nodeSize: {
          width: 298,
          height: 2,
        },
      },
    },
    {
      id: "92ba5e78-f22b-472c-981a-6dba6f0752b8",
      type: "pro-rect",
      x: 191,
      y: 774,
      properties: {
        nodeSize: {
          width: 2,
          height: 252,
        },
      },
    },
    {
      id: "309f82b4-c956-4b73-9e2b-e9460fa7e8e5",
      type: "condition",
      x: 191,
      y: 927,
      properties: {},
    },
  ],
  edges: [],
};
onMounted(() => {
  initLf();
});
const initLf = () => {
  // 初始化 画布配置
  // 使用插件
  // LogicFlow.use(Control); // 控制面板
  LogicFlow.use(Menu); // 右键菜单
  LogicFlow.use(DndPanel); // 拖拽面板
  LogicFlow.use(Snapshot);
  LogicFlow.use(SelectionSelect);
  LogicFlow.use(CurvedEdge); // 圆角曲线需要在扩展中引入
  state.lf = new LogicFlow({
    container: document.querySelector("#lf-container"),
    // isSilentMode: true, // 静默模式
    ...constructorConfig,
  });
  state.lf.setTheme(themeApprove); // 设置主题
  state.lf.openSelectionSelect(); // 开启节点多选
  registerNode();
};
// 自定义节点
const registerNode = () => {
  state.lf.register(ProRectNode);
  state.lf.register(ProTextNode);
  registerStart(state.lf); // 开始 节点
  registerFinish(state.lf); // 完结 节点
  registerCondition(state.lf); // 条件 节点
  registerInitiate(state.lf); // 发起 节点
  registerUser(state.lf); // 用户 节点
  registerEnd(state.lf); // 结束 节点
  registerDownload(state.lf); // 位置 节点
  registerPolyline(state.lf);
  registerLine(state.lf);
  registerTask(state.lf);
  registerPush(state.lf, clickPlus, mouseDownPlus);
  // registerRect(state.lf) // 自定义了矩形
  // registerConnect(state.lf) // 连接 节点 有问题(自定义html节点)
  render();
};
const render = () => {
  state.lf.render(lfData);
  LfEvent();
};
const LfEvent = () => {
  state.lf.on("node:mouseenter", ({ e, data }) => {
    // const nodeModel = state.lf.getNodeModel(data.id)
    console.log("node:mouseenter", e, "data", data);
    // console.log('node:mouseenter', nodeModel, nodeModel.height, nodeModel.width)
  });
  state.lf.on("node:mouseleave", () => {
    console.log("node:mouseleave");
  });
  state.lf.on("blank:mousemove", ({ e }) => {
    // console.log('blank:mousemove', e)
  });
};
const clickPlus = (e, attributes) => {
  e.stopPropagation();
  console.log("clickPlus", e, attributes);
  // const { clientX, clientY } = e
  // console.log(clientX, clientY)
  // this.$data.addPanelStyle.top = (clientY - 40) + 'px'
  // this.$data.addPanelStyle.left = clientX + 'px'
  // this.$data.showAddPanel = true
  // this.$data.addClickNode = attributes
};
const mouseDownPlus = (e, attributes) => {
  e.stopPropagation();
  console.log("mouseDownPlus", e, attributes);
};
const catData = () => {
  state.graphData = state.lf.getGraphData();
  console.log("catData", state.graphData.nodes);
  state.dataVisible = true;
};
request({
  url: '/weather/getflow',
  method: 'get'
}).then((res) => {
  console.log("getflow", res);
});
</script>
<style lang="scss">
.show-flow-data {
  overflow: hidden !important;
  .ant-modal {
    width: 720px !important;
    height: 100%;
    .ant-modal-content {
      height: 86%;
      .ant-modal-body {
        height: 92%;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.hover-panel {
  background: #000000a1;
  color: #fff;
  padding: 6px;
  border-radius: 6px;
}
.logic-flow-view {
  /* height: 100vh; */
  height: 100%;
  position: relative;
}
.demo-title {
  text-align: center;
  margin: 20px;
}
.demo-control {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}
#LF-view {
  /* width: calc(100% - 100px); */
  width: 100%;
  height: 100%;
  outline: none;
  /* margin-left: 50px; */
}
.time-plus {
  cursor: pointer;
}
.add-panel {
  position: absolute;
  z-index: 11;
  background-color: white;
  padding: 10px 5px;
}
.el-drawer__body {
  height: 80%;
  overflow: auto;
  margin-top: -30px;
  z-index: 3;
}
</style>
