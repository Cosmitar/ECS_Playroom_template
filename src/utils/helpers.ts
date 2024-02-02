export const hasPlayroomId = () => getHashValue('r') !== ''

export const getHashValue = (name: string) => {
  const hashes = new Proxy(new URLSearchParams(window.location.hash.replace('#', '')), {
    get: (searchParams, prop: string) => searchParams.get(prop),
  })
  // @ts-ignore
  return decodeURIComponent(hashes[name] || '')
}

export const setHashValue = (name: string, value: string) => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.hash.replace('#', ''))
  value.trim() === '' ? params.delete(name) : params.set(name, encodeURIComponent(value))

  url.hash = '#' + params.toString()
  window.location.href = url as unknown as string
}
