export const themeApprove = {
  circle: {
    // outlineColor: '#88f',
    // strokeWidth: 1,
    r: 20,
    stroke: '#aae0a8'
  },
  rect: { // 矩形样式
    radius: 8,
    width: 100,
    height: 34,
    stroke: '#6495ED'
  },
  polygon: {
    strokeWidth: 1
  },
  line: {
    stroke: '#000000',
    hoverStroke: '#000000',
    selectedStroke: '#000000',
    // outlineColor: '#88f',
    strokeWidth: 2
  },
  polyline: {
    // stroke: '#000000',
    hoverStroke: '#000000',
    // selectedStroke: '#000000',
    // outlineColor: '#88f',
    strokeWidth: 1
  },
  nodeText: {
    color: '#000000'
  },
  edgeText: {
    color: '#000000',
    background: {
      fill: '#f7f9ff'
    }
  }
}

export const nodeList = [{
    text: '发起',
    type: 'initiate',
    class: 'node-initiate'
  },
  // {
  //   text: '流程',
  //   type: 'process',
  //   class: 'node-process'
  // },
  {
    text: '条件',
    type: 'condition',
    class: 'node-condition'
  },
  {
    text: '完结',
    type: 'finish',
    class: 'node-finish'
  },
  {
    text: 'pro-rect',
    type: 'pro-rect',
    class: 'node-finish'
  },
  {
    text: 'pro-text',
    type: 'pro-text',
    class: 'node-finish'
  },
  {
    text: '开始',
    type: 'start',
    class: 'node-start'
  },
  {
    text: '矩形',
    type: 'rect',
    class: 'node-rect'
  },
  {
    type: 'rect',
    text: '开始ss',
    label: '开始节点',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
  },
  {
    text: '文本',
    type: 'text',
    class: 'node-text',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
  },
  {
    type: 'user',
    text: '用户',
    class: 'node-user'
  },
  {
    type: 'push',
    text: '推送1',
    class: 'node-push'
  },
  {
    type: 'download',
    text: '位置',
    class: 'node-download'
  },
  {
    type: 'connect',
    text: '连接',
    class: 'node-push'
  },
  {
    type: 'end',
    text: '结束',
    class: 'node-end'
  },
];

export const BpmnNode = [{
    type: 'bpmn:startEvent',
    text: '开始',
    class: 'bpmn-start'
  },
  {
    type: 'bpmn:endEvent',
    text: '结束',
    class: 'bpmn-end'
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: '网关',
    class: 'bpmn-exclusiveGateway'
  },
  {
    type: 'bpmn:userTask',
    text: '用户',
    class: 'bpmn-user'
  },
]

// 画板配置项
export const constructorConfig = {
  background: {
    color: '#f7f9ff'
  },
  width: '100%',
  height: '100%',
  grid: {
    size: 1,
    visible: false
  },
  keyboard: {
    enabled: true
  },
  style: {
    rect: {
      radius: 6
    },
    edgeText: { // 边文本样式
      background: {
        fill: '#fff'
      }
    }
  },
  stopScrollGraph: false,
  stopZoomGraph: false,
  edgeTextDraggable: false,
  guards: {
    beforeClone(data) {
      console.log('beforeClone', data)
      return true
    },
    beforeDelete(data) {
      // 可以根据data数据判断是否允许删除，允许返回true,不允许返回false
      // 文档： http://logic-flow.org/guide/basic/keyboard.html#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E5%88%A0%E9%99%A4%E6%88%96%E8%80%85%E6%8B%B7%E8%B4%9D%E8%A1%8C%E4%B8%BA
      console.log('beforeDelete', data)
      // _this.$message('不允许删除', 'error')
      return true
    }
  }
}