<script setup lang="ts">
import type { JSONEditorOptions } from 'jsoneditor'

import JSONEditor from 'jsoneditor'

import 'jsoneditor/dist/jsoneditor.min.css'

const props = withDefaults(defineProps<{
  data: any
  options?: JSONEditorOptions
  readonly?: boolean
  onValidate?: JSONEditorOptions['onValidate']
  onValidationError?: JSONEditorOptions['onValidationError']
}>(), {
  options: () => ({}),
  readonly: false,
})

const emit = defineEmits<{
  (e: 'update:data', value: any): void
  (e: 'error', value: any): void
}>()

const allOptions = computed<JSONEditorOptions>(() => {
  return {
    mode: 'code',
    onEditable: props.readonly ? () => false : undefined,
    statusBar: false,
    mainMenuBar: false,
    navigationBar: false,
    onValidate: props.readonly ? undefined : props.onValidate,
    onValidationError: props.readonly ? undefined : props.onValidationError,

    ...props.options,
  }
})

const editor = ref<null | JSONEditor>(null)
const internalChange = ref(false)

const jsoneditorRef = ref<HTMLDivElement>()

const targetIsVisible = ref(false)
useIntersectionObserver(
  jsoneditorRef,
  ([{ isIntersecting }]) => {
    targetIsVisible.value = isIntersecting
  },
)

watch(targetIsVisible, (value) => {
  if (value) {
    editor.value!.set(props.data)
  }
})

watch(() => props.data, (value) => {
  if (editor.value && value !== undefined && !internalChange.value) {
    editor.value.set(value)
  }
}, { deep: true })

const onChange = function(...args: any[]) {
  let error = null
  let json = {}
  try {
    json = editor.value!.get()
  }
  catch (err) {
    error = err
  }
  if (error) {
    emit('error', error)
  }
  else {
    if (editor.value) {
      internalChange.value = true
      emit('update:data', json)

      nextTick(() => {
        internalChange.value = false
      })
    }
  }

  if (props.options.onChange) {
    // @ts-ignore
    props.options.onChange(...args)
  }
}

onMounted(() => {
  if (!editor.value) {
    const container = jsoneditorRef.value!

    editor.value = new JSONEditor(container, {
      ...allOptions.value,
      onChange,
    })
  }

  editor.value.set(props.data)
})

watch(allOptions, (value) => {
  if (editor.value) {
    editor.value.destroy()

    const container = jsoneditorRef.value!
    editor.value = new JSONEditor(container, {
      ...allOptions.value,
      onChange,
    })

    editor.value.set(props.data)
  }
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
    editor.value = null
  }
})
</script>

<template>
  <div class="jsoneditor-container">
    <div ref="jsoneditorRef" class="jsoneditor-box" />
  </div>
</template>

<style lang="scss">
.jsoneditor {
  border: none !important;
}

.jsoneditor-container {
  position: relative;
  min-width: 300px;
  width: 100%;
}

.jsoneditor-box {
  height: 100%;

  ::v-deep() .jsoneditor {
    @apply
      '!border-tw-border'
    ;
  }
}
</style>
