/// <reference types="cypress" />
import paginaProdutos from "../support/page_objects/paginaProdutos";
import { faker } from '@faker-js/faker';
var email = ""
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('http://lojaebac.ebaconline.art.br/')
  });

  it('Deve registrar uma nova conta na Loja EBAC', () => {
      //Cria uma conta para os testes
      email = faker.internet.email()
      cy.registrar(email, 'teste123')
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')

      
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    //Compra 4 produtos
    paginaProdutos.visitarUrl()
    paginaProdutos.visitarProduto('Aether Gym Pant')
    paginaProdutos.adicionarProdutoCarrinho('.button-variable-item-33', '.button-variable-item-Brown')
    paginaProdutos.visitarUrl()
    paginaProdutos.visitarProduto('Atlas Fitness Tank')
    paginaProdutos.adicionarProdutoCarrinho('.button-variable-item-M', ':nth-child(2) > .value > .variable-items-wrapper > .variable-item')
    paginaProdutos.visitarUrl()
    paginaProdutos.visitarProduto('Apollo Running Short')
    paginaProdutos.adicionarProdutoCarrinho('.button-variable-item-33', ':nth-child(2) > .value > .variable-items-wrapper > .variable-item')
    paginaProdutos.visitarUrl()
    paginaProdutos.visitarProduto('Ariel Roll Sleeve Sweatshirt')
    paginaProdutos.adicionarProdutoCarrinho('.button-variable-item-M', '.button-variable-item-Green')
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    //Preenche os dados de cadastro para finalizar a compra:
    cy.get('#billing_first_name').type(faker.person.firstName())
    cy.get('#billing_last_name').type(faker.person.lastName())
    cy.get('#billing_company').type(faker.company.name())
    cy.get('#billing_address_1').type(faker.location.streetAddress())
    cy.get('#billing_address_2').type(faker.location.secondaryAddress())
    cy.get('#billing_city').type('Curitiba')
    cy.get('#billing_postcode').type('80240-210')
    cy.get('#billing_phone').type('119187598827')
    cy.get('#billing_email').type(email)
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

  });

})