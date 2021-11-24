import writeXlsxFile from 'write-excel-file'

// element selectors
import elementSelector from './scrape-username.es'

// fixture selectors
import { credential, endpoint, testData } from '../fixtures/feeding-data.json'

// Page Object
import { ScrapePage } from './scrape-username.po'

const scrapePage = new ScrapePage()
// Local data
let influencerIds = []
let usernames = []
let token
let spreadsheetName = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getHours()}-${new Date().getMinutes()}.xlsx`

describe('Extract the username of influencer', () => {
  it('login to the site', () => {
    // login
    cy.visit(endpoint.login)
      .get(elementSelector.username).type(credential.email, { log: false })
      .get(elementSelector.password).type(credential.password + '{enter}', { log: false })
      .verifyRedirect(endpoint.homescreenUrl)

    // Search
    cy.get(elementSelector.searchBtn).click()
      .get(elementSelector.searchNewBtn).contains('New search').click()

    // new search 
    cy.get(elementSelector.searchInput).type(testData.searchCategory)
      .waitForProcess()

    // select search item
    cy.get(elementSelector.searchItem).contains(testData.searchCategory).click()
      .get(elementSelector.selectedItem).contains(testData.searchCategory)

    // intercept API
    cy.intercept('GET', '**/api/v1/matches?*').as('getMatches')
    // click show influencer
    cy.get('button').contains('Show Influencers').click()

    cy.wait('@getMatches', { timeout: 60000 })
      .then((res) => {
        expect(res.response.statusCode).to.eq(200)
        token = res.request.headers.authorization
        res.response.body.influencers.forEach((data) => {
          influencerIds.push(data.id)
        })
        return influencerIds
      })
      .then((influencers) => {
        return influencerIds.forEach((id) => {
          cy.request({
            method: 'GET',
            url: `https://facade.upfluence.co/api/v1/influencers/${id}`,
            headers: {
              "authorization": token
            }
          })
            .then((res) => {
              return usernames.push([{ value: res.body.instagrams[0].username }])
            })
            .then((res) => {
              return cy.wait(500)
            })
        })
      })
      .then(async (res) => {
        await writeXlsxFile(usernames, {
          fileName: spreadsheetName
        })
      })
  })
})

