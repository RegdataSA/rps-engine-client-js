<script setup lang="ts">
import type {
  IContext,
  IInstance,
} from 'rps-engine-client-js/dev'

import { RPSCraft } from 'rps-engine-client-js/dev'

import { useClientStore } from '@/stores/client.store'

interface FormData {
  instances: IInstance[]
  rightsContext: IContext
  processingContext: IContext
}

const formRequestData = ref<FormData | null>(null)

const request = ref<any | null>(null)
const response = ref<null | any>(null)
const isTransformLoading = ref(false)

type EditorTypeKey = 'FormEditor' | 'JsonEditor'
type TabKey = 'form' | 'request'

const editorTypes: EditorTypeKey[] = ['FormEditor', 'JsonEditor']
const currentEditorType = ref<EditorTypeKey>('FormEditor')

const tabs = computed(() => {
  return [
    {
      value: 'form' as TabKey,
      icon: 'mdi-form-select',
      label: currentEditorType.value === 'FormEditor' ? 'Form' : 'Form (Change editor type)',
      disabled: currentEditorType.value === 'JsonEditor',
    },
    {
      value: 'request' as TabKey,
      icon: 'mdi-code-block-braces',
      label: 'Request (JSON)',
    },
  ]
})
const currentTab = ref<TabKey>('form')

const onSetEditorType = (editorType: EditorTypeKey) => {
  if (editorType === 'JsonEditor') {
    currentEditorType.value = editorType
    currentTab.value = 'request'
  }
  else {
    currentEditorType.value = editorType
  }
}

const $notify = useNotify()
const onSetTab = (tab: any) => {
  if (tab === 'request') {
    if (formRequestData.value !== null) {
      const builder = new RPSCraft().addRequest(formRequestData.value)
      request.value = builder.build()
    }
  }

  currentTab.value = tab as TabKey
}

const clientStore = useClientStore()

const transformError = ref<null | any>(null)
const onTransform = async() => {
  try {
    isTransformLoading.value = true

    let requestData: object | null = null

    if (currentEditorType.value === 'FormEditor') {
      if (formRequestData.value === null) {
        $notify.error('Form data is not valid')
        return
      }

      const craft = new RPSCraft().addRequest(formRequestData.value)
      requestData = craft.build()
    }
    else {
      requestData = request.value
    }

    currentTab.value = 'request'
    request.value = requestData
    const data = await clientStore.rpsAgent.transform(request.value)
    response.value = data
  }
  catch (error: any) {
    $notify.error(`Failed to transform the request. ${error.message}`)
    console.warn(error)
    transformError.value = error
  }
  finally {
    isTransformLoading.value = false
  }
}
</script>

<template>
  <VContainer fluid class="py-8 px-12">
    <div class="text-2xl mb-4 font-bold">
      RPS Engine Client | Playground
    </div>

    <div class="grid grid-cols-2 gap-10">
      <VCard class="px-12 py-10 flex gap-8" to="/json-editor">
        <VIcon size="40">
          mdi-code-json
        </VIcon>

        <div>
          <div class="text-2xl font-semibold mb-3">
            JSON Editor
          </div>

          <div class="text-lg">
            Write your request in JSON format with validation and try to transform it!
          </div>
        </div>
      </VCard>

      <VCard class="px-12 py-10 flex gap-8" to="/form-editor">
        <VIcon size="40">
          mdi-form-textbox
        </VIcon>

        <div>
          <div class="text-2xl font-semibold mb-3">
            Form Editor
          </div>

          <div class="text-lg">
            Fill the form with the required data and try to transform it!
          </div>
        </div>
      </VCard>
    </div>

    <div class="h-50vh" />
  </VContainer>
</template>
