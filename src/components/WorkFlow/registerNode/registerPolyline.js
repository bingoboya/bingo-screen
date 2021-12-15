
const DONE_COLOR = 'green'
const UNDO_COLOR = 'black'

// 归档后的【连线节点】颜色 ： 如果【归档】是绿的，【连线节点】取绿色;如果【归档】是红的或蓝的，【连线节点】取蓝色
// 其他【连线节点】颜色    ：【连线节点】后的节点是红的或绿的，【连线节点】是绿的。其他情况是蓝的
/**
 * 连线节点 颜色状态
 * 0 -》 蓝色
 * 1 -》  绿色
*/

export default function registerPolyline(lf) {
  lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
    class ConnnectionModel extends PolylineEdgeModel {
      constructor(data, graphModel) {
        super(data, graphModel)
        const status = data.properties.status
        this.stroke = 'black'
        // this.stroke = status === 1 ? 'green' : 'black'
      }
    }
    return {
      view: PolylineEdge,
      model: ConnnectionModel
    }
  })
}
