export interface IRepository {
  name: string
  owner: { login: string }
  stargazerCount: number
  updatedAt: string
  url: string
}

export type IListRepositories = IRepository[]
