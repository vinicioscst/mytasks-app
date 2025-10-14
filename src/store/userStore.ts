import { addToast } from '@heroui/toast'
import { AxiosError, type AxiosResponse } from 'axios'
import { create } from 'zustand'
import { api } from '../config/api'
import type { IAuthUserResponse } from '../types/responses/auth-responses'
import type { IUpdateUserResponse } from '../types/responses/user-responses'
import type { TUpdateUserSchema } from '../utils/schemas/user/update-user'
import { authStore, type Task } from './authStore'
import { tasksStore } from './tasksStore'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  tasks: Task[]
}

export interface IUserStore {
  isLoading: boolean
  user: User | null
  loadUser: (loggedUser: User | null) => void
  getUser: () => Promise<void>
  updateUser: (body: TUpdateUserSchema, id: string) => Promise<void>
}

export const userStore = create<IUserStore>()((set) => ({
  isLoading: false,
  user: null,
  loadUser: (loggedUser) => {
    set(() => ({ user: loggedUser }))
  },
  getUser: async () => {
    try {
      set(() => ({ isLoading: true }))

      const { accessToken, setAccessToken } = authStore.getState()

      const { data } = (await api.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })) as AxiosResponse<IAuthUserResponse>

      setAccessToken(data.accessToken)

      set(() => ({ user: data.user }))

      const { loadTasks } = tasksStore.getState()
      loadTasks(data.user.tasks)
    } catch (error) {
      console.log(error)
    } finally {
      set(() => ({ isLoading: false }))
    }
  },
  updateUser: async (body, id) => {
    try {
      set(() => ({ isLoading: true }))
      const { accessToken } = authStore.getState()

      const { data } = (await api.patch(`/users/${id}`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })) as AxiosResponse<IUpdateUserResponse>

      if (data.accessToken) {
        const { setAccessToken } = authStore.getState()
        setAccessToken(data.accessToken)
      }

      set((state) => ({ user: { ...state.user, ...data.user } as User }))

      addToast({
        title: 'Usuário atualizado com sucesso!',
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
