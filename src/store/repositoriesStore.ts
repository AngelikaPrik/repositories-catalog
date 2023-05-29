import { makeAutoObservable } from 'mobx'
import { IListRepositories } from '@models/repositories-model'

const initialPage = Number(localStorage.getItem('currentPage')) || 1
const initialFilter = localStorage.getItem('filter') || ''

export class RepositoriesStore {
  allRepositories: IListRepositories = []
  repositoryCount = 0
  currentPage: number = initialPage
  filter: string = initialFilter

  constructor() {
    makeAutoObservable(this)
  }

  setAllRepositories(obj: IListRepositories) {
    this.allRepositories = obj
  }

  setRepositoryCount(count: number) {
    this.repositoryCount = count
  }

  get totalPages() {
    const allPages = this.repositoryCount / 10
    if (allPages > 10) return 10
    else return Math.round(allPages)
  }

  setCurrentPage(page: number) {
    this.currentPage = page
  }

  setFilter(value: string) {
    this.filter = value
  }
}
