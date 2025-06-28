import { h, nextTick, ref, render, type VNode } from 'vue'
import { UserFormDialog } from '.'

// dialog描画のcomposables
export default function useUserFormDialog({
  user,
  onInput,
  onCancel,
  onExecute,
}: InstanceType<typeof UserFormDialog>['$props']) {
  const dialogNode = ref<VNode | null>(null)

  // dialogを開く
  const open = () => {
    dialogNode.value = h(UserFormDialog, {
      user,
      onInput,
      onCancel,
      onExecute,
    })

    render(dialogNode.value, document.body)

    nextTick(() => {
      const exposed = dialogNode?.value?.component?.exposed

      if (exposed && typeof exposed.open === 'function') {
        exposed.open()
      }
    })
  }

  // dialogを閉じる
  const close = () => {
    nextTick(() => {
      const exposed = dialogNode?.value?.component?.exposed

      if (exposed && typeof exposed.close === 'function') {
        exposed.close()
        render(null, document.body)
      }
    })
  }

  return {
    open,
    close,
  } as const
}
