<template>
  <a-sub-menu :key="menuInfo.path">
      <template #icon><MailOutlined /></template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path" @click="ooclo(item)">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-sub-menu>
</template>

<script>
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
  export default {
    components: {
      PieChartOutlined,
      MailOutlined,
    },
    name: 'SubMenu',
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
      ooclo(item) {
        // console.log('ooclo', item);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>

