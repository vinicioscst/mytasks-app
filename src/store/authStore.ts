import { create } from 'zustand'
import type { TCreateUserSchema } from '../utils/schemas/user/create-user'
import type { TLoginSchema } from '../utils/schemas/user/login'
import { AxiosError, type AxiosResponse } from 'axios'
import { addToast } from '@heroui/toast'
import { api } from '../config/api'
import { tasksStore } from './tasksStore'
import { userStore } from './userStore'
import type { IAuthUserResponse } from '../types/responses/auth-responses'

export interface Task {
  id: string
  title: string
  description: string | null
  dueDate: Date
  isCompleted: boolean
}

export interface IAuthStore {
  isLoading: boolean
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  register: (body: TCreateUserSchema) => Promise<void>
  login: (body: TLoginSchema) => Promise<void>
  logout: () => Promise<void>
}

export const authStore = create<IAuthStore>()((set) => ({
  isLoading: false,
  accessToken: null,
  setAccessToken: (accessToken) => {
    set(() => ({ accessToken }))
  },
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

      const { data } = (await api.post(
        '/auth',
        body
      )) as AxiosResponse<IAuthUserResponse>

      const { loadUser } = userStore.getState()
      const { loadTasks } = tasksStore.getState()
      loadUser(data.user)
      loadTasks(data.user.tasks)
      set(() => ({ accessToken: data.accessToken }))
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

      const { loadUser } = userStore.getState()
      loadUser(null)
      set(() => ({ accessToken: null }))
    } catch (error) {
      console.log(error)
    }
  }
}))
