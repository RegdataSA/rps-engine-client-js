<script setup lang="ts">
import { useClientStore } from '@/stores/client.store'

definePage({
  meta: {
    layout: 'empty',
  },
})

const clientStore = useClientStore()

const drawer = ref(false)

const requestData = ref<any | null>(null)

const onTransform = async() => {
  await clientStore.transform(requestData.value as any)
  drawer.value = true
}
</script>

<template>
  <VContainer fluid class="px-8">
    <div class="text-xl mb-4 pb-1 font-semibold border-b border-b-gray flex items-center gap-2">
      Form Editor

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

    <AdvancedForm
      v-model:request="requestData"
    />

    <ResponseDrawer
      v-model:drawer="drawer"
    />

    <div class="h-50vh" />
  </VContainer>
</template>
