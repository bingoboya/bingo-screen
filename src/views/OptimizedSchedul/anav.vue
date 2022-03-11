<template>
  <div style="width: 206px;height:100%;">
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>-->
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="height: 100%;overflow: hidden;overflow-y: scroll;"
      mode="inline"
      @click="menuClick"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in list" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path" v-if="item.showTitle">
            <template #icon>
              <PieChartOutlined />
            </template>
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.path" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script setup>
import SubMenu from 'components/AsubMenu.vue'
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const route = useRoute();
// console.log(router, toRaw(route).path.value);

const selectedKeys = ref([toRaw(route).path.value]);
console.log('selectedKeys', selectedKeys)
const list = [
  {
    key: '1',
    title: '策略优化',
    showTitle: true,
    path: '/optimizedSchedul/schedul',
  },
  {
    key: '2',
    title: '历史结果',
    showTitle: true,
    path: '/optimizedSchedul/historyres',
  },
  {
    key: '3',
    title: '策略生成',
    showTitle: false,
    path: '/optimizedSchedul/strategygeneration',
  },
  {
    key: '4',
    title: '策略优化',
    showTitle: false,
    path: '/optimizedSchedul/strategyoptimization',
  },
  {
    key: '5',
    title: '策略对比',
    showTitle: false,
    path: '/optimizedSchedul/strategycomparison',
  },
  {
    key: '31',
    title: 'dddd',
    showTitle: false,
    path: '/optimizedSchedul/demomo',
  }
];

// setTimeout(() => {
//   router.push({
//     path: '/optimizedSchedul/historyres'
//   })
//   selectedKeys.value = ['/optimizedSchedul/historyres']
// }, 2000);
// setTimeout(() => {
//   router.push({
//     path: '/optimizedSchedul/schedul'
//   })
//   selectedKeys.value = ['/optimizedSchedul/schedul']
// }, 4000);

const collapsed = ref(false);
const openKeys = ref(['/datamon'])
// 将从缓存中取出openKeys
const openpenkey = window.sessionStorage.getItem('openpenkey')
if (openpenkey) {
  openKeys.value = [JSON.parse(openpenkey)]
}
// console.log('openpenkey', openpenkey, 11, openKeys.value, 22);

const menuClick = ({ item, key, keyPath }) => {
  console.log(22222, item, key, keyPath, keyPath[0] );
  // 把 keyPath 第一项缓存起来，刷新页面时用来打开
  window.sessionStorage.setItem('openpenkey', JSON.stringify(keyPath[0]))
  router.push({
    path: key
  })
}

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};

</script>
