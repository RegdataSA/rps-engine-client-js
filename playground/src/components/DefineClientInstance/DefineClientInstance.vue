<script setup lang="ts">
import { useClientStore } from '@/stores/client.store'

const clientStore = useClientStore()
</script>

<template>
  <VMenu
    location="bottom center"
    :close-on-content-click="false"
  >
    <template #activator="{props: menuProps}">
      <VBtn
        v-bind="menuProps"
        variant="outlined"
        :color="clientStore.initializeLoading ? 'white' : clientStore.isAuthorized ? 'success' : 'warning'"
      >
        <template v-if="clientStore.initializeLoading">
          <VProgressCircular
            size="small"
            width="3"
            indeterminate
          />
        </template>

        <template v-else-if="clientStore.isAuthorized">
          <VIcon color="success">
            mdi-check-circle-outline
          </VIcon>
        </template>

        <template v-else>
          <VIcon color="warning">
            mdi-alert
          </VIcon>
        </template>

        <div class="pl-2">
          RPS Agent
        </div>
      </VBtn>
    </template>

    <VCard class="w-120 max-h-90vh overflow-auto">
      <VListItem @click="clientStore.toggleExpand">
        <div class="text-lg pt-3 px-2 pb-3 font-semibold flex items-center gap-3">
          <template v-if="clientStore.initializeLoading">
            <VProgressCircular
              size="small"
              width="3"
              indeterminate
            />
          </template>

          <template v-else-if="clientStore.isAuthorized">
            <VIcon color="success">
              mdi-check-circle-outline
            </VIcon>
          </template>

          <template v-else>
            <VIcon color="warning">
              mdi-alert
            </VIcon>
          </template>

          RPS Agent

          <div class="flex-grow" />

          <VIcon>
            <template v-if="clientStore.isExpanded">
              mdi-chevron-up
            </template>
            <template v-else>
              mdi-chevron-down
            </template>
          </VIcon>
        </div>

        <div v-if="clientStore.isAuthorized" class="pt-3 pb-2">
          <VBtn
            v-if="clientStore.isSavedToLocalStorage === false"
            variant="tonal"
            @click.stop="clientStore.saveCredentialsToLocalStorage"
          >
            Save to local storage

            <VChip
              density="compact"
              color="error"
              variant="flat"
              class="!px-2 ml-2 -mr-2"
            >
              testing only
            </VChip>
          </VBtn>

          <VBtn
            v-else
            color="error"
            variant="tonal"
            @click.stop="clientStore.removeCredentialsFromLocalStorage"
          >
            Remove from local storage
          </VBtn>
        </div>
      </VListItem>

      <VExpandTransition>
        <div v-if="clientStore.isExpanded">
          <AgentFormFrame />
        </div>
      </VExpandTransition>
    </VCard>
  </VMenu>
</template>
