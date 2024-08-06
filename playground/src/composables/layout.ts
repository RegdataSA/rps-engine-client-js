const DefaultLayout = defineAsyncComponent(() => import('@/components/Interface/Layouts/DefaultLayout/DefaultLayout.vue'))
const EmptyLayout = defineAsyncComponent(() => import('@/components/Interface/Layouts/EmptyLayout/EmptyLayout.vue'))

const layouts = {
  default: DefaultLayout,
  empty: EmptyLayout,
}

export const useLayout = () => {
  const route = useRoute()

  const layout = computed(() => {
    const layout = route.meta.layout as keyof typeof layouts

    return layouts[layout] || layouts.default
  })

  return {
    layout,
  }
}
