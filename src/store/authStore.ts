import { create } from 'zustand'
import type { TCreateUserSchema } from '../utils/schemas/user/create-user'
import type { TLoginSchema } from '../utils/schemas/user/login'
import { AxiosError, type AxiosResponse } from 'axios'
import { addToast } from '@heroui/toast'
import { api } from '../config/api'
import { tasksStore } from './tasksStore'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  tasks: Task[]
}

export interface Task {
  id: string
  title: string
  description: string | null
  dueDate: Date
  isCompleted: boolean
}

export interface IAuthStore {
  isLoading: boolean
  userData: User | null
  register: (body: TCreateUserSchema) => Promise<void>
  login: (body: TLoginSchema) => Promise<void>
  logout: () => Promise<void>
  loadUser: () => Promise<void>
}

export const authStore = create<IAuthStore>()((set) => ({
  isLoading: false,
  userData: null,
  register: async (body) => {
    try {
      set(() => ({ isLoading: true }))

      await api.post('/users', body)

      addToast({
        title: 'Usuário criado com sucesso!',
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
  login: async (body) => {
    try {
      set(() => ({ isLoading: true }))

      const { data } = (await api.post('/auth', body)) as AxiosResponse<User>
      set(() => ({ userData: data }))

      const { loadTasks } = tasksStore.getState()
      loadTasks(data.tasks)
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
  logout: async () => {
    try {
      await api.post('/users/logout')

      set(() => ({ userData: null }))
    } catch (error) {
      console.log(error)
    }
  },
  loadUser: async () => {
    try {
      set(() => ({ isLoading: true }))

      const { data } = (await api.get('/users/profile')) as AxiosResponse<User>

      const { loadTasks } = tasksStore.getState()
      loadTasks(data.tasks)

      set(() => ({ userData: data }))
    } catch (error) {
      console.log(error)
    } finally {
      set(() => ({ isLoading: false }))
    }
  }
}))
