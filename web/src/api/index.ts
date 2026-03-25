function matchUrl (location: string, regexp: string | RegExp, urlTemplate: any) {
  const matches = location.match(new RegExp(regexp))
  if (!matches) {
    return null
  }

  let url = urlTemplate
  for (let i = 1; i < matches.length; i++) {
    url = url.replace(new RegExp(String.raw`\{${i}\}`, 'g'), matches[i])
  }

  return url
}

export function resolveApiUrl (apiUrlMappingObject: any, href: string) {
  let apiUrlMapping = []

  try {
    apiUrlMapping = JSON.parse(apiUrlMappingObject)
  } catch (error) {
    window.console.error('JSON for API URL seems to be malformed. None will be used.', error)
    return null
  }

  for (const key in apiUrlMapping) {
    const resultUrl = matchUrl(href, key, apiUrlMapping[key])
    if (resultUrl) {
      // window.console.log(`API URL FROM MAPPING: ${resultUrl}`)
      return resultUrl
    }
  }

  window.console.warn('No matching API URL found. None will be used.')
  return null
}
