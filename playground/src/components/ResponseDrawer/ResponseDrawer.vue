<script setup lang="ts">
import { useClientStore } from '@/stores/client.store'

const clientStore = useClientStore()

const drawer = defineModel<boolean>('drawer', {
  required: true,
})

const drawerSettings = useLocalStorage('drawerSettings', {
  width: 300,
  fixed: false,
})

const onToggleFixedDrawer = () => {
  drawerSettings.value.fixed = !drawerSettings.value.fixed

  if (!drawerSettings.value.fixed) {
    setTimeout(() => {
      drawer.value = true
    }, 100)
  }
}
</script>

<template>
  <VNavigationDrawer
    v-model:model-value="drawer"
    :width="drawerSettings.width"
    :permanent="drawerSettings.fixed"
    :location="$vuetify.display.mobile ? 'bottom' : 'right'"
    temporary
  >
    <VToolbar class="px-4">
      Response

      <template v-if="clientStore.lastTransformData.timestamp">
        ({{ new Date(clientStore.lastTransformData.timestamp).toLocaleTimeString() }})
      </template>

      <div class="flex-grow" />

      <VBtn icon>
        <VIcon @click="clientStore.clearTransformData">
          mdi-delete-outline
        </VIcon>
      </VBtn>

      <VBtn icon>
        <VIcon @click="onToggleFixedDrawer">
          <template v-if="drawerSettings.fixed">
            mdi-pin-off-outline
          </template>

          <template v-else>
            mdi-pin-outline
          </template>
        </VIcon>
      </VBtn>

      <VBtn icon>
        <VIcon @click="drawer = false">
          mdi-close
        </VIcon>
      </VBtn>
    </VToolbar>

    <div class="flex justify-end items-center gap-2">
      Width:
      <div class="w-55">
        <VSlider
          v-model="drawerSettings.width"
          :max="700"
          :min="320"
          hide-details
          step="20"
        />
      </div>
    </div>

    <JsonEditor
      class="h-[calc(100vh-128px-32px)]"
      :data="clientStore.lastTransformData.response"
    />
  </VNavigationDrawer>
</template>
