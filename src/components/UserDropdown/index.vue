<template>
  <a-dropdown>
    <span class="user_wrapper">
      <img class="user_avatar" :src="userAvatar" />
      <span class="user_name">{{ userName }}</span>
      <!-- <DownOutlined /> -->
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="toUserProfile">
          <template #icon>
            <user-outlined />
          </template>
          个人中心
        </a-menu-item>
        <!-- <a-menu-item>
          <template #icon>
            <LockOutlined />
          </template>
          锁定屏幕
        </a-menu-item> -->
        <a-menu-item>
          <template #icon>
            <LogoutOutlined />
          </template>
          退出系统
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { UserOutlined, LogoutOutlined, LockOutlined } from '@ant-design/icons-vue'
import userAvatar from '@/assets/userAvatar.jpeg'
const router = useRouter()
const userName = ref('bingo')
const toUserProfile = () => {
  router.push('/user')
}
</script>

<style lang="scss" scoped>
.user_wrapper {
      height: 100%;
    display: flex;
    padding-left: 14px;
    align-items: center;
  .user_avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .user_name {
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 18px;
  }
}
</style>