<template>
    <a-button-group>
      <!-- <a-button size="small" @click="setEdgeType('line', '直线')">直线</a-button>
      <a-button size="small" @click="setEdgeType('polyline', '折线')">折线</a-button>
      <a-button size="small" @click="setEdgeType('curved-edge', '圆角折线')">圆角折线</a-button>
      <a-button size="small" @click="setEdgeType('bezier', '曲线')">曲线</a-button>-->

      <a-button size="small" @click="$_zoomIn">放大</a-button>
      <a-button size="small"  @click="$_zoomOut">缩小</a-button>
      <!-- <a-button size="small" @click="$_zoomReset">大小适应</a-button> -->
      <a-button size="small" @click="$_translateRest">定位还原</a-button>
      <!-- <a-button size="small" @click="$_reset">还原(大小&定位)</a-button> -->
      <!-- <a-button size="small" @click="$_undo" :disabled="undoDisable">上一步(ctrl+z)</a-button> -->
      <!-- <a-button size="small" @click="$_redo" :disabled="redoDisable">下一步(ctrl+y)</a-button> -->
      <a-button size="small" @click="$_download">下载图片</a-button>
      <a-button size="small" @click="$_catData">查看数据</a-button>
      <!-- <a-button v-if="catTurboData" size="small" @click="$_catTurboData">查看turbo数据</a-button> -->
    </a-button-group>
</template>

<script setup>


const emit = defineEmits(['catData'])
const props = defineProps({
  lf: Object || String,
  catTurboData: Boolean
})
const state = reactive({
  undoDisable: true,
  redoDisable: true,
  graphData: null,
  dataVisible: false
})
onMounted(() => {
  props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
    console.log('监听每次操作');
    state.undoDisable = !undoAble
    state.redoDisable = !redoAble
  })
})
const setEdgeType = (type) => {
  props.lf.setDefaultEdgeType(type)
}
const $_zoomIn = () => {
  props.lf.zoom(true)
}
const $_zoomOut = () => {
  props.lf.zoom(false)
}
const $_zoomReset = () => {
  props.lf.resetZoom()
}
const $_translateRest = () => {
  props.lf.resetTranslate()
}
const $_reset = () => {
  props.lf.resetZoom()
  props.lf.resetTranslate()
}
const $_undo = () => {
  props.lf.undo()
}
const $_redo = () => {
  props.lf.redo()
}
const $_download = () => {
  props.lf.getSnapshot()
}
const $_catData = () => {
  emit('catData', '查看数据')
}
// const $_catTurboData= () => {
//   emit('catTurboData')
// }
</script>

<style lang="scss" scoped>
</style>