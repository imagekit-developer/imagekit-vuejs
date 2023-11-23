describe('IKVideo Element', () => {
  const APP_HOST = Cypress.env().APP_HOST;

  describe('Video transformation', () => {
    it('should have element with transformation', () => {
      cy.intercept('GET', '**/*', (req) => {
        // Set the custom header
        req.headers['ngrok-skip-browser-warning'] = 'true';
      });
      cy.visit(APP_HOST, { timeout: 30000 });

      cy.get('.ikvideo-default').scrollIntoView();

      cy.wait(1000);

      cy.get('.ikvideo-default')
        .should('have.attr', 'src')
        .and('include', 'sample-video.mp4?tr=h-200,w-200');
    });
  });

  describe('Advance transformation', () => {
    it('should have element with advance transformation', () => {
      cy.intercept('GET', '**/*', (req) => {
        // Set the custom header
        req.headers['ngrok-skip-browser-warning'] = 'true';
      });
      cy.visit(APP_HOST, { timeout: 30000 });

      cy.get('.ikvideo-with-tr').scrollIntoView();

      cy.wait(500);

      cy.get('.ikvideo-with-tr')
        .should('have.attr', 'src')
        .and('include', 'sample-video.mp4?tr=h-200,w-600,b-5_red,q-95');
    });
  });
});
