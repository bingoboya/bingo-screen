
const DONE_COLOR = 'green'
const UNDO_COLOR = 'red'
export default function registerLine(lf) {
  lf.register('line', ({ LineEdge, LineEdgeModel }) => {
    class ConnnectionModel extends LineEdgeModel {
      constructor(data, graphModel) {
        super(data, graphModel)
        this.stroke = data.properties.status === 1 ? DONE_COLOR : UNDO_COLOR
      }
    }
    return {
      view: LineEdge,
      model: ConnnectionModel
    }
  })
}
