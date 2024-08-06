<script setup lang="ts">
import { useClientStore } from '@/stores/client.store'

const clientStore = useClientStore()

const formData = ref({
  identityUrl: '',
  engineUrl: '',

  clientId: '',
  clientSecret: '',
})

formData.value.engineUrl = clientStore.engineUrlDefault
formData.value.identityUrl = clientStore.identityUrlDefault

const isTokenFetchingLoading = ref(false)

const onCancel = () => {
  clientStore.toggleExpand()
}

const { formRef, validateForm } = useVForm()
const onSubmit = async() => {
  const isValid = await validateForm()
  if (!isValid) return

  await clientStore.setCredentials({
    clientId: formData.value.clientId,
    clientSecret: formData.value.clientSecret,
    engineUrl: formData.value.engineUrl,
    identityUrl: formData.value.identityUrl,
  })

  clientStore.toggleExpand()
}

const isLoading = computed(() => {
  return isTokenFetchingLoading.value
})

const $notify = useNotify()
const isIdentityCheckLoading = ref(false)
const onCheckIdentity = async() => {
  try {
    isIdentityCheckLoading.value = true
    await clientStore.checkIdentity({
      clientId: formData.value.clientId,
      clientSecret: formData.value.clientSecret,
      identityUrl: formData.value.identityUrl,
    })

    $notify.success('Identity check success')
  }
  catch (error: any) {
    $notify.warning(error.message)
  }
  finally {
    isIdentityCheckLoading.value = false
  }
}

const onClearCredentials = () => {
  clientStore.clearCredentials()
}

const classes = computed(() => [
  'token-provider-frame', {
    'token-provider-frame--loading': clientStore.initializeLoading,
    'token-provider-frame--authorized': clientStore.isAuthorized,
  },
])

</script>

<template>
  <VListItem class="py-4">
    <VAlert
      variant="outlined"
      :class="classes"
    >
      <VForm ref="formRef" @submit.prevent="onSubmit">
        <div class="font-bold mb-4 text-xl">
          Define RPS Agent
        </div>

        <div class="mb-3 font-medium border-b text-lg">
          Identity
        </div>

        <VTextField
          v-model="formData.identityUrl"
          label="Identity url"
          density="compact"
          color="white"
          class="text-white mb-2"
          :placeholder="clientStore.identityUrlPlaceholder"
          required
          :rules="[
            (v: string) => !!v || 'Identity api endpoint is required',
          ]"
        >
          <template #append-inner>
            <div class="w-1" />

            <VBtn
              icon
              size="x-small"
              tabindex="-1"
              @click="formData.identityUrl = ''"
            >
              <VIcon>
                mdi-close
              </VIcon>
            </VBtn>

            <VBtn
              v-if="formData.identityUrl !== clientStore.identityUrlDefault"
              icon
              size="x-small"
              @click="formData.identityUrl = clientStore.identityUrlDefault"
            >
              <VIcon>
                mdi-refresh
              </VIcon>
            </VBtn>
          </template>
        </VTextField>

        <VTextField
          v-model="formData.clientId"
          label="Client ID"
          density="compact"
          color="white"
          class="text-white mb-2"
          required
          :rules="[
            (v: string) => !!v || 'Client ID is required',
          ]"
        >
          <template #append-inner>
            <div class="w-1" />

            <VBtn
              icon
              size="x-small"
              tabindex="-1"
              @click="formData.clientId = ''"
            >
              <VIcon>
                mdi-close
              </VIcon>
            </VBtn>
          </template>
        </VTextField>

        <VTextField
          v-model="formData.clientSecret"
          label="Client Secret"
          density="compact"
          color="white"
          class="text-white mb-2"
          type="password"
          required
          :rules="[
            (v: string) => !!v || 'Client secret is required',
          ]"
        >
          <template #append-inner>
            <div class="w-1" />

            <VBtn
              icon
              size="x-small"
              tabindex="-1"
              @click="formData.clientSecret = ''"
            >
              <VIcon>
                mdi-close
              </VIcon>
            </VBtn>
          </template>
        </VTextField>

        <div class="flex">
          <VBtn
            class="mb-4 ml-auto"
            variant="tonal"
            size="small"
            :loading="isIdentityCheckLoading"
            @click="onCheckIdentity"
          >
            Check identity auth
          </VBtn>
        </div>

        <div class="mb-3 font-medium border-b text-lg">
          Engine
        </div>

        <VTextField
          v-model="formData.engineUrl"
          label="Engine url"
          density="compact"
          color="white"
          class="text-white"
          :placeholder="clientStore.engineUrlPlaceholder"
          required
          :rules="[
            (v: string) => !!v || 'Engine url is required',
          ]"
        >
          <template #append-inner>
            <div class="w-1" />

            <VBtn
              icon
              size="x-small"
              tabindex="-1"
              @click="formData.engineUrl = ''"
            >
              <VIcon>
                mdi-close
              </VIcon>
            </VBtn>

            <VBtn
              icon
              size="x-small"
              @click="formData.engineUrl = clientStore.engineUrlDefault"
            >
              <VIcon>
                mdi-refresh
              </VIcon>
            </VBtn>
          </template>
        </VTextField>

        <div class="flex gap-3 pt-3">
          <VBtn
            v-if="clientStore.isAuthorized"
            color="error"
            variant="tonal"
            @click="onClearCredentials"
          >
            Clear
          </VBtn>

          <div class="flex-grow" />

          <VBtn
            v-if="clientStore.isAuthorized"
            variant="tonal"
            @click="onCancel"
          >
            Cancel
          </VBtn>

          <VBtn
            :loading="isLoading"
            type="submit"
            color="success"
            class="px-8"
          >
            Set
          </VBtn>
        </div>
      </VForm>
    </VAlert>
  </VListItem>
</template>

<style lang="scss">
.token-provider-frame {
  @apply
    transition-all duration-300
    border border-yellow-600
  ;

  &--loading {
    @apply
      border-gray-400
    ;
  }

  &--authorized {
    @apply
      border-green-600
    ;
  }
}
</style>
