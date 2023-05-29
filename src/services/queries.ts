import { gql } from '@apollo/client'

export const GET_PAGE_INFO = gql`
  query ($first: Int!, $queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int!, $startCursor: String, $queryString: String!) {
    search(
      query: $queryString
      type: REPOSITORY
      first: $first
      after: $startCursor
    ) {
      nodes {
        ... on Repository {
          name
          stargazerCount
          owner {
            login
          }
          url
          updatedAt
        }
      }
      repositoryCount
    }
  }
`

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      description
      stargazerCount
      updatedAt
      owner {
        avatarUrl
        login
        url
      }
      languages(first: 20) {
        nodes {
          name
        }
      }
    }
  }
`