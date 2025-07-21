export function formatDate(data: Date) {
  const date = new Date(data)
  return new Intl.DateTimeFormat('pt-BR').format(date)
}
