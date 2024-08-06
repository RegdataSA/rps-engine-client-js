<script setup lang="ts">
import { EngineClient } from 'rps-engine-client-js'

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

const isValid = defineModel<boolean>('isValid', {
  required: false,
  default: true,
})

const requestEditorValidation = ref<null | string>(null)

const {
  copy,
} = useClipboard({
  source: computed(() => JSON.stringify(request.value, null, 2)),
})
</script>

<template>
  <div>
    <JsonEditorCard
      v-model:data="request"
      :valid="isValid"
      :loading="isLoading"
      :readonly="readonly"
    >
      <template #title>
        <div class="text-lg font-semibold">
          Request
        </div>

        <div class="flex-grow" />

        <VBtn
          icon
          color="success"
          size="x-small"
          variant="tonal"
          @click="copy()"
        >
          <VIcon>
            mdi-content-copy
          </VIcon>
        </VBtn>
      </template>
    </JsonEditorCard>

    <pre>
      {{ requestEditorValidation }}
    </pre>
  </div>
</template>
