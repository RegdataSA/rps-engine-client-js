<template>
  <VAppBar absolute>
    <VContainer class="flex items-center py-0" fluid>
      <VBtn
        to="/"
        variant="text"
        color="white"
      >
        Playground

        <VChip density="compact" class="ml-2">
          rps-engine-client-js
        </VChip>
      </VBtn>

      <div class="flex-grow" />

      <DefineClientInstance />

      <div class="flex-grow" />

      <div class="flex gap-3">
        <VBtn to="/form-editor">
          Form editor
        </VBtn>

        <VBtn to="/json-editor">
          JSON editor
        </VBtn>
      </div>
    </VContainer>
  </VAppBar>
</template>
