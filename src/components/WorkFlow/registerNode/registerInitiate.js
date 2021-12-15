export default function registerInitiate(lf) {
  lf.register('initiate', ({ CircleNode, CircleNodeModel, h }) => {
    class StartNode extends CircleNode {
      getShape() {
        // const attrs = {
        //   // rect 标签的 x，y 对应的是图形的左上角
        //   // 所以我们要将矩形的中心移动到 x，y
        //   x: x - width / 2,
        //   y: y - height / 2,
        //   width,
        //   height,
        //   stroke,
        //   fill,
        //   strokeWidth
        // }
        const { x, y, width, height, r, fill, stroke, strokeWidth } = this.getAttributes()
        const attrs = {
          cx: x,
          cy: y,
          r,
          fill,
          stroke,
          strokeWidth
        }
        return h('g', {}, [
          h('circle', { ...attrs }),
          h(
            'svg',
            {
              x: x - width / 2 - 1,
              y: y - height / 2 - 6,
              width: 52,
              height: 52,
              viewBox: '0 0 1274 1024'
            },
            h(
              'path',
              {
                fill: '#aae0a8',
                d: 'M512 992C246.4 992 32 777.6 32 512S246.4 32 512 32s480 214.4 480 480-214.4 480-480 480z m0-896C281.6 96 96 281.6 96 512s185.6 416 416 416 416-185.6 416-416S742.4 96 512 96z m-48 700.8c-118.4-19.2-214.4-115.2-236.8-236.8-32-198.4 134.4-364.8 332.8-332.8 118.4 19.2 214.4 115.2 236.8 236.8 32 195.2-137.6 364.8-332.8 332.8z'
              }
            )
          )
        ]
        )
      }
    }
    class StartModel extends CircleNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 35,
          dragable: false,
          editable: true
        }
        super(data, graphModel)
      }
      getConnectedTargetRules() {
        const rules = super.getConnectedTargetRules()
        const notAsTarget = {
          message: '起始节点不能作为连线的终点',
          validate: () => false
        }
        rules.push(notAsTarget)
        return rules
      }
    }
    return {
      view: StartNode,
      model: StartModel
    }
  })
}
