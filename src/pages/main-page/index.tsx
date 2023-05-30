import { useEffect, useCallback, useMemo, ChangeEvent } from 'react'
import { useLazyQuery } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import { SearchField, Loader, Pagination, CartList } from '@components'
import { ErrorPage } from '@pages'
import { GET_REPOSITORIES, GET_PAGE_INFO } from '@services/queries'
import { repositoriesStore } from '@store'
import debounce from 'lodash.debounce'

import style from './main.module.scss'

export const MainPage = observer(() => {
  const { filter, currentPage, totalPages, allRepositories } = repositoriesStore
  const itemsPerPage = 10

  const [getPageInfo, pageInfo] = useLazyQuery(GET_PAGE_INFO)
  const [getRepositories, { loading }] = useLazyQuery(GET_REPOSITORIES)

  useEffect(() => getData(currentPage, filter), [])

  const getData = (page: number, value?: string) => {
    const first = (page - 1) * itemsPerPage
    let queryString = 'stars:>=0 '

    if (value) queryString += value + ' in:name'

    getPageInfo({
      variables: { queryString, first },
    }).then(({ data }) => {
      const startCursor = data.search.pageInfo.endCursor
      getRepositories({
        variables: { queryString, first: itemsPerPage, startCursor },
      }).then(({ data }) => {
        const { nodes, repositoryCount } = data.search
        repositoriesStore.setAllRepositories(nodes)
        console.log(JSON.stringify(data))
        repositoriesStore.setRepositoryCount(repositoryCount)
      })
    })
  }

  const handlerChangePage = (page: number) => {
    repositoriesStore.setCurrentPage(page)
    localStorage.setItem('currentPage', page.toString())
  }

  const handlerFilter = (value: string) => {
    repositoriesStore.setFilter(value.trim())
    localStorage.setItem('filter', value.trim())
  }

  const onChangePage = (page: number) => {
    handlerChangePage(page)
    window.scrollTo({ top: 0 })
    getData(page, filter)
  }

  const sendRequest = useCallback((value: string) => {
    getData(1, value)
  }, [])

  const debouncedRequest = useMemo(() => {
    return debounce(sendRequest, 500)
  }, [sendRequest])

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handlerFilter(value)
    handlerChangePage(1)
    debouncedRequest(value)
  }

  const onClean = () => {
    debouncedRequest('')
    handlerFilter('')
  }

  if (pageInfo.error) return <ErrorPage />

  return (
    <div className={style.wrapper} data-testid='main-page-wrapper'>
      <SearchField
        value={filter}
        placeholder='Search...'
        type='text'
        onChange={onChangeInput}
        onClean={onClean}
      />
      <div className={style.container} data-testid='main-page-container'>
        {pageInfo.loading || loading ? (
          <Loader />
        ) : (
          <CartList data={allRepositories} filter={filter} />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </div>
  )
})
