import { create } from 'zustand'
import type { TCreateTaskSchema } from '../utils/schemas/tasks/create-task'
import type { TUpdateTaskSchema } from '../utils/schemas/tasks/update-task'
import type { Task } from './authStore'
import { api } from '../config/api'
import { addToast } from '@heroui/toast'
import { AxiosError, type AxiosResponse } from 'axios'

export interface ITasksStore {
  isLoading: boolean
  tasks: Task[]
  completedTasks: () => Task[]
  toDoTasks: () => Task[]
  loadTasks: (userTasks: Task[]) => void
  createTask: (body: TCreateTaskSchema) => Promise<void>
  updateTask: (body: TUpdateTaskSchema, id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const tasksStore = create<ITasksStore>()((set, get) => ({
  isLoading: false,
  tasks: [],
  completedTasks: () => {
    return get().tasks.filter((task) => task.isCompleted) || []
  },
  toDoTasks: () => {
    return get().tasks.filter((task) => !task.isCompleted) || []
  },
  loadTasks: (userTasks) => {
    set(() => ({ tasks: userTasks }))
  },
  createTask: async (body) => {
    try {
      set(() => ({ isLoading: true }))

      const { data } = (await api.post('/tasks', body)) as AxiosResponse<Task>

      set((state) => ({ tasks: [...state.tasks, data] }))

      addToast({
        title: 'Tarefa criada com sucesso!',
        color: 'success',
        variant: 'flat'
      })
    } catch (error) {
      console.log(error)
      addToast({
        title: 'Ocorreu um erro!',
        description:
          error instanceof AxiosError
            ? error.response?.data.error
            : (error as Error).message,
        color: 'danger',
        variant: 'flat'
      })
    } finally {
      set(() => ({ isLoading: false }))
    }
  },
  updateTask: async (body, id) => {
    const allTasksBackup = [...get().tasks]

    try {
      set(() => ({ isLoading: true }))

      const allTasks = get().tasks
      const updatedTaskIndex = allTasks.findIndex((task) => task.id === id)
      allTasks[updatedTaskIndex] = { ...allTasks[updatedTaskIndex], ...body }

      set(() => ({ tasks: allTasks }))

      await api.patch(`/tasks/${id}`, body)

      addToast({
        title: 'Tarefa atualizada com sucesso!',
        color: 'success',
        variant: 'flat'
      })
    } catch (error) {
      console.log(error)
      set(() => ({ tasks: allTasksBackup }))
      addToast({
        title: 'Ocorreu um erro!',
        description:
          error instanceof AxiosError
            ? error.response?.data.error
            : (error as Error).message,
        color: 'danger',
        variant: 'flat'
      })
    } finally {
      set(() => ({ isLoading: false }))
    }
  },
  deleteTask: async (id) => {
    try {
      set(() => ({ isLoading: true }))
      await api.delete(`/tasks/${id}`)

      const allTasks = get().tasks
      const remainingTasks = allTasks.filter((task) => task.id !== id)

      set(() => ({
        tasks: remainingTasks
      }))

      addToast({
        title: 'Tarefa deletada com sucesso!',
        color: 'success',
        variant: 'flat'
      })
    } catch (error) {
      console.log(error)
      addToast({
        title: 'Ocorreu um erro!',
        description:
          error instanceof AxiosError
            ? error.response?.data.error
            : (error as Error).message,
        color: 'danger',
        variant: 'flat'
      })
    } finally {
      set(() => ({ isLoading: false }))
    }
  }
}))
