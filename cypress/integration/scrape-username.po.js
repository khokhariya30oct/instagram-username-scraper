export class ScrapePage {
  findUserName(id) {
    return cy.request({
      method: 'GET',
      url: `https://facade.upfluence.co/api/v1/influencers/${id}`,
    })
      .then((res) => {
        // igUserName.push(res.response.body.instagrams[0].username)
        return res.response.body.instagrams[0].username
      })

  }
}
