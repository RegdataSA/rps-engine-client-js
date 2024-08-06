<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  /**
   * Progress in percent (0-100)
   */
  progress?: number | string

  type: 'success' | 'error' | 'warning' | 'info'

  message?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onClose = () => {
  emit('close')
}

const attrs = useAttrs()
const classes = computed(() => [
  'a-toast',
  `a-toast--type-${props.type}`,
  attrs.class,
])

const alertRef = ref<HTMLElement>()
</script>

<template>
  <div ref="alertRef" class="w-full">
    <VAlert
      variant="flat"
      :color="type"
      :class="classes"
      closable
    >
      <template #close>
        <VBtn
          color="white"
          variant="tonal"
          @click="onClose"
        >
          <VIcon size="16">
            mdi-close
          </VIcon>
        </VBtn>
      </template>

      <slot>
        {{ message }}
      </slot>

      <div
        v-if="progress"
        class="a-toast__progress"
        :style="{
          '--notify-progress': progress + '%'
        }"
      />
    </VAlert>
  </div>
</template>

<style lang="scss">
.a-toast {
  border-radius: 12px;

  @apply
    w-full whitespace-pre-line relative
  ;

  &--type-warning {
    @apply
      font-medium
    ;
  }

  &__progress {
    @apply
      absolute bottom-0 left-0 right-0 h-1
    ;

    &:after {
      content: '';
      width: var(--notify-progress);

      @apply
        absolute top-0 left-0 h-full
        bg-white bg-opacity-70
      ;
    }
  }
}
</style>
