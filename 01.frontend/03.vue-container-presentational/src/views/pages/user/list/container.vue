<script setup lang="ts">
  import { useUserListPage, UserListPagePresenter } from '.'

  const { userList, onSelect } = useUserListPage()
</script>
<template>
  <UserListPagePresenter
    :user-list="userList"
    @click="onSelect" />
</template>
