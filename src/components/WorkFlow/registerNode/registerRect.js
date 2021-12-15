
/**
 * 流程颜色状态
 * 0 -》 没走过-》黑色
 * 1 -》 当前 -》 红色
 * 2 -》 走过 -》 绿色
*/

const COLORS = {
  0: 'black',
  1: 'red',
  2: 'green'
}
export default function registerRect(lf) {
  lf.register('rect', ({ RectNode, RectNodeModel }) => {
    class ConnnectionModel extends RectNodeModel {
      constructor(data, graphModel) {
        super(data, graphModel)
        const status = data.properties.status
        this.stroke = COLORS[status]
      }
    }
    return {
      view: RectNode,
      model: ConnnectionModel
    }
  })
}
