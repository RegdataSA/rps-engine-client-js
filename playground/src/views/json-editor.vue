<script setup lang="ts">
import { useClientStore } from '@/stores/client.store'

definePage({
  meta: {
    layout: 'empty',
  },
})

const request = useLocalStorage('json-editor-request', {})
const validation = ref(null)

const clientStore = useClientStore()

const drawer = ref(false)

const onTransform = async() => {
  await clientStore.transform(request.value as any)
  drawer.value = true
}
</script>

<template>
  <VContainer fluid class="px-8">
    <ResponseDrawer
      v-model:drawer="drawer"
    />

    <div class="text-xl mb-4 pb-1 font-semibold border-b border-b-gray flex items-center gap-2">
      JSON Editor

      <div class="flex-grow" />

      <VBtn color="primary" @click="onTransform">
        Transform

        <VIcon class="mb-1" end>
          mdi-atom-variant
        </VIcon>
      </VBtn>

      <VBtn
        color="primary"
        variant="tonal"
        @click="drawer = !drawer"
      >
        Response

        <VIcon end>
          mdi-menu
        </VIcon>
      </VBtn>
    </div>

    <AdvancedEditor
      v-model:request="request"
      v-model:validation="validation"
    />
  </VContainer>
</template>
