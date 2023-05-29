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
})
