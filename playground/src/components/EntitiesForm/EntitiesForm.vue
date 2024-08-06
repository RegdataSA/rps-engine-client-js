<script setup lang="ts">
import type {
  IContext,
  IEvidence,
  IInstance,
} from 'rps-engine-client-js/dev'

import {

} from 'rps-engine-client-js/dev'

const formRequestData = defineModel<{
  instances: IInstance[]
  rightsContext: IContext
  processingContext: IContext
} | null>('formRequestData', {
  required: false,
  default: null,
})

const values = ref<IInstance[]>([])
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

watch([values, rightsContextEvidences, processingContextEvidences], () => {
  formRequestData.value = {
    instances: values.value,
    rightsContext: {
      evidences: rightsContextEvidences.value,
    },
    processingContext: {
      evidences: processingContextEvidences.value,
    },
  }
}, { deep: true })

const mounted = useMounted()
</script>

<template>
  <div>
    <!-- <Teleport v-if="mounted" to="#validation-errors">
      <VExpandTransition>
        <div v-if="validationError">
          <VAlert color="error" variant="tonal">
            <div class="font-bold mb-2">
              {{ validationError.message }}
            </div>

            <pre v-text="validationError.entity" />
          </VAlert>
        </div>

        <div v-else>
          <VAlert color="success" variant="tonal">
            No validation errors
          </VAlert>
        </div>
      </VExpandTransition>
    </Teleport> -->

    <div class="flex items-center mb-4">
      <div class="text-xl font-bold">
        Request data
      </div>

      <div class="flex-grow" />

      <VBtn
        color="primary"
        variant="tonal"
        @click="onSetDraft"
      >
        Set draft
      </VBtn>
    </div>

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

    <div class="h-4" />

    <div class="grid grid-cols-2 gap-4">
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
  </div>
</template>

<style lang="scss" scoped></style>
