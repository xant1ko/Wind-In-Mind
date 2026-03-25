export function localDateTimeFromString (date_string: string) {
  return new Date(Date.parse(date_string)).toLocaleString()
}

export function localDateFromString (date_string: string) {
  return new Date(Date.parse(date_string)).toLocaleDateString()
}

export function dateToString (date: Date | string | null,
  separator?: string | null | undefined): string | null {
  if (date === null) {
    return null
  } else {
    const d = new Date(date)
    const year = String(d.getFullYear())
    let month = String(d.getMonth() + 1)
    if (month.length < 2) {
      month = '0' + month
    }
    let day = String(d.getDate())
    if (day.length < 2) {
      day = '0' + day
    }
    if (separator === null || separator === undefined) {
      separator = '-'
    }
    return `${year}${separator}${month}${separator}${day}`
  }
}

export function getDateFormatted (date: Date | string | null): string | null {
  if (date === null) {
    return null
  } else {
    const d = new Date(date)
    return dateToString(d)
  }
}

export function getDateTimeFormatted (date: Date | string | null): string | null {
  if (date === null) {
    return null
  } else {
    const d = new Date(date)
    let hours = String(d.getHours())
    if (hours.length < 2) {
      hours = '0' + hours
    }
    let minutes = String(d.getMinutes())
    if (minutes.length < 2) {
      minutes = '0' + minutes
    }
    return `${getDateFormatted(date)}, ${hours}:${minutes}`
  }
}

export function getDayDifference (date1: Date, date2: Date): number {
  const diffTime = date2.getTime() - date1.getTime()
  return Math.round(diffTime / (1000 * 3600 * 24))
}
