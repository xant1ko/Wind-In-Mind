import { emitter } from '@/main'

export function showVariableAlert (error: any): void {
  if (error.status === 403) {
    emitter.emit('show-message', {
      type: 'error',
      title: 'Вы не вошли в систему!',
    })
    return
  }
  if (error.response.data.detail[0].loc[0] === 'body') {
    emitter.emit('show-message', {
      type: 'error',
      title: 'Проверьте правильность заполнения полей!',
      message: translateEntitiesMap.get(error.response.data.detail[0].loc[1]),
    })
    return
  }
  if (error.status === 500) {
    handleErrorEternalServerError(error)
  }
}

const translateEntitiesMap = new Map([
  ['speciality_uids', 'Специальности'],
  ['situation_uid', 'Ситуация'],
  ['organization_uid', 'Организация'],
  ['station_uid', 'Станция'],

])

export function handleErrorEternalServerError (error: any): void {
  emitter.emit('show-message', {
    type: 'error',
    title: `Произошла неизвестная ошибка(${error.status})`,
    message: 'Обратитесь к администратору',
  })
}
