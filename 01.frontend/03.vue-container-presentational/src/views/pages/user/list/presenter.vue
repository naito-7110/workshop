<script setup lang="ts">
  import type { UserType } from '@/core/models'
  import { UserCard } from '@/views/features/user'
  import { VStack } from '@/views/common/layouts'
  import Heading from '@/views/common/documents/heading/heading.vue'

  defineProps<{
    userList: Readonly<UserType[]>
  }>()

  const emits = defineEmits<{
    click: [userId: UserType['userId']]
  }>()
</script>
<template>
  <div :class="$style['user-list__container']">
    <Heading :h="1"> Users </Heading>
    <VStack>
      <template
        v-for="user of userList"
        :key="user.userId">
        <div :class="$style['user-card']">
          <UserCard
            :user="user"
            @click="emits('click', $event)" />
        </div>
      </template>
    </VStack>
  </div>
</template>
<style lang="css" module>
  .user-list__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .user-card {
    width: 40rem;
  }
</style>
