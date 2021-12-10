<template>
  <div>
    <!-- ssdsdsd::: -->
    <!-- <div>{{ test1Data }}</div>
    <div>{{ textData }}</div>-->
    <div>{{ options.barData }}</div>
    <div>{{ textData.four }}</div>
  </div>
</template>

<script setup>

const props = defineProps({
  textData: Object,
  test1Data: Number,
  options: Object
})
watch(() => props.options, () => {
  console.log(333333323,  toRaw(props.options.barData), toRaw(props.options.lineData) )
})
onMounted(()=>{
  // console.log(333333323,  props.textData.one.name, toRaw(props.options.barData), props.options.barData )

})
// console.log('--------', props.test1Data, props.textData.one);

</script>


<style lang="scss" scoped>
</style>