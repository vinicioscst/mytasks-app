export function formatDate(data: Date) {
  const date = new Date(data)
  return date.toLocaleDateString('pt-BR')
}
