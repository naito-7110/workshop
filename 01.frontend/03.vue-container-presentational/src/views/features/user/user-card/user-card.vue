<script setup lang="ts">
  import type { UserType } from '@/core/models'

  defineProps<{
    user: UserType
  }>()

  const emits = defineEmits<{
    click: [userId: UserType['userId']]
  }>()

  function handleClickCard(user: UserType, e: MouseEvent) {
    const target = e.currentTarget as HTMLElement | null
    if (!target) return

    const ripple = document.createElement('span')
    ripple.className = 'ripple'

    const rect = target.getBoundingClientRect()
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top = `${e.clientY - rect.top}px`

    target.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
    emits('click', user.userId)
  }
</script>

<template>
  <div
    :class="$style['user-card']"
    @click="e => handleClickCard(user, e)">
    <img
      :src="user.profile"
      alt="プロフィール画像" />
    <h3>{{ user.name }}</h3>
    <p>{{ user.bio }}</p>
  </div>
</template>

<style module>
  .user-card {
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 1.25rem;
    border-radius: 1rem;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    text-align: center;
  }

  .user-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .user-card img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 0.75rem;
    border: 2px solid #eaeaea;
  }

  .user-card h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }

  .user-card p {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.25rem;
    line-height: 1.4;
  }

  /* Ripple effect */
  .user-card .ripple {
    position: absolute;
    width: 120px;
    height: 120px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>
