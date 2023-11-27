import 'cypress-file-upload';

describe('ik-upload component', () => {
  const APP_HOST =  Cypress.env().APP_HOST;

  describe('Image Upload', () => {
      it('should upload image and render same image', () => { 
          // launch URL
          cy.visit(APP_HOST,{
            onBeforeLoad(win) {
              cy.stub(win.console, 'log').as('consoleLog')
            },
          });

          //static file
          const p = 'sample.jpeg'

          // Upload file with cy.uploadFile
          cy.get('.file-upload-ik input[type="file"]').attachFile(p)
          cy.wait(1000);
          cy.get('@consoleLog').should('be.calledWith', 'Upload started')
          // wait for 3 secs
          cy.wait(3000);
          cy.get('@consoleLog').should('be.calledWith', 'Upload inprogress ... (100.00% Done)')

          //Verify uploaded file
          cy.get('.uploaded-img-ik').invoke('attr', 'src').should('contain','https://ik.imagekit.io/');
      });
  });
});
