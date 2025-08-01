import { create } from 'zustand'
import type { TCreateTaskSchema } from '../utils/schemas/tasks/create-task'
import type { TUpdateTaskSchema } from '../utils/schemas/tasks/update-task'
import { authStore, type Task } from './authStore'
import { api } from '../config/api'
import { addToast } from '@heroui/toast'
import { AxiosError, type AxiosResponse } from 'axios'
import type {
  ICreateTaskResponse,
  IDeleteTaskResponse,
  IUpdateTaskResponse
} from '../types/responses/task-responses'

export interface ITasksStore {
  isLoading: boolean
  tasks: Task[]
  completedTasks: () => Task[]
  toDoTasks: () => Task[]
  loadTasks: (userTasks: Task[]) => void
  createTask: (body: TCreateTaskSchema) => Promise<void>
  updateTask: (body: TUpdateTaskSchema, id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  deleteCompletedTasks: () => Promise<void>
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
      const { accessToken } = authStore.getState()

      const { data } = (await api.post('/tasks', body, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })) as AxiosResponse<ICreateTaskResponse>

      set((state) => ({ tasks: [...state.tasks, data.task] }))

      if (data.accessToken) {
        const { setAccessToken } = authStore.getState()
        setAccessToken(data.accessToken)
      }

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
      const { accessToken } = authStore.getState()

      const { data } = (await api.patch(`/tasks/${id}`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })) as AxiosResponse<IUpdateTaskResponse>

      const allTasks = get().tasks
      const updatedTaskIndex = allTasks.findIndex((task) => task.id === id)
      allTasks[updatedTaskIndex] = { ...allTasks[updatedTaskIndex], ...body }

      set(() => ({ tasks: allTasks }))

      if (data.accessToken) {
        const { setAccessToken } = authStore.getState()
        setAccessToken(data.accessToken)
      }

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
      const { accessToken } = authStore.getState()

      const { data } = (await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })) as AxiosResponse<IDeleteTaskResponse>

      if (data.accessToken) {
        const { setAccessToken } = authStore.getState()
        setAccessToken(data.accessToken)
      }

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
  },
  deleteCompletedTasks: async () => {
    try {
      set(() => ({ isLoading: true }))
      const { accessToken } = authStore.getState()

      const allTasks = get().tasks

      if (allTasks.length === 0) {
        throw new Error('Não há tarefas')
      }
      if (allTasks.every((task) => task.isCompleted === false)) {
        throw new Error('Não há tarefas completas')
      }

      const { data } = (await api.delete('/tasks/completed', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })) as AxiosResponse<IDeleteTaskResponse>

      if (data.accessToken) {
        const { setAccessToken } = authStore.getState()
        setAccessToken(data.accessToken)
      }

      const remainingTasks = allTasks.filter((task) => !task.isCompleted)

      set(() => ({
        tasks: remainingTasks
      }))

      addToast({
        title: 'Tarefa(s) deletada(s) com sucesso!',
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
