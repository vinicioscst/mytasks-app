export function getDaysUntilDeadline(date: Date) {
  const today = new Date()
  const dueDate = new Date(date)

  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  switch (diffDays) {
    case 0:
      return 'Hoje'
    case 1:
      return 'Amanhã'
    default:
      return `Em ${diffDays} dias`
  }
}
