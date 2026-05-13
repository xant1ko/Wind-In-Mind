export type Task = {
  title?: string,
  description?: string,
  dateCompleted?: string,
  priority?: 'firstPlan' | 'secondplan' | 'longDistance'
  isDone?: boolean
  uid?: string
}

export type Note = {
  createdDate?: Date
  uid?: string
  title: string
  description: string
  uid_group?: string
}

export type NoteGroup = {
  title: string
  color: string
  notes?: Note[]
  uid?: string
}