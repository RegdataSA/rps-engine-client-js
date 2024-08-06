<script setup lang="ts">
import type { JSONEditorOptions } from 'jsoneditor'

import JsonEditor from './JsonEditor.vue'

const props = defineProps<{
  loading?: boolean
  readonly?: boolean
  onValidate?: JSONEditorOptions['onValidate']
}>()

const emit = defineEmits<{
  (e: 'update:data', value: any): void
  (e: 'update:valid', value: boolean): void
}>()

const data = defineModel<any>('data', {
  required: true,
})

const valid = defineModel<boolean>('valid', {
  required: false,
})

</script>

<template>
  <VCard
    :loading="loading"
    class="json-editor-card"
  >
    <div class="py-2 px-5 min-h-[60px] flex items-center">
      <slot name="title" />
    </div>

    <JsonEditor
      v-model:data="data"
      v-model:valid="valid"
      :on-validate="onValidate"
      class="h-[500px]"
    />
  </VCard>
</template>

<style lang="scss">
.json-editor-card {
  padding: 0 !important;
  @apply
    shadow-md
  ;
}
</style>
