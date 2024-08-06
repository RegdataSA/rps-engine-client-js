<script setup lang="ts">
import type { JSONEditorOptions } from 'jsoneditor'

import { validateTransformJson } from 'rps-engine-client-js/dev'

import { requestExampleBase, requestExampleBaseSharp } from './data'

const props = withDefaults(defineProps<{
  isLoading?: boolean
  readonly?: boolean
}>(), {
  isLoading: false,
  readonly: false,
})

const request = defineModel<any>('request', {
  required: true,
})

const validation = defineModel<null | any>('validation', {
  required: false,
  default: null,
})

const onSetBase = () => {
  request.value = requestExampleBase
}

const onSetBaseSharp = () => {
  request.value = requestExampleBaseSharp
}

const {
  onCopy,
  onPaste,
} = useCopyPasteJson(request)

const requestEditorValidation = ref<null | {
  items: Array<{
    path: any[]
    prettyPath: string
    message: string
    type: 'error' | 'warn'
  }>
}>(null)

const onEditorValidate: JSONEditorOptions['onValidate'] = (json) => {
  const result = validateTransformJson(json)
  validation.value = result

  requestEditorValidation.value = { items: [] }
  result.errors.forEach((error) => {
    requestEditorValidation.value?.items.push({
      path: error.path,
      message: error.message,
      prettyPath: error.prettyPath,
      type: 'error',
    })
  })
  result.warns.forEach((warn) => {
    requestEditorValidation.value?.items.push({
      path: warn.path,
      message: warn.message,
      prettyPath: warn.prettyPath,
      type: 'warn',
    })
  })

  return [...result.errors, ...result.warns].map((error) => {
    return {
      path: error.path,
      message: error.message,
    }
  })
}
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] gap-5">
    <VCard>
      <VToolbar>
        <div class="px-4 flex gap-3 w-full">
          <div class="text-lg font-semibold">
            Validation
          </div>

          <div class="flex-grow" />
        </div>
      </VToolbar>

      <div
        v-if="requestEditorValidation"
        class="px-4 py-5"
      >
        <div class="flex flex-col gap-3">
          <VAlert
            v-if="!requestEditorValidation.items.length"
            type="success"
            variant="tonal"
          >
            No validation errors
          </VAlert>

          <div v-for="(err, index) in requestEditorValidation.items" :key="index">
            <VAlert
              density="comfortable"
              :type="err.type === 'error' ? 'warning' : 'info'"
              variant="tonal"
            >
              <div class="mb-1">
                {{ err.message }}
              </div>

              <VChip density="compact">
                <VIcon start size="small">
                  mdi-vector-line
                </VIcon>

                {{ err.prettyPath }}
              </VChip>
            </VAlert>
          </div>
        </div>
      </div>
    </VCard>

    <VCard>
      <VToolbar>
        <div class="px-4 flex gap-3 w-full">
          <VBtn
            icon
            color="success"
            size="small"
            variant="tonal"
            @click="onCopy"
          >
            <VIcon>
              mdi-content-copy
            </VIcon>
          </VBtn>

          <VBtn
            icon
            color="success"
            size="small"
            variant="tonal"
            @click="onPaste"
          >
            <VIcon>
              mdi-content-paste
            </VIcon>
          </VBtn>

          <div class="flex-grow" />

          <VBtn
            color="success"
            variant="tonal"
            @click="onSetBaseSharp"
          >
            Set base

            <VIcon end>
              mdi-music-accidental-sharp
            </VIcon>
          </VBtn>

          <VBtn
            color="success"
            variant="tonal"
            @click="onSetBase"
          >
            Set base

            <VIcon end>
              mdi-code-json
            </VIcon>
          </VBtn>
        </div>
      </VToolbar>

      <JsonEditor
        v-model:data="request"
        :readonly="readonly"
        :on-validate="onEditorValidate"

        class="h-[500px]"
      />
    </VCard>
  </div>
</template>
