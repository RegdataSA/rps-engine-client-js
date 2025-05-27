<script setup lang="ts">
import {
  type IEvidence,
  type IInstance,
  RPSCraft,
} from 'rps-engine-client-js/dev'

const requestData = defineModel<any | null>('request', {
  required: false,
  default: null,
})

const values = ref<IInstance[]>([])
const secretsManager = ref<string>()
const rightsContextEvidences = ref<IEvidence[]>([])
const processingContextEvidences = ref<IEvidence[]>([])

const onSetDraft = () => {
  values.value = [
    {
      className: 'User',
      propertyName: 'FirstName',
      value: 'Jonny',
    },
    {
      className: 'User',
      propertyName: 'LastName',
      value: 'Silverhand',
    },
    {
      className: 'User',
      propertyName: 'BirthDate',
      value: '16.11.1988',
    },
  ]

  rightsContextEvidences.value = [
    {
      name: 'Role',
      value: 'Admin',
    },
  ]

  processingContextEvidences.value = [
    {
      name: 'Action',
      value: 'Protect',
    },
  ]
}

const $notify = useNotify()
const onGenerateRequest = () => {
  try {
    const rpsCraft = new RPSCraft()
    rpsCraft.addRequest({
      instances: values.value,
      secretsManager: secretsManager.value,
      rightsContext: {
        evidences: rightsContextEvidences.value,
      },

      processingContext: {
        evidences: processingContextEvidences.value,
      },
    })

    requestData.value = rpsCraft.build()
  }
  catch (error: any) {
    $notify.error(error.message || 'Something went wrong. Please check the form data.')
  }
}

const {
  copy: onCopy,
} = useClipboard({
  source: computed(() => JSON.stringify(requestData.value, null, 2)),
})
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <VCard>
      <VToolbar>
        <div class="px-4 flex gap-3 w-full">
          <div class="flex-grow" />

          <VBtn
            color="primary"
            variant="tonal"
            @click="onSetDraft"
          >
            Set draft
          </VBtn>
        </div>
      </VToolbar>

      <VCard class="px-6 py-5">
        <div class="text-lg font-semibold">
          Values
        </div>

        <VList>
          <div
            v-for="(value, index) in values"
            :key="index"
            class="py-1"
          >
            <div class="grid grid-cols-[1fr_1fr_1fr_auto] gap-5">
              <div>
                <VTextField
                  v-model="value.className"
                  label="Class"
                  density="compact"
                />
              </div>

              <div>
                <VTextField
                  v-model="value.propertyName"
                  label="Property"
                  density="compact"
                />
              </div>

              <div>
                <VTextField
                  v-model="value.value"
                  label="Value"
                  density="compact"
                />
              </div>

              <div>
                <VBtn
                  color="error"
                  variant="text"
                  icon
                  size="small"
                  @click="values.splice(index, 1)"
                >
                  <VIcon>
                    mdi-delete
                  </VIcon>
                </VBtn>
              </div>
            </div>
          </div>

          <VListItem variant="outlined" @click="values.push({ className: '', propertyName: '', value: '' })">
            <VIcon>
              mdi-plus
            </VIcon>

            Add value
          </VListItem>
        </VList>
      </VCard>

      <VCard class="px-6 py-5">
        <div class="text-lg font-semibold">
          Secrets manager
        </div>

        <div class="py-3">
          <VTextField
            v-model="secretsManager"
            label="Secrets manager ID"
            density="compact"
            hide-details
          />
        </div>
      </VCard>

      <div class="grid grid-cols-2">
        <VCard class="px-6 py-5">
          <div class="text-lg font-semibold">
            Rights context
          </div>

          <VList>
            <div
              v-for="(evidence, index) in rightsContextEvidences"
              :key="index"
              class="py-1"
            >
              <div class="grid grid-cols-[1fr_1fr_auto] gap-5">
                <div>
                  <VTextField
                    v-model="evidence.name"
                    label="Name"
                    density="compact"
                  />
                </div>

                <div>
                  <VTextField
                    v-model="evidence.value"
                    label="Value"
                    density="compact"
                  />
                </div>

                <div>
                  <VBtn
                    color="error"
                    variant="text"
                    icon
                    size="small"
                    @click="rightsContextEvidences.splice(index, 1)"
                  >
                    <VIcon>
                      mdi-delete
                    </VIcon>
                  </VBtn>
                </div>
              </div>
            </div>

            <VListItem variant="outlined" @click="rightsContextEvidences.push({ name: '', value: '' })">
              <VIcon>
                mdi-plus
              </VIcon>

              Add evidence
            </VListItem>
          </VList>
        </VCard>

        <VCard class="px-6 py-5">
          <div class="text-lg font-semibold">
            Processing context
          </div>

          <VList>
            <div
              v-for="(evidence, index) in processingContextEvidences"
              :key="index"
              class="py-1"
            >
              <div class="grid grid-cols-[1fr_1fr_auto] gap-5">
                <div>
                  <VTextField
                    v-model="evidence.name"
                    label="Name"
                    density="compact"
                  />
                </div>

                <div>
                  <VTextField
                    v-model="evidence.value"
                    label="Value"
                    density="compact"
                  />
                </div>

                <div>
                  <VBtn
                    color="error"
                    variant="text"
                    icon
                    size="small"
                    @click="processingContextEvidences.splice(index, 1)"
                  >
                    <VIcon>
                      mdi-delete
                    </VIcon>
                  </VBtn>
                </div>
              </div>
            </div>

            <VListItem variant="outlined" @click="processingContextEvidences.push({ name: '', value: '' })">
              <VIcon>
                mdi-plus
              </VIcon>

              Add evidence
            </VListItem>
          </VList>
        </VCard>
      </div>

      <div class="p-4">
        <VBtn
          size="large"
          color="primary"
          variant="tonal"
          class="w-full"
          @click="onGenerateRequest"
        >
          Generate request
        </VBtn>
      </div>
    </VCard>

    <JsonEditorCard
      v-model:data="requestData"
    >
      <template #title>
        <VBtn
          icon
          color="success"
          size="small"
          variant="tonal"
          @click="onCopy()"
        >
          <VIcon>
            mdi-content-copy
          </VIcon>
        </VBtn>
      </template>
    </JsonEditorCard>

    <!-- <VCard> -->
    <!-- <VToolbar>
        <div class="px-4 flex gap-3 w-full">
          <div class="text-lg font-semibold">
            Request
          </div>

          <div class="flex-grow" />
        </div>
      </VToolbar>

      <JsonEditor
        v-model:data="requestData"
        class="h-[500px]"
      >

      </JsonEditor> -->
    <!-- </VCard> -->
  </div>
</template>

<style lang="scss" scoped></style>
