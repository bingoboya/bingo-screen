<template>
  <div>
    <!-- <a-date-picker v-model:value="value1" /> -->
    <a-select
      v-model:value="value"
      mode="multiple"
      max-tag-count="responsive"
      style="width: 200px"
      placeholder="Please select"
      :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
    ></a-select>

    <a-select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      @focus="focus"
      @change="handleChange"
    >
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <div>
      <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="mail">
          <template #icon>
            <mail-outlined />
          </template>
          Navigation One
        </a-menu-item>
        <a-menu-item key="app" disabled>
          <template #icon>
            <appstore-outlined />
          </template>
          Navigation Two
        </a-menu-item>
        <a-sub-menu>
          <template #icon>
            <setting-outlined />
          </template>
          <template #title>Navigation Three - Submenu</template>
          <a-menu-item-group title="Item 1">
            <a-menu-item key="setting:1">Option 1</a-menu-item>
            <a-menu-item key="setting:2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Item 2">
            <a-menu-item key="setting:3">Option 3</a-menu-item>
            <a-menu-item key="setting:4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item key="alipay">
          <a
            href="https://antdv.com"
            target="_blank"
            rel="noopener noreferrer"
          >Navigation Four - Link</a>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
  <div>
    <home-outlined />
    <smile-two-tone />
    <heart-two-tone two-tone-color="#eb2f96" />
    <check-circle-two-tone two-tone-color="#52c41a" />
  </div>
  <div>
    <a-card hoverable size="small" title="Small size card" style="width: 300px">
      <template #extra><a href="#">more</a></template>
      <p>card content</p>
    </a-card>
  </div>
</template>

<script setup>
import { HomeOutlined, SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
const current = ref(['mail']);
const value1 = ref('')
const value = ref([])
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const focus = () => {
  console.log('focus');
};
</script>

<style lang="scss" scoped>
</style>