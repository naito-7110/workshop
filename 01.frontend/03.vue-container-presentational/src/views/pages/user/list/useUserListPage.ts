import { userSchema, type UserType } from '@/core/models'
import { getUserList } from '@/core/repositories'
import { useUserFormDialog } from '@/views/features/user'
import { ref, readonly, onMounted } from 'vue'

export default function useUserListPage() {
  const userList = ref<UserType[]>([])
  const selectedUser = ref<UserType | null>(null)

  async function onLoad() {
    userList.value = await getUserList()
  }

  function onSelect(userId: UserType['userId']) {
    selectedUser.value = [...userList.value].find(user => user.userId === userId) ?? null

    const { open, close } = useUserFormDialog({
      user: selectedUser.value!,
      onInput: user => {
        selectedUser.value = userSchema.parse(user)
      },
      onExecute: () => {
        userList.value = userList.value.map(user => {
          if (user.userId === selectedUser.value?.userId) {
            return selectedUser.value
          }
          return user
        })

        close()
      },
      onCancel: () => {
        close()
      },
    })

    open()
  }

  onMounted(() => {
    onLoad()
  })

  return {
    userList: readonly(userList),
    onSelect,
  }
}
