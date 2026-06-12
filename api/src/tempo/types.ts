

export type Task = {
  title?: string,
  description?: string,
  dateCompleted?: string,
  priority?: 'firstPlan' | 'secondplan' | 'longDistance'
  isDone?: boolean
  uid?: string
  labels?: Label[]
  createdDate: Date | string
}

export type Note = {
  createdDate: Date
  uid: string
  title: string
  description: string
  uid_group: string
}

export type NoteGroup = {
  title: string
  uid: string
  color: string
  notes?: Note[]
}

export type Label = {
  uid: string
  title: string
  description: string
  color: string
  type: 'task'
}
