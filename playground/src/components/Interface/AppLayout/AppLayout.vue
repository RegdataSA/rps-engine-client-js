<script setup lang="ts">
import { VApp } from 'vuetify/components'
import { NotifySpawn } from 'gitart-vue-notify'

import { useLayout } from '@/composables/layout'

const {
  layout,
} = useLayout()
</script>

<template>
  <VApp>
    <AppLayoutToolbar />

    <Component :is="layout">
      <RouterView v-slot="{ Component: component }">
        <Transition name="layout-fade" mode="out-in">
          <Component :is="component" />
        </Transition>
      </RouterView>
    </Component>

    <NotifySpawn>
      <template #item="{message, type, close, progress}">
        <AppToast
          class="mb-3"
          :message="message"
          :type="type"
          :progress="progress"
          @close="close()"
        />
      </template>
    </NotifySpawn>
  </VApp>
</template>

<style lang="scss">
.layout-fade-enter-active,
.layout-fade-leave-active {
  transition: opacity 0.3s ease;
}

.layout-fade-enter-from,
.layout-fade-leave-to {
  opacity: 0;
}
</style>
