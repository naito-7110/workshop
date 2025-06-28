<script setup lang="ts">
  import { type UserInputType } from '@/core/models'
  import InputText from '@/views/common/form/input-text/input-text.vue'
  import { useTemplateRef } from 'vue'
  import { Button } from '@/views/common/form'

  defineProps<{
    user: UserInputType
  }>()

  const emits = defineEmits<{
    cancel: []
    execute: []
    input: [user: UserInputType]
  }>()

  const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef')

  // dialogを開く
  function open() {
    if (dialogRef?.value) {
      dialogRef.value.showModal()
    }
  }

  // dialogを閉じる
  function close() {
    if (dialogRef?.value) {
      dialogRef.value.close()
    }
  }

  // キーダウンイベント
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      emits('cancel')
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault()

    emits('execute')
  }

  defineExpose({
    open,
    close,
  })
</script>
<template>
  <!-- dialog -->
  <dialog
    ref="dialogRef"
    :class="$style['dialog__container']"
    role="dialog"
    aria-modal="true"
    @keydown.self="onKeydown">
    <!-- オーバーレイ -->
    <div
      :class="$style['overlay']"
      @click="emits('cancel')" />

    <!-- dialogコンテンツ -->
    <div :class="$style['contents']">
      <span :class="$style['user-form__title']">ユーザーを更新する</span>
      <form @submit="handleSubmit">
        <!-- メッセージ -->
        <div :class="$style['user-card']">
          <img
            :src="user.profile"
            alt="プロフィール画像" />
          <InputText
            placeholder="ユーザー名"
            type="text"
            :model-value="user.name"
            @update:model-value="emits('input', { ...user, ...{ name: $event } })" />

          <InputText
            placeholder="自己緒紹介"
            type="text"
            :model-value="user.bio"
            @update:model-value="emits('input', { ...user, ...{ bio: $event } })" />
        </div>

        <!-- ボタン -->
        <div :class="$style['button__container']">
          <Button
            variant="secondary"
            @click="emits('cancel')">
            キャンセル
          </Button>
          <Button type="submit">更新する</Button>
        </div>
      </form>
    </div>
  </dialog>
</template>
<style lang="css" module>
  .dialog__container {
    border: none;
    background: transparent;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    cursor: pointer;
    z-index: 1000;
  }

  .contents {
    padding: 2rem 2.5rem 2rem 2.5rem; /* 左右を2.5remで固定 */
    background-color: #fff;
    border-radius: 12px;
    padding: 2rem 2.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    max-width: 480px;
    width: 90%;
    z-index: 1010;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .user-form__title {
    font-weight: 700;
    font-size: 1.5rem;
    color: #222;
    user-select: none;
  }

  .user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: #fafafa;
    padding: 1.25rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
  }

  .user-card img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ddd;
  }

  .button__container {
    padding-top: 1rem;
    display: flex;
    justify-content: flex-start; /* 右寄せから左寄せに変更 */
    gap: 1rem;
    padding-left: 2.5rem; /* タイトルのpadding左に合わせる */
  }
</style>
