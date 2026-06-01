export function camelToKebab (s: string): string {
  return String(s).replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
}

export function isValueFilled (value: any): boolean {
  return value !== null && value !== undefined && value !== ''
}

export function addPropertyIfExists (obj: Record<string, string>, property: any, propertyName: string) {
  if (isValueFilled(property)) {
    obj[propertyName] = property
  }
}

export function getDate (dateToPars: string | undefined) {
  if (dateToPars) {
    return new Date(dateToPars).toLocaleString()
  }
}

export function getCountOfSelectedFilters (filter: any, defaultFilter: typeof filter) {
  let count = 0
  for (const key of Object.keys(filter)) {
    if (filter[key] !== defaultFilter[key] || filter['search_str'] < -1) {
      count++
    }
  }
  return count
}

export const labelTypes = [
  {
    title: 'Задача',
    value: 'task',
  },
]

export const colors = [
  { title: 'Красный', color: '#FF4D4D' },
  { title: 'Синий', color: '#4D79FF' },
  { title: 'Зеленый', color: '#4DFF88' },
  { title: 'Желтый', color: '#FFE54D' },
  { title: 'Фиолетовый', color: '#B84DFF' },
  { title: 'Оранжевый', color: '#FFA64D' },
  { title: 'Розовый', color: '#FF6B9E' },
  { title: 'Голубой', color: '#4DE1FF' },
  { title: 'Серый', color: '#A9A9A9' },
  { title: 'Бирюзовый', color: '#4DFFD9' },
]

export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
