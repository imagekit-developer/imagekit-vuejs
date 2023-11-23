import 'cypress-file-upload';

describe('ik-upload component', () => {
  const APP_HOST =  Cypress.env().APP_HOST;

  describe('Image Upload', () => {
      it('should upload image and render same image', () => { 
          // launch URL
          cy.visit(APP_HOST, { timeout: 30000 });

          //static file
          const p = 'sample.jpeg'

          // Upload file with cy.uploadFile
          cy.get('.file-upload-ik input[type="file"]').attachFile(p)

          // wait for 2 secs
          cy.wait(4000);

          //Verify uploaded file
          cy.get('.uploaded-img-ik').invoke('attr', 'src').should('contain','https://ik.imagekit.io/');
      });
  });
});
