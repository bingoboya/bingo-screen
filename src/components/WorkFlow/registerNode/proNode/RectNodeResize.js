import { RectResize } from '@logicflow/extension'
import { getShapeStyleFuction, getTextStyleFunction } from '../utils/getShapeStyleUtil.js'
// const RectResize = window.RectResize

/**
 * view控制渲染的值
 */
class RectNewNode extends RectResize.view {
  getShapeStyle () {
    const style = super.getShapeStyle()
    const properties = this.getProperties()
    return getShapeStyleFuction(style, properties)
  }

  getTextStyle () {
    const style = super.getTextStyle()
    const properties = this.getProperties()
    style.borderStyle = 'dotted'
    return getTextStyleFunction(style, properties)
  }

  toFront () {
    // const { isAlwaysBottom } = this.getProperties()
    // if (!isAlwaysBottom) {
    //   super.toFront()
    // }
  }
}
/**
 * model控制初始化的值
 */
class RectNewModel extends RectResize.model {
  setAttributes () {
    super.setAttributes()
    this.strokeWidth = 4
    this.minWidth = 0
    this.minHeight = 0
    // this.width = 70
    // this.height = 1
  }

  setToBottom () {
    this.zIndex = 0
  }
}

export default {
  type: 'pro-rect',
  view: RectNewNode,
  model: RectNewModel
}
