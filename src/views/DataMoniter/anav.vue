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
          <a-menu-item :key="item.path">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.title }}
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
const list = [
  {
    key: '1',
    title: '监视模块',
    path: '/datamon',
    children: [
      {
        key: '1.1',
        title: '全局',
        path: '/datamon/moniterall',
      },
      {
        key: '1.2',
        title: 'PCS',
        path: '/datamon/moniterpcs',
      },
      {
        key: '1.3',
        title: 'BMS',
        path: '/datamon/moniterbms',
      },
      {
        key: '1.4',
        title: '电池簇',
        path: '/datamon/moniterbattery',
      },
    ],
  },
  {
    key: '2',
    title: '数据查询',
    path: '/datamon/',
    children: [
      {
        key: '2.1',
        title: '全局',
        path: '/datamon/searchall',
      },
      {
        key: '2.2',
        title: 'PCS',
        path: '/datamon/searchpcs',
      },
      {
        key: '2.3',
        title: 'BMS',
        path: '/datamon/searchbms',
      },
      {
        key: '2.4',
        title: '电池簇',
        path: '/datamon/searchbattery',
      },
    ],
  },
  {
    key: '3',
    title: '区间数据',
    path: '/datamon/datarange',
  },
  // {
  //   key: '4',
  //   title: 'demo',
  //   path: '/datamon/demo',
  // },
  // {
  //   key: '5',
  //   title: 'easydemo',
  //   path: '/datamon/easydemo',
  // }
];
const collapsed = ref(false);
const openKeys = ref(['/datamon'])
// 将从缓存中取出openKeys
const openpenkey = window.sessionStorage.getItem('openpenkey')
if (openpenkey) {
  openKeys.value = [JSON.parse(openpenkey)]
}
// console.log('openpenkey', openpenkey, 11, openKeys.value, 22);

const menuClick = ({ item, key, keyPath }) => {
  // console.log(22222, item, key, keyPath, keyPath[0] );
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
