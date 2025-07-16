import { create } from 'zustand'
import type { TCreateUserSchema } from '../utils/schemas/user/create-user'
import type { TLoginSchema } from '../utils/schemas/user/login'
import axios, { AxiosError } from 'axios'
import { addToast } from '@heroui/toast'
import { persist } from 'zustand/middleware'

interface User {
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
  isLoggedIn: boolean
  isLoading: boolean
  userData: User | null
  register: (body: TCreateUserSchema) => Promise<void>
  login: (body: TLoginSchema) => Promise<string>
  logout: () => Promise<void>
  loadUser: () => Promise<void>
}

export const authStore = create<IAuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isLoading: false,
      userData: null,
      register: async (body) => {
        try {
          set(() => ({ isLoading: true }))
          const baseUrl = import.meta.env.VITE_API_BASE_URL
          if (!baseUrl) throw new Error('API não fornecida')

          await axios.post(`${baseUrl}/api/users`, body)

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
          const baseUrl = import.meta.env.VITE_API_BASE_URL
          if (!baseUrl) throw new Error('API não fornecida')

          const { data } = await axios.post(`${baseUrl}/api/auth`, body, {
            withCredentials: true
          })
          set(() => ({ userData: data, isLoggedIn: true }))

          return data.token
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
          const baseUrl = import.meta.env.VITE_API_BASE_URL
          if (!baseUrl) throw new Error('API não fornecida')

          await axios.post(
            `${baseUrl}/api/users/logout`,
            {},
            {
              withCredentials: true
            }
          )
          set(() => ({ userData: null, isLoggedIn: true }))
        } catch (error) {
          console.log(error)
        }
      },
      loadUser: async () => {
        try {
          set(() => ({ isLoading: true }))

          const baseUrl = import.meta.env.VITE_API_BASE_URL
          if (!baseUrl) throw new Error('API não fornecida')

          const { data } = await axios.get(`${baseUrl}/api/users/profile`, {
            withCredentials: true
          })
          set(() => ({ userData: data, isLoggedIn: true }))
        } catch (error) {
          console.log(error)
        } finally {
          set(() => ({ isLoading: false }))
        }
      }
    }),
    {
      name: 'is-logged',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn })
    }
  )
)
