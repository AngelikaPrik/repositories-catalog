/// <reference types="cypress"/>

describe('MainPage Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the MainPage component', () => {
    cy.get('[data-testid="main-page-wrapper"]').should('exist')
    cy.get('[data-testid="main-page-container"]').should('exist')
  })

  it('cleans the search field', () => {
    cy.get('[data-testid="search-field-input"]').type('example')
    cy.get('[data-testid="search-field-input"]').should('have.value', 'example')
    cy.get('[data-testid="search-field-clean-button"]').click()
    cy.get('[data-testid="search-field-input"]').should('have.value', '')
  })

  it('should display matching repositories', () => {
    const searchInput = cy.get('[data-testid="search-field-input"]')
    searchInput.type('code-clean')

    cy.intercept('GET', 'https://api.github.com/graphql')
      .as('getRepositories')
      .fixture('../fixtures/searchRepositoriesData.json')

    cy.wait(1000)

    cy.get('[data-testid="cart-list"]').within(() => {
      cy.get('[data-testid="cart-item"]').each(cart => {
        cy.get(cart)
          .contains(
            '[data-testid="cart-item-title"]',
            /code.*clean|clean.*code/i
          )
          .should('exist')
      })
    })

    cy.contains(
      '[data-testid="cart-item-title"]',
      /code.*clean|clean.*code/i
    ).should('exist')
  })
})
