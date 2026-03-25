import { dateToString } from '@/utils/dateUtils'
import { camelToKebab, isValueFilled } from '@/utils/generalUtils'

// export function mapStatParamsToURL(urlParameters: object, statParams: object,
//   statParamsDefault: object, statParamsUrlParsingMethod: object) {
//   mapObjectToURL(urlParameters, statParams, 'stat', statParamsDefault, statParamsUrlParsingMethod)
// }

// export function mapStatParamsFromURL(urlParameters: object, statParams: object,
//   statParamsDefault: object, statParamsUrlParsingMethod: object) {
//   mapObjectFromURL(urlParameters, statParams, 'stat', statParamsDefault, statParamsUrlParsingMethod)
// }

export function parseParamFromUrl (param: any, paramDefault: any, parsingType: string): any {
  if (param === null || param === undefined) {
    return paramDefault
  }
  switch (parsingType) {
    case 'string': {
      return String(param)
    }
    case 'stringArray': {
      return param.split('_')
    }
    case 'number': {
      return Number(param)
    }
    case 'boolean': {
      return param === 'yes'
    }
    case 'booleanOrNull': {
      if (param === 'yes') {
        return true
      } else if (param === 'no') {
        return false
      } else {
        return null
      }
    }
    case 'date': {
      return new Date(String(param))
    }
    default: {
      return String(param)
    }
  }
}

export function parseUrlParam (
  value: any,
  valueDefault: any,
  parsingType: string,
): any {
  switch (parsingType) {
    case 'string': {
      return isValueFilled(value) ? value : valueDefault
    }
    case 'stringArray': {
      return isValueFilled(value) ? value.join('_') : valueDefault.join('_')
    }
    case 'number': {
      return isValueFilled(value) ? value : valueDefault
    }
    case 'boolean': {
      return value ? 'yes' : 'no'
    }
    case 'booleanOrNull': {
      if (isValueFilled(value)) {
        return value ? 'yes' : 'no'
      } else {
        return 'all'
      }
    }
    case 'date': {
      return dateToString(value)
    }
    default: {
      return isValueFilled(value) ? value : valueDefault
    }
  }
}

export function addParamToUrl (
  urlParameters: Record<string, any>,
  paramKey: string,
  value: any,
  valueDefault: any,
  parsingMethod: string,
) {
  const parsedParam = parseUrlParam(value, valueDefault, parsingMethod)

  if (parsedParam) {
    urlParameters[paramKey] = parsedParam
  }
}

export function mapObjectToURL (
  urlParameters: object,
  obj: Record<string, any>,
  prefixInUrl: string,
  objDefault: Record<string, any>,
  objUrlParsingMethod: Record<string, any>,
) {
  for (const key of Object.keys(obj)) {
    const kebabCaseKey = camelToKebab(key)
    // временно убрал, потому что с этим префиксом нихера не работало
    const paramKey = `${kebabCaseKey}`
    addParamToUrl(urlParameters, paramKey, obj[key], objDefault[key], objUrlParsingMethod[key])
  }
}

export function mapObjectFromURL (
  urlParameters: Record<string, string>,
  obj: any,
  prefixInUrl: string,
  objDefault: any,
  objUrlParsingMethod: Record<string, any>,
) {
  for (const key of Object.keys(obj)) {
    const kebabCaseKey = camelToKebab(key)
    // временно убрал, потому что с этим префиксом нихера не работало
    const paramKey = `${kebabCaseKey}`
    obj[key] = parseParamFromUrl(urlParameters[paramKey], objDefault[key], objUrlParsingMethod[key])
  }
}
export function mapSortToURL (urlParameters: Record<string, string | undefined>,
  sortBy: Array<{ key: string, order: 'asc' | 'desc' | undefined }>,
  sortByDefault: Array<{ key: string, order: 'asc' | 'desc' | undefined }>,
) {
  if (sortBy[0] && sortByDefault[0]) {
    urlParameters['sort-by'] = sortBy[0].key ?? sortByDefault[0].key
    urlParameters['sort-desc'] = sortBy[0].order ?? sortByDefault[0].order
  }
}
function AscOrDescReturner (urlParameters: Record<string, string>) {
  if (urlParameters['sort-desc'] === 'desc') {
    return 'desc'
  } else if (urlParameters['sort-desc'] === 'asc') {
    return 'asc'
  } else {
    return undefined
  }
}

export function mapSortFromURL (
  urlParameters: Record<string, string>,
  sortBy: Array<{ key: string, order: any }>,
  sortByDefault: Array<{ key: string, order: 'asc' | 'desc' | undefined }>,
) {
  if (sortBy[0] && sortByDefault[0]) {
    if (urlParameters['sort-desc']) {
      sortBy[0].key = String(urlParameters['sort-by'])
      sortBy[0].order = AscOrDescReturner(urlParameters)
    } else {
      sortBy[0].key = sortByDefault[0].key
      // sortBy[0].order = sortByDefault[0].order
    }
  } else {
    return
  }
}
export function mapPaginationToURL (
  urlParameters: Record<string, number>,
  pagination: { itemsPerPage: number, page: number },
  paginationDefault: { itemsPerPage: number, page: number },
) {
  urlParameters['items-per-page'] = pagination.itemsPerPage ?? paginationDefault.itemsPerPage
  urlParameters['page'] = pagination.page
}
export function mapPaginationFromURL (
  urlParameters: Record<string, string>,
  pagination: { itemsPerPage: number, page: number },
  paginationDefault: { itemsPerPage: number, page: number },
) {
  if (urlParameters['page']) {
    pagination.page = Number(urlParameters['page'])
    pagination.itemsPerPage = Number(urlParameters['items-per-page'])
  } else {
    pagination.itemsPerPage = paginationDefault.itemsPerPage
    pagination.page = paginationDefault.page
  }
}
export function getSortDesc (sortBy: 'asc' | 'desc' | undefined) {
  if (sortBy === 'desc') {
    return true
  } else if (sortBy === 'asc') {
    return false
  } else {
    return undefined
  }
};
export function mapFilterToURL (urlParameters: object, filter: object,
  filterDefault: object, filterUrlParsingMethod: object) {
  mapObjectToURL(urlParameters, filter, 'f', filterDefault, filterUrlParsingMethod)
}
export function mapFilterFromURL (
  urlParameters: Record<string, string>,
  filter: object,
  filterDefault: object,
  filterUrlParsingMethod: object) {
  mapObjectFromURL(urlParameters, filter, 'f', filterDefault, filterUrlParsingMethod)
}
