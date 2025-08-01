import type { Task } from '../../store/authStore'

interface TaskId {
  id: string
}

export interface ICreateTaskResponse {
  task: Task
  accessToken?: string
}

export interface IUpdateTaskResponse {
  task: TaskId
  accessToken?: string
}

export interface IDeleteTaskResponse {
  accessToken?: string
}
