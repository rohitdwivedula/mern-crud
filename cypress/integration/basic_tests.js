/// Basic tests

// a passing and a failing test
describe('Boolean tests', function() {
  it('Pass please!', function() {
    expect(true).to.equal(true)
  });
  it('Fail please!', function() {
    expect(true).to.equal(false)
  });
});

// check if IS F341 course website contains login link
describe('Test IS F341 Demo Website', function() {
  it('Home page contains login link', function() {
    cy.visit('https://bphc-is-f341.herokuapp.com/');
    cy.contains('Click here')
      .invoke('attr', 'href')
      .then(href => {
        expect(href).to.equal("/auth/google");
      });
  });
});