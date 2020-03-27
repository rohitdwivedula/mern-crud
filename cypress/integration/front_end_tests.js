describe('App Home Page', function() {
  it('successfully loads', function() {
    cy.visit('/') // change URL to match your dev URL
  });
  it('Home page contains login link', function() {
    cy.contains('Click here')
      .invoke('attr', 'href')
      .then(href => {
        expect(href).to.equal("/auth/google");
      });
  });
});

describe('Add movie webpage', function() {
	beforeEach(function(){
  	cy.server();
		cy.route({
			method: "GET",
			url: "/api/movies",
			response: "fixture:movies_list.json"
		});
  });
  
  it('successfully loads', function() {
    cy.visit('/movies/add'); // change URL to match your dev URL
  });

  it('fill and submit form', function() {
  	cy.visit('/movies/add');
  	cy.get('input[name="title"]').type('BITS Hyderabad: The Movie')
	  cy.get('input[name="year"]').type('2020')
  	cy.get('input[name="cast"]').type('Director, Dean SWD, Dean GAD, Professors')
  	cy.get('textarea[name="desc"]').type('A history of BPHC over the years visualised')
  	cy.screenshot();
  	var infoboxDisplayed = false;
  	cy.on('window:alert', (str) => {
	  expect(str).to.equal("Movie added successfully!");
	  infoboxDisplayed = true;
		});
		cy.server();
		cy.route({
			method: "POST",
			url: "/api/movie/add",
			response: {status:true, newMovie: true}
		});
		cy.get('input[type="submit"]').click();
		cy.should(() => {
    	expect(infoboxDisplayed).to.be.true
		});
  });

  it('error on entering movie before 1888', function() {
  	cy.visit('/movies/add');
  	cy.get('input[name="title"]').type('Fake Movie')
	  cy.get('input[name="year"]').type('1887')
  	cy.get('input[name="cast"]').type('Fake1, Fake2, Fake3')
  	cy.get('textarea[name="desc"]').type('Fake news being used to modify history')
  	cy.screenshot();
  	var infoboxDisplayed = false;
  	cy.on('window:alert', (str) => {
		  expect(str).to.equal("Year must be a number greater than 1888. The first movie in the world was released in 1888");
		  infoboxDisplayed = true;
		});
		cy.get('input[type="submit"]').click();
		cy.should(() => {
	    expect(infoboxDisplayed).to.be.true
	  });
  });

  it('error on entering movie after 2020', function() {
  	cy.visit('/movies/add');
  	cy.get('input[name="title"]').type('Future Movie');
	  cy.get('input[name="year"]').type('2021');
  	cy.get('input[name="cast"]').type('Aliens, Future Tech');
  	cy.get('textarea[name="desc"]').type("Predicting the future using mathematics was Hari Seldon's idea, not yours");
  	cy.screenshot();
  	var infoboxDisplayed = false;
  	cy.on('window:alert', (str) => {
		  expect(str).to.equal("You are allowed to enter only already released movies.");
		  infoboxDisplayed = true;
		});
		cy.get('input[type="submit"]').click();
		cy.should(() => {
	    expect(infoboxDisplayed).to.be.true
	  });
  });
});

describe('All movies page', function() {
  beforeEach(function(){
  	cy.server();
		cy.route({
			method: "GET",
			url: "/api/movies",
			response: "fixture:movies_list.json"
		});
  });
  it('successfully loads', function() {
    cy.visit('/movies'); // change URL to match your dev URL
  });

  it('movie titles are visible', function() {
  	cy.contains('American Born Confused Desi').should('be.visible');
  	cy.contains('The Silent Movie').should('be.visible');
  	cy.contains('Matrix').should('be.visible');
  });

  it('add movie button visible', function() {  	
    cy.contains('Add a Movie').should('be.visible');
    cy.get('a[id="addm"]').should('have.attr', 'href', '/movies/add');
  });

  it('delete buttons visible', function(){
  	// we should have three delete buttons, one for each movie
  	cy.get('button:contains(Delete)').should('have.length', 3).should('be.visible');
  });
});