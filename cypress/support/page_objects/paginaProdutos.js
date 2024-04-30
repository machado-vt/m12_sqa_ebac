class paginaProdutos {

    visitarUrl(site){
        cy.visit('produtos')

    }

    selecionarProduto(nomeProduto){
        cy.get('#content')
        .contains(nomeProduto)
        .click()
    }

    visitarProduto(linkProduto){
        //cy.get('.product-block')
        cy.get('.products > .row')
        .contains(linkProduto)
        .click()
    }
    adicionarProdutoCarrinho(tamanho, cor){
        cy.get(tamanho)
        .click()
        cy.get(cor)
        .click()
        cy.get('.single_add_to_cart_button')
        .click()
    }
    preencherCadastro(nome, sobrenome, nomeEmpresa, endereço, cidade, cep, telefone){
        cy.get('#billing_first_name').click().type(nome)
        cy.get('#billing_last_name').click().type(sobrenome)
        cy.get('#billing_company').click().type(nomeEmpresa)
        cy.get('#billing_address_1').click().type(endereço)
        cy.get('#billing_city').click().type(cidade)
        cy.get('#billing_postcode').click().type(cep)
        cy.get('#billing_phone').click().type(telefone)

    }
}

export default new paginaProdutos()