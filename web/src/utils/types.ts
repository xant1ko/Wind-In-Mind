export type Task = {

  title: string,
  description: string,
  dateCompleted: string,
  priority: 'firstPlan' | 'secondplan' | 'longDistance'
}