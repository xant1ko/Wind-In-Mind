import type { Label } from '@/utils/types'
import axios from 'axios'

// const API_PREFIX = '/api/v1'
const API_PREFIX = '/api'

export const NOTE_GET_LIST = API_PREFIX + '/note/get-list'
export const NOTE_CREATE = API_PREFIX + '/note/create'
export const NOTE_UPDATE = API_PREFIX + '/note/update'
export const NOTE_GET = API_PREFIX + '/note/get'

export const NOTE_GROUP_GET_LIST = API_PREFIX + '/note-group/get-list'
export const NOTE_GROUP_CREATE = API_PREFIX + '/note-group/create'
export const NOTE_GROUP_GET = API_PREFIX + '/note-group/get'
export const NOTE_GROUP_DELETE = API_PREFIX + '/note-group/delete'

export const TASK_GET_LIST = API_PREFIX + '/task/get-list'
export const TASK_GET_FILTERED_LIST = API_PREFIX + '/task/get-filtered-list'
export const TASK_CREATE = API_PREFIX + '/task/create'
export const TASK_UPDATE = API_PREFIX + '/task/update'
export const TASK_GET = API_PREFIX + '/task/get'

export const LABEL_GET_LIST = API_PREFIX + '/label/get-list'
export const LABEL_CREATE = API_PREFIX + '/label/create'
export const LABEL_GET = API_PREFIX + '/label/get'
export const LABEL_DELETE = API_PREFIX + '/label/delete'

export function createNoteGroup (value: any) {
  return axios.post(NOTE_GROUP_CREATE, value)
}

export function deleteNoteGroup (uid: string) {
  return axios.delete(`${NOTE_GROUP_DELETE}/${uid}`)
}

export function createLabel (body: Label) {
  return axios.post(`${LABEL_CREATE}`, body)
}
