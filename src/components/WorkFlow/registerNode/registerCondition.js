const DONE_COLOR = 'green'
const UNDO_COLOR = 'blue'
const WILL_COLOR = 'red'

/** 普通节点的逻辑
 * 0 -》 没走过-》黑色
 * 1 -》 当前 -》 红色
 * 2 -》 走过 -》 绿色
*/
/**
 * 条件节点的逻辑 颜色-状态： 目标节点 只要有一个节点的状态是  [红色] 或者 [绿色], 那么当前的条件节点就是 [绿色]，否则 是 [黑色]
*/

export default function registerCondition(lf) {
  lf.register('condition', ({ PolygonNode, PolygonNodeModel, h }) => {
    class Node extends PolygonNode {
      getIconShape() {
        const attributes = this.getAttributes()
        const {
          stroke
        } = attributes
        return h(
          'svg',
          {
            x: 11,
            y: 10,
            width: 30,
            height: 30,
            viewBox: '0 0 1126 1024'
          },
          h(
            'path',
            {
              fill: '#FFA63D',
              d: 'M769.706667 597.333333v-85.333333H554.666667v-85.333333h128V170.666667H384v256h128v85.333333H298.666667v85.333333H170.666667v256h298.666666v-256H341.333333v-44.501333h384V597.333333h-128v256h298.666667v-256z'
            }
          ),
          h(
            'path',
            {
              fill: '#FFA63D',
              d: 'M682.666667 170.666667v256h-128v85.333333h215.04v85.333333H896v256h-298.666667v-256h128v-44.501333H341.333333V597.333333h128v256H170.666667v-256h128v-85.333333h213.333333v-85.333333H384V170.666667h298.666667z m-42.666667 469.333333v170.666667h213.333333v-170.666667h-213.333333zM213.333333 640v170.666667h213.333334v-170.666667H213.333333z m426.666667-256V213.333333h-213.333333v170.666667h213.333333z'
            }
          )
        )
      }
      getShape() {
        const attributes = this.getAttributes()
        const {
          width,
          height,
          x,
          y,
          fill,
          fillOpacity,
          strokeWidth,
          stroke,
          strokeOpacity,
          points
        } = attributes
        const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
        const pointsPath = points.map(point => point.join(',')).join(' ')
        return h(
          'g',
          {
            transform
          },
          [
            h(
              'polygon',
              {
                points: pointsPath,
                fill,
                stroke,
                strokeWidth,
                strokeOpacity,
                fillOpacity
              }
            ),
            this.getIconShape()
          ]
        )
      }
    }
    class Model extends PolygonNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 50
        }
        super(data, graphModel)
        const status = data.properties.status
        // this.stroke = 'black'
        this.stroke = status === 1 ? 'green' : 'black'
        // this.stroke = status === 1 ? 'green' : 'blue'
        const lenght = 25
        this.points = [
          [lenght, 0],
          [lenght * 2, lenght],
          [lenght, lenght * 2],
          [0, lenght]
        ]
      }
    }
    return {
      view: Node,
      model: Model
    }
  })
}
