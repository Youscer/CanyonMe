import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('OrderLine e2e test', () => {
  const orderLinePageUrl = '/order-line';
  const orderLinePageUrlPattern = new RegExp('/order-line(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/order-lines+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/order-lines').as('postEntityRequest');
    cy.intercept('DELETE', '/api/order-lines/*').as('deleteEntityRequest');
  });

  it('should load OrderLines', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-line');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OrderLine').should('exist');
    cy.url().should('match', orderLinePageUrlPattern);
  });

  it('should load details OrderLine page', function () {
    cy.visit(orderLinePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('orderLine');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderLinePageUrlPattern);
  });

  it('should load create OrderLine page', () => {
    cy.visit(orderLinePageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('OrderLine');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderLinePageUrlPattern);
  });

  it('should load edit OrderLine page', function () {
    cy.visit(orderLinePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('OrderLine');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderLinePageUrlPattern);
  });

  it('should create an instance of OrderLine', () => {
    cy.visit(orderLinePageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('OrderLine');

    cy.get(`[data-cy="productId"]`).type('12218').should('have.value', '12218');

    cy.get(`[data-cy="productName"]`).type('Assistant').should('have.value', 'Assistant');

    cy.get(`[data-cy="quantity"]`).type('25858').should('have.value', '25858');

    cy.get(`[data-cy="unitPrice"]`).type('64642').should('have.value', '64642');

    cy.get(`[data-cy="discount"]`).type('78431').should('have.value', '78431');

    cy.setFieldSelectToLastOfEntity('orderId');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderLinePageUrlPattern);
  });

  it('should delete last instance of OrderLine', function () {
    cy.visit(orderLinePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('orderLine').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', orderLinePageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
