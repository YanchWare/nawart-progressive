import Security from 'src/utilities/security'

describe('Security', () => {
  it('should create object correctly', () => {
    let security = new Security()
    expect(security).not.to.equal(null)
  })
})
