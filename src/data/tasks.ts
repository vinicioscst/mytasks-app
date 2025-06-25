export type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  isCompleted: boolean
}

export const tasks: Task[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    title: 'Comprar mantimentos',
    description: 'Ir ao supermercado e comprar frutas, legumes, pão e leite.',
    dueDate: '2025-06-26',
    isCompleted: false
  },
  {
    id: 'f9e8d7c6-b5a4-3210-fedc-ba9876543210',
    title: 'Pagar contas',
    description: 'Pagar a conta de luz, água e internet antes do vencimento.',
    dueDate: '2025-06-28',
    isCompleted: false
  },
  {
    id: '1a2b3c4d-5e6f-7890-abcd-ef0123456789',
    title: 'Agendar reunião',
    description:
      'Entrar em contato com a equipe para agendar a reunião semanal.',
    dueDate: '2025-06-27',
    isCompleted: true
  },
  {
    id: '0fedcb-a987-6543-210f-edcba9876543',
    title: 'Fazer exercício',
    description: 'Caminhar por 30 minutos ou ir à academia.',
    dueDate: '2025-06-26',
    isCompleted: false
  },
  {
    id: '98765432-10fe-dcba-9876-543210fedcba',
    title: 'Ler livro',
    description: "Ler o capítulo 5 do livro 'A Arte da Guerra'.",
    dueDate: '2025-07-01',
    isCompleted: false
  }
]
