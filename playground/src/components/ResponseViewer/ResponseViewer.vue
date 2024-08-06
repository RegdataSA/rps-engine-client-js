<script setup lang="ts">
import type { ITransformInput, ITransformOutput } from 'rps-engine-client-js/dev'

import { RPSAgent } from 'rps-engine-client-js/dev'

const props = withDefaults(defineProps<{
  response: null | ITransformOutput
  request: null | ITransformInput
  isLoading: boolean
}>(), {
  response: null,
})

const isWithOriginals = ref(false)

watch([() => props.response && props.request], () => {
  isWithOriginals.value = false
})

const responseComputed = computed(() => {
  if (!props.response) {
    return null
  }

  if (isWithOriginals.value) {
    const value = RPSAgent.processTransformOutput(props.response!, props.request!)
    return value
  }

  return props.response
})

const {
  copy,
} = useClipboard({
  source: computed(() => JSON.stringify(responseComputed.value, null, 2)),
})
</script>

<template>
  <JsonEditorCard
    :data="responseComputed"
    :loading="isLoading"
    readonly
  >
    <template #title>
      <div class="text-lg font-semibold">
        Response

        <template v-if="response?.duration">
          ({{ response?.duration }} ms)
        </template>
      </div>

      <div class="flex-grow" />

      <VSwitch
        v-model="isWithOriginals"
        label="With Originals"
        hide-details
        color="primary"
        density="compact"
      />

      <VBtn
        class="ml-4"
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
</template>
