export const initData = {
  'code': 200,
  'data': {
    nodes: [{
        id: '11312',
        type: 'linevoltinfo',
        name: '@cname 线电压节点',
        keyInfo: 'description',
        content: {
          titlenum: 1,
          chartpercent: '@natural(0, 100)',
          num1: '@natural(0, 10)',
          num2: '@natural(0, 10)',
          num3: '@natural(0, 10)',
          num4: '@natural(0, 10)',
          num5: '@natural(0, 10)',
          num6: '@natural(0, 10)',
        },
        x: 780,
        y: 280,
      },
      {
        id: 'node304',
        x: 891,
        y: 370,

        size: [40, 40],
        type: 'extend-image',
        img: 'three',
        label: '三绕组\nnode304',
        labelCfg: {
          position: 'bottom',
        },

      },
      {
        id: '1112',
        type: 'statusinfo',
        name: '@cname statusinfo节点',
        keyInfo: 'description',
        content: {
          titlenum: 1,
          chartpercent: '@natural(0, 100)',
          num1: '@natural(0, 10)',
          num2: '@natural(0, 10)',
          num3: '@natural(0, 10)',
          num4: '@natural(0, 10)',
          num5: '@natural(0, 10)',
          num6: '@natural(0, 10)',
        },
        x: 60,
        y: 27,
      },
      {
        id: '1113',
        type: 'statusinfo',
        x: 630,
        y: 27,
        name: '@cname statusinfo节点',
        keyInfo: 'description',
        content: {
          titlenum: 2,
          chartpercent: '@natural(0, 100)',
          num1: '@natural(0, 10)',
          num2: '@natural(0, 10)',
          num3: '@natural(0, 10)',
          num4: '@natural(0, 10)',
          num5: '@natural(0, 10)',
          num6: '@natural(0, 10)',
        },
      },

      {
        id: 'node700',
        x: 255,
        y: 94,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: '#1高厂变',
        labelCfg: {
          position: 'top',
          offset: 14,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },
      {
        id: 'node703',
        x: 515,
        y: 94,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: '#2高厂变',
        labelCfg: {
          position: 'top',
          offset: 14,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },
      {
        id: 'node701',
        x: 230,
        y: 40,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: '#1主变',
        labelCfg: {
          position: 'left',
          offset: 0,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },
      {
        id: 'node704',
        x: 550,
        y: 40,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: '#2主变',
        labelCfg: {
          position: 'right',
          offset: 0,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },
      {
        id: 'node702',
        x: 230,
        y: 100,
        size: [40, 40],
        type: 'extend-image',
        img: 'generator',
        label: '#1发电机',
        labelCfg: {
          position: 'left',
          offset: -2,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },
      {
        id: 'node705',
        x: 550,
        y: 100,
        size: [40, 40],
        type: 'extend-image',
        img: 'generator',
        label: '#2发电机',
        labelCfg: {
          position: 'right',
          offset: 0,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },
      {
        id: 'node706',
        x: 230,
        y: 16,
        size: [20, 20],
        type: 'extend-image',
        img: 'bolang',
        label: '电网',
        labelCfg: {
          position: 'left',
          offset: 0,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },
      {
        id: 'node707',
        x: 550,
        y: 16,
        size: [20, 20],
        type: 'extend-image',
        img: 'bolang',
        label: '电网',
        labelCfg: {
          position: 'right',
          offset: 0,
          style: {
            fill: 'red',
            fontSize: 10
          }
        },
      },


      {
        id: 'node2345',
        x: 265,
        y: 100,
        size: [150, 0],
        stroke: 'red',
        anchorPoints: [
          [0, 1],
          [0.5, 1],
        ],
        label: 'node2345',
        type: 'justline',
      },
      {
        id: 'node2346',
        x: 430,
        y: 100,
        size: [150, 0],
        stroke: 'red',
        anchorPoints: [
          [0, 1],
          [0.5, 1],
        ],
        label: 'node2346',
        type: 'justline'
      },
      {
        id: 'node234',
        x: 15,
        y: 240,
        size: [1900, 0],
        label: '黄线1900',
        stroke: 'yellow',
        anchorPoints: [
          [0.2, 1],
          [0.473, 1],
          [0.71, 1],
          [0.92, 1],
          [0.305, 1]
        ],
        type: 'justline'
      },
      {
        id: 'node2342',
        x: 35,
        y: 400,
        size: [450, 0],
        stroke: 'gray',
        anchorPoints: [
          [0.12, 1],
          [0.4, 1],
          [0.64, 1],
          [0.74, 1],
          [0.90, 1],
        ],
        label: '黄线node2342',
        type: 'justline'
      },
      {
        id: 'node2343',
        x: 325,
        y: 400,
        size: [450, 0],
        stroke: 'gray',
        anchorPoints: [
          [0.12, 1],
          [0.4, 1],
          [0.64, 1],
          [0.61, 1],
          [0.90, 1],
        ],
        label: '黄线node2343',
        type: 'justline'
      },
      {
        id: 'node2344',
        x: 605,
        y: 400,
        stroke: 'gray',
        anchorPoints: [
          [0.12, 1],
          [0.4, 1],
          [0.39, 1],
          [0.69, 1],
          [0.90, 1],
        ],
        size: [450, 0],
        label: '黄线node2344',
        type: 'justline'
      },
      {
        id: '1115',
        type: 'pkdata',
        name: '@cname pkdata节点',
        keyInfo: 'description',
        content: {
          chartpercent: '@natural(0, 100)',
          num1: '@natural(0, 1000)',
          num2: '@natural(0, 1000)',
          num3: '@natural(0, 1000)',
          num4: '@natural(0, 1000)',
          num5: '@natural(0, 1000)',
          num6: '@natural(0, 1000)',
          num7: '@natural(0, 1000)',
          num8: '@natural(0, 1000)',
          num9: '@natural(0, 1000)',
        },
        x: 330,
        y: 135,
      },
      {
        id: '12116',
        type: 'pkdata',
        name: '@cname pkdata节点',
        keyInfo: 'description',
        content: {
          chartpercent: '@natural(0, 100)',
          num1: '@natural(0, 1000)',
          num2: '@natural(0, 1000)',
          num3: '@natural(0, 1000)',
          num4: '@natural(0, 1000)',
          num5: '@natural(0, 1000)',
          num6: '@natural(0, 1000)',
          num7: '@natural(0, 1000)',
          num8: '@natural(0, 1000)',
          num9: '@natural(0, 1000)',
        },
        x: 500,
        y: 135,
      },
      {
        id: '1111',
        type: 'sysinfo',
        name: '@cname 节点',
        keyInfo: 'description',
        content: {
          chartpercent: '@natural(0, 100)',
          num1: '@natural(0, 10)',
          num2: '@natural(0, 10)',
          num3: '@natural(0, 10)',
          num4: '@natural(0, 10)',
          num5: '@natural(0, 10)',
          num6: '@natural(0, 10)',
        },
        x: 40,
        y: 126,
      },
      {
        id: '1114',
        type: 'wholedata',
        name: '@cname wholedata节点',
        keyInfo: 'description',
        content: {
          chartpercent: '@natural(0, 100)',
          num1: '@natural(10000, 1000000)',
          num2: '@natural(0, 1000)',
          num3: '@natural(0, 1000)',
          num4: '@natural(0, 1000)',
          num5: '@natural(0, 1000)',
          num6: '@natural(0, 1000)',
          num7: '@natural(0, 1000)',
          num8: '@natural(0, 1000)',
          num9: '@natural(0, 1000)',
        },
        x: 20,
        y: 250,
      },
      {
        id: '11215',
        type: 'wholedata',
        name: '@cname wholedata节点',
        keyInfo: 'description',
        content: {
          chartpercent: '@natural(0, 100)',
          num1: '@natural(10000, 1000000)',
          num2: '@natural(0, 1000)',
          num3: '@natural(0, 1000)',
          num4: '@natural(0, 1000)',
          num5: '@natural(0, 1000)',
          num6: '@natural(0, 1000)',
          num7: '@natural(0, 1000)',
          num8: '@natural(0, 1000)',
          num9: '@natural(0, 1000)',
        },
        x: 260,
        y: 250,
      },
      {
        id: '1116',
        type: 'wholedata',
        name: '@cname wholedata节点',
        keyInfo: 'description',
        content: {
          chartpercent: '@natural(0, 100)',
          num1: '@natural(10000, 1000000)',
          num2: '@natural(0, 1000)',
          num3: '@natural(0, 1000)',
          num4: '@natural(0, 1000)',
          num5: '@natural(0, 1000)',
          num6: '@natural(0, 1000)',
          num7: '@natural(0, 1000)',
          num8: '@natural(0, 1000)',
          num9: '@natural(0, 1000)',
        },
        x: 510,
        y: 250,
      },

      {
        id: 'node305',
        x: 204,
        y: 330,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: 'node305',
        labelCfg: {
          position: 'bottom',
        },
      },
      {
        id: 'node306',
        x: 463,
        y: 330,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: 'node306',
        labelCfg: {
          position: 'bottom',
        },
      },
      {
        id: 'node307',
        x: 691,
        y: 330,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: 'node307',
        labelCfg: {
          position: 'bottom',
        },
      },





      /**一排12个自己画的*/
      {
        id: 'node2395',
        x: 44,
        y: 440,

        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2396',
        x: 108,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2397',
        x: 164,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2398',
        x: 225,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2399',
        x: 334,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2410',
        x: 398,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2411',
        x: 454,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2412',
        x: 514,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2413',
        x: 614,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2414',
        x: 679,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2415',
        x: 745,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },
      {
        id: 'node2416',
        x: 795,
        y: 440,
        size: [30, 20],
        type: 'custompath',
        color: 'red'
      },












      {
        id: 'node235',
        x: 120,
        y: 950,
        label: '@natural(0, 100)圈',
        height: '@natural(0, 70)',
        color: 'red',
        type: 'node-with-radio'
      },
      {
        id: 'node4',
        x: 600,
        y: 950,
        type: 'rect',
        anchorPoints: [
          [0.5, 1]
        ],
        label: 'No Animation1',
        labelCfg: {
          position: 'bottom',
        },
      },
      {
        id: 'node3',
        x: 450,
        y: 950,
        size: [40, 40],
        type: 'extend-image',
        img: 'testImage',
        label: 'Image Rotate',
        labelCfg: {
          position: 'right',
        },
      },
      {
        id: 'node2',
        x: 400,
        y: 950,
        type: 'background-animate',
        color: '#40a9ff',
        size: 20,
        label: 'Background Animation',
        labelCfg: {
          position: 'left',
          offset: 10,
        },
      },
      {
        id: 'node1',
        x: 200,
        y: 950,
        type: 'circle-animate',
        size: 30,
        label: '@cname node1',
        labelCfg: {
          position: 'top',
        },
      },
      {
        id: 'node123',
        x: 300,
        y: 950,
        type: 'circle-animate',
        size: 30,
        label: '@cname circle-animate',
        labelCfg: {
          position: 'top',
        },
      },


      /*
      {
        id: 'node103',
        type: 'rect-xml-system-info',
        x:10,
        y: 770,
        description: '@cname',
        label: 'Type / ReferType',
        color: '#2196f3',
        meta: {
          creatorName: '@cname',
        },
      },
      {
        id: 'node302',
        x: 250,
        y: 880,
        size: [40, 40],
        type: 'extend-image',
        img: 'two',
        label: '双绕组',
        labelCfg: {
          position: 'bottom',
        },
      },
      {
        id: 'node303',
        x: 200,
        y: 880,
        size: [40, 40],
        type: 'extend-image',
        img: 'bolang',
        label: '波浪',
        labelCfg: {
          position: 'bottom',
        },
      },
      {
        id: 'node001',
        trendData: [
          { genre: 'Sports', sold: '@natural(10, 300)' },
          { genre: 'Strategy', sold: '@natural(10, 300)' },
          { genre: 'Action', sold: '@natural(10, 300)' },
          { genre: 'Shooter', sold: '@natural(10, 300)' },
          { genre: 'Other', sold: '@natural(10, 300)' },
        ],
        type: 'node-with-interval',
        x: 10,
        y: 750,
      },
      {
        id: 'node102',
        type: 'rect-xml',
        x:10,
        y: 800,
        description: '@cname',
        label: 'Type1 / ReferType',
        color: '#2196f3',
        meta: {
          creatorName: '@cname',
        },
      },
      { id: 'node22', x: 550, y: 800, type: 'custompath', color: 'red' },
      {
        id: 'node12121',
        label: 'node12121',
        x: 260,
        y: 800,
        anchorPoints: [
          [0, 1],
          [0.10, 1],
          [0.25, 1],
          [0.5, 1],
          [1,0]
        ],
        style:{
          fill: 'red',
          fillOpacity: 0.3
        },
        type: 'rect',
        linkPoints: {
            top: true,
            right: true,
            bottom: true,
            left: true,
            size: 5,
          },
      },
      {
        id: 'node212121',
        label: 'node212121',
        x: 300,
        y: 850,
        style:{
          fill: 'red',
          fillOpacity: 0.3
        },
        anchorPoints: [
          [0.5, 0],
          [0.5, 1],
          [1, 0.5],
        ],
        linkPoints: {
            top: true,
            right: true,
            bottom: true,
            left: true,
            size: 5,
          },
        type: 'rect',
      },
      { id: 'node233', type: 'diamond', x: 450, y: 850, color: 'green',anchorPoints: [[0.5,1]], label: '小菱形' },
      {
        id: 'node31',
        x: 400,
        y: 880,
        size: [40, 40],
        type: 'extend-image',
        img: 'testImage',
        label: '猪猪',
        labelCfg: {
          position: 'bottom',
        },
      },
      {
        id: 'image',
        img: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
        x: 320,
        y: 820,
        size: [60, 80],
        type: 'image',
      },
      {
        id: 'image1',
        img: 'three',
        x: 320,
        y: 860,
        size: [60, 80],
        type: 'image',
      },
      {
        id: 'node101',
        x: 0,
        y: 800,
        size: [120, 40],
        label: 'Homepage',
      },
      { id: 'node21', x: 0, y: 780, label:'菱形1', color: 'blue',type: 'diamond' },
      { id: 'node231', x: 0, y: 790, label:'菱形2', color: 'green', type: 'diamond', size: [50, 100] },
      { id: 'node232', x: 0, y: 820, label:'菱形3', color: 'red', type: 'diamond' },
      
      */









      /* 十二节电池*/
      {
        id: 'node249',
        x: 44,
        y: 500,
        type: 'battery',
        proportion: '@natural(0, 100)',
        color: 'green',
        size: [30, 50],
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node250',
        x: 108,
        y: 500,
        type: 'battery',
        proportion: '@natural(0, 100)',
        color: 'green',
        size: [30, 50],
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node251',
        x: 163,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node252',
        x: 225,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node253',
        x: 334,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node254',
        x: 398,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node255',
        x: 453,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node256',
        x: 513,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node257',
        x: 614,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node258',
        x: 680,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node259',
        x: 745,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },
      {
        id: 'node260',
        x: 794,
        y: 500,
        type: 'battery',
        size: [30, 50],
        proportion: '@natural(0, 100)',
        color: 'green',
        anchorPoints: [
          [0.5, 1]
        ],
        label: '@cname 电池节点'
      },


      /*自定义边--中心位置显示label*/
      /*
      {
        id: 'extraedge1',
        x: 700,
        y:160
      },
      {
        id: 'extraedge2',
        x: 700,
        y:280
      },
      */
      /*自定义边--十字架*/
      /*
      {
        id: 'extraedge11',
        x: 800,
        y: 60
      },
      {
        id: 'extraedge12',
        x: 800,
        y: 280
      }
      */

    ],
    edges: [{
        source: 'node704',
        target: 'node705',
        sourceAnchor: 1,
        targetAnchor: 0,
        type: 'polyline',
        style: {
          stroke: 'gray',
          offset: 10
        },
      },
      {
        source: 'node701',
        target: 'node702',
        sourceAnchor: 1,
        targetAnchor: 0,
        type: 'polyline',
        style: {
          stroke: 'gray',
          offset: 10
        },
      },
      {
        source: 'node704',
        target: 'node703',
        sourceAnchor: 1,
        targetAnchor: 0,
        type: 'polyline',
        style: {
          stroke: 'gray',
          offset: 2
        },
      },
      {
        source: 'node701',
        target: 'node700',
        sourceAnchor: 1,
        targetAnchor: 0,
        type: 'polyline',
        style: {
          stroke: 'gray',
          offset: 2
        },
      },



      {
        source: 'node234',
        target: 'node2345',
        sourceAnchor: 4,
        targetAnchor: 1,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-cross-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'botm'
      },
      {
        source: 'node234',
        target: 'node2346',
        sourceAnchor: 1,
        targetAnchor: 1,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-cross-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'botm'
      },

      /*
      {
        source: 'extraedge12',
        target: 'extraedge11',
        sourceAnchor: 0,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-cross-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'botm'
      },
      {
        source: 'extraedge2',
        target: 'extraedge1',
        sourceAnchor: 0,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'botm'
      },
      {
        source: 'extraedge2',
        target: 'extraedge1',
        sourceAnchor: 0,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },*/

      {
        source: 'node2342',
        target: 'node2395',
        sourceAnchor: 0,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2342',
        target: 'node2396',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2342',
        target: 'node2397',
        sourceAnchor: 2,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: '4113 D',
        bottomtext: 'bot'
      },
      {
        source: 'node2342',
        target: 'node2398',
        sourceAnchor: 4,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: '4113 A',
        bottomtext: 'bot'
      },
      {
        source: 'node2343',
        target: 'node2399',
        sourceAnchor: 0,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2343',
        target: 'node2410',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2343',
        target: 'node2411',
        sourceAnchor: 2,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up1',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2343',
        target: 'node2412',
        sourceAnchor: 4,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2344',
        target: 'node2413',
        sourceAnchor: 0,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2344',
        target: 'node2414',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2344',
        target: 'node2415',
        sourceAnchor: 3,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },
      {
        source: 'node2344',
        target: 'node2416',
        sourceAnchor: 4,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        uptext: 'up',
        midtext: 'mid',
        bottomtext: 'bot'
      },

      {
        source: 'node249',
        target: 'node2395',
        sourceAnchor: 0,
        targetAnchor: 1,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2396',
        target: 'node250',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2397',
        target: 'node251',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2398',
        target: 'node252',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2399',
        target: 'node253',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2410',
        target: 'node254',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2411',
        target: 'node255',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2412',
        target: 'node256',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2413',
        target: 'node257',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2414',
        target: 'node258',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2415',
        target: 'node259',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node2416',
        target: 'node260',
        sourceAnchor: 1,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node305',
        target: 'node234',
        sourceAnchor: 0,
        targetAnchor: 0,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node306',
        target: 'node234',
        sourceAnchor: 0,
        targetAnchor: 1,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },
      {
        source: 'node307',
        target: 'node234',
        sourceAnchor: 0,
        targetAnchor: 2,
        midPointColor: '#f00',
        quatileColor: 'gray',
        type: 'extra-shape-edge',
        midtext: 'mid',
      },




      {
        source: 'node307',
        target: 'node2344',
        sourceAnchor: 1,
        targetAnchor: 2,
        type: 'line',
        style: {
          stroke: 'gray',
        },
      },
      {
        source: 'node306',
        target: 'node2343',
        sourceAnchor: 1,
        targetAnchor: 3,
        type: 'line',
        style: {
          stroke: 'gray',
        },
      },
      {
        source: 'node305',
        target: 'node2342',
        sourceAnchor: 1,
        targetAnchor: 3,
        type: 'line',
        style: {
          stroke: 'gray',
        },
      },

      /*
      {
        source: 'node212121',
        target: 'node12121',
        sourceAnchor: 0,
        targetAnchor: 1,
        type: 'line',
        style: {
          endArrow: false,
        },
      },
      */
      {
        source: 'node304',
        target: 'node234',
        targetAnchor: 3,
        sourceAnchor: 0,
        style: {
          stroke: 'red',
        },
        type: 'line',

      },
      {
        source: 'node2',
        target: 'node1',
      },
      {
        source: 'node3',
        target: 'node2',
      },
      {
        source: 'node2',
        target: 'node4',
      },
    ],
  }
}