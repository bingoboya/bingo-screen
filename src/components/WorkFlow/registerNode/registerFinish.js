export default function registerFinish(lf) {
  lf.register('finish', ({ CircleNode, CircleNodeModel, h }) => {
    class Node extends CircleNode {
      // getIconShape() {
      //   const attributes = this.getAttributes()
      //   const {
      //     stroke
      //   } = attributes
      //   return h(
      //     'svg',
      //     {
      //       x: 20,
      //       y: 18,
      //       width: 30,
      //       height: 30,
      //       viewBox: '0 0 1126 1024'
      //     },
      //     h(
      //       'path',
      //       {
      //         fill: '#e92826',
      //         opacity: '.5',
      //         d: 'M511.501461 513.495618m-510.504382 0a510.504382 510.504382 0 1 0 1021.008763 0 510.504382 510.504382 0 1 0-1021.008763 0Z'
      //       }
      //     ),
      //     h(
      //       'path',
      //       {
      //         fill: '#e92826',
      //         d: 'M511.501461 513.495618m-218.759105 0a218.759104 218.759104 0 1 0 437.518209 0 218.759104 218.759104 0 1 0-437.518209 0Z'
      //       }
      //     )
      //   )
      // }
      getShape() {
        // const {
        //   width,
        //   height,
        //   x,
        //   y,
        //   fill,
        //   fillOpacity,
        //   strokeWidth,
        //   stroke,
        //   strokeOpacity,
        //   points
        // } = this.getAttributes()
        // const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
        // const pointsPath = points.map(point => point.join(',')).join(' ')
        // return h(
        //   'g',
        //   {
        //     transform
        //   },
        //   [
        //     h(
        //       'polygon',
        //       {
        //         points: pointsPath,
        //         fill,
        //         stroke,
        //         strokeWidth,
        //         strokeOpacity,
        //         fillOpacity
        //       }
        //     ),
        //     this.getIconShape()
        //   ]
        // )
        const { x, y, width, height, r, fill, stroke, strokeWidth } = this.getAttributes()
        const attrs = {
          cx: x,
          cy: y,
          r,
          fill,
          stroke: '#e92826',
          strokeWidth
        }
        return h('g', {}, [
          h('circle', { ...attrs }),
          h(
            'svg',
            {
              x: x - width / 2 + 1,
              y: y - height / 2 - 4,
              width: 48,
              height: 48,
              viewBox: '0 0 1274 1024'
            },
            h(
              'path',
              {
                fill: '#e92826',
                opacity: '.5',
                d: 'M511.501461 513.495618m-510.504382 0a510.504382 510.504382 0 1 0 1021.008763 0 510.504382 510.504382 0 1 0-1021.008763 0Z'
              }
            ),
            h(
              'path',
              {
                fill: '#e92826',
                d: 'M511.501461 513.495618m-218.759105 0a218.759104 218.759104 0 1 0 437.518209 0 218.759104 218.759104 0 1 0-437.518209 0Z'
              }
            )
          )
        ])
      }
    }
    class Model extends CircleNodeModel {
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
      // getConnectedTargetRules() {
      //   const rules = super.getConnectedTargetRules()
      //   const geteWayOnlyAsTarget = {
      //     message: '1结束节点只能连入，不能连出！',
      //     validate: (source) => {
      //       let isValid = true
      //       if (source) {
      //         isValid = false
      //       }
      //       return isValid
      //     }
      //   }
      //   rules.push(geteWayOnlyAsTarget)
      //   return rules
      // }
    }
    return {
      view: Node,
      model: Model
    }
  })
}
