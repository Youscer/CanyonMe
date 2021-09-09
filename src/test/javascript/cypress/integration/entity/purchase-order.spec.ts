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

describe('PurchaseOrder e2e test', () => {
  const purchaseOrderPageUrl = '/purchase-order';
  const purchaseOrderPageUrlPattern = new RegExp('/purchase-order(\\?.*)?$');
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
    cy.intercept('GET', '/api/purchase-orders+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/purchase-orders').as('postEntityRequest');
    cy.intercept('DELETE', '/api/purchase-orders/*').as('deleteEntityRequest');
  });

  it('should load PurchaseOrders', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('purchase-order');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PurchaseOrder').should('exist');
    cy.url().should('match', purchaseOrderPageUrlPattern);
  });

  it('should load details PurchaseOrder page', function () {
    cy.visit(purchaseOrderPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('purchaseOrder');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', purchaseOrderPageUrlPattern);
  });

  it('should load create PurchaseOrder page', () => {
    cy.visit(purchaseOrderPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('PurchaseOrder');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', purchaseOrderPageUrlPattern);
  });

  it('should load edit PurchaseOrder page', function () {
    cy.visit(purchaseOrderPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('PurchaseOrder');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', purchaseOrderPageUrlPattern);
  });

  it('should create an instance of PurchaseOrder', () => {
    cy.visit(purchaseOrderPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('PurchaseOrder');

    cy.get(`[data-cy="orderDate"]`).type('2021-09-09').should('have.value', '2021-09-09');

    cy.get(`[data-cy="orderStateId"]`).select('VALIDATED');

    cy.get(`[data-cy="shippingMode"]`).type('Peso recontextualize').should('have.value', 'Peso recontextualize');

    cy.get(`[data-cy="shippingFees"]`).type('46675').should('have.value', '46675');

    cy.get(`[data-cy="paymentMode"]`).type('panel transmit').should('have.value', 'panel transmit');

    cy.get(`[data-cy="paymentFees"]`).type('41562').should('have.value', '41562');

    cy.setFieldSelectToLastOfEntity('clientId');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', purchaseOrderPageUrlPattern);
  });

  it('should delete last instance of PurchaseOrder', function () {
    cy.visit(purchaseOrderPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('purchaseOrder').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', purchaseOrderPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
