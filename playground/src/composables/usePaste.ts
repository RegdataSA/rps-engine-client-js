export const usePaste = () => {
  const $notify = useNotify()

  const getText = async() => {
    let clipboardItems: ClipboardItem[]
    try {
      clipboardItems = await navigator.clipboard.read()
      if (clipboardItems[0].types.includes('text/plain')) {
        const blob = await clipboardItems[0].getType('text/plain')
        const text = await blob.text()

        return text
      }

      return null
    }
    catch (err) {
      $notify.warning('No permission to access clipboard')
    }
  }

  return {
    getText,
  }
}

export const useCopyPasteJson = (source: Ref<string>) => {
  const { copy } = useClipboard()
  const { getText } = usePaste()

  const onCopy = () => {
    copy(JSON.stringify(source.value, null, 2))
  }

  const onPaste = async() => {
    try {
      const text = await getText()
      if (text) {
        source.value = JSON.parse(text)
      }
    }
    catch (error) {}
  }

  return {
    onCopy,
    onPaste,
  }
}
