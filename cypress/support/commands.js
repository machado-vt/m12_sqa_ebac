Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('registrar', (email, senha) => {
    cy.get('.icon-user-unfollow').click()
    cy.get('#reg_email').click().type(email)
    cy.get('#reg_password').click().type(senha)
    cy.get(':nth-child(4) > .button').click()
    

});

