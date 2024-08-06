import type { VForm } from 'vuetify/components'

/**
 * Helper composable to validate VForm
 */
export const useVForm = () => {
  const $notify = useNotify()
  const formRef = ref<InstanceType<typeof VForm>>()

  /**
   * @param formRef VForm ref
   * @returns Promise<boolean> true if form is valid
   */
  const validateForm = async() => {
    const form = formRef.value
    if (!form) throw new Error('Form ref is not provided')

    const isValid = (await form.validate())?.valid
    if (!isValid) {
      $notify.warning('Some fields are invalid. Please check the form and try again')
      return false
    }
    return true
  }

  return {
    validateForm,
    formRef,
  }
}
