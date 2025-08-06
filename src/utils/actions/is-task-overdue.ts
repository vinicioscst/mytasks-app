export function isTaskOverdue(date: Date, completed: boolean) {
  if (completed) return false

  const today = new Date().setHours(0, 0, 0, 0)
  const dueDate = new Date(date).setHours(0, 0, 0, 0)

  return dueDate < today
}
