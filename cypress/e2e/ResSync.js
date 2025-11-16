import { faker } from '@faker-js/faker';

// //For debugging purpose.
// let generateLink = 'https://rc.synq7.com/res-sync/passkey?link=e73eaba84cb8';
// let otp = 8018;
// let Eventname = '58413726';
// let reservationNumbers = ["25030168","25030169"];

//Global Variables
let generateLink = '';
let otp;
let Eventname = '';
let reservationNumbers = [];



describe('Res Sync Flow Automation', () => {
  it('should create a reservation, generate a link, set the event name, update the due date, apply discounts, generate the final link, copy it, extract OTP and store OTP', () => {

    let iteration = 2;  //Give index number from the example.json.data

    cy.visit('https://rc.synq7.com/');

    // Login process
    cy.get('.input-container > .ng-pristine', { timeout: 40000 })
    .type('qaautomation@test.com');
    cy.get('.custom-btn', { timeout: 40000 }).click();

    cy.get('#Password', { timeout: 40000 })
    .type('Qa123456@');
    cy.get('.custom-btn', { timeout: 40000 }).click({ force: true });
    cy.url({ timeout: 40000 }).should('include', 'dispatch/dashboard');

    cy.wait(3000);
    // Navigate to ride booking page
    cy.wait(3000);
    cy.get('span.btn-text', { timeout: 10000 }).click({ force: true });

    //Filling Up Passenger Info
    cy.get(':nth-child(1) > .booking-info-cards > .front-side > .form-group > .booking-search__left > .input-group > .form-control', { timeout: 40000 }).should('be.enabled')
      .click()
      .type('Bayes RideCentric');

    cy.get(':nth-child(1) > .booking-info-cards > .front-side > .form-group > .booking-search__left > .input-group > #basic-addon2', { timeout: 40000 })
      .should('be.visible')
      .click();

    // Click the final button
    cy.get(':nth-child(1) > :nth-child(7) > .btn-success-main', { timeout: 40000 })
      .click();

    //Filling reservation details 
    cy.get('.ngb-dp-today > .btn-light', { timeout: 40000 }).click()
    cy.get(':nth-child(5) > .time-link', { timeout: 40000 }).click()
    cy.get(':nth-child(11) > .time-link', { timeout: 40000 }).click()
    cy.get(':nth-child(2) > .time-zoon-link', { timeout: 40000 }).click()
    cy.get('.set-time-btn', { timeout: 40000 }).click()
    cy.get('.ng-dropdown-panel-items', { timeout: 40000 }).contains('3').click();
    cy.get('.ng-dropdown-panel-items', { timeout: 40000 }).contains('2').click();

    cy.fixture('example.json').then((data) => {
      // Get the current set of data based on iteration
      const entry = data[iteration % data.length];

      cy.get('#ReservationAddress0').type(entry.pickup_location);
      cy.wait(2000);
      cy.get('#ReservationAddress0').type('{downarrow}').type('{enter}');
      cy.wait(2000);

      cy.get('#ReservationAddress1').type(entry.dropoff_location);
      cy.wait(2000);
      cy.get('#ReservationAddress1').type('{downarrow}').type('{enter}');
      cy.wait(3000);

      //Click on Show Vehicle Button
      cy.get('.btn', { timeout: 40000 })
        .should('be.enabled')
        .click({ force: true });

      //Click on desired vehicle
      cy.get('.vehicle-details', { timeout: 40000 }).contains(new RegExp(`^${entry.vehicle}$`)).click();
      // Increment the iteration count for the next run
    });

    //Confirm Ride Button
    cy.get(':nth-child(4) > .justify-content-between', { timeout: 40000 }).click()

    //Click on Reserve Button
    cy.get('.res_btn_group > :nth-child(2)', { timeout: 40000 }).click()

    // //Credit Card
    // cy.get('#PassengerCard', { timeout: 40000 })
    //   .should('be.visible')
    //   .select('25110001', { force: true });
    // cy.get('.bbtn', { timeout: 40000 }).click()

    //ACH
    cy.get('#PaymentMethod', { timeout: 40000 })
      .should('be.visible')
      .select('AH', { force: true })
      .should('have.value', 'AH');
    cy.get('button.bbtn.btn-small', { timeout: 40000 }).click();

    //Retrieving Reservation Number
    cy.get('h3.mt-20', { timeout: 40000 })
      .invoke('text')
      .then((text) => {
        const reservationNumber = text.match(/\d+/)[0];
        reservationNumbers.push(reservationNumber);
        cy.log('Reservation Number:', reservationNumber);
        console.log('Reservation Number:', reservationNumber);

        // Store reservationNumber as an alias to use later
        cy.wrap(reservationNumber).as('reservationNumber');
      });

    // Click on Dispatch Button after reservation
    cy.get('.d-flex > [routerlink="/ride/dispatch/dashboard"]', { timeout: 60000 })
      .should('be.visible')
      .click({ force: true });

    //Click Find Ride
    cy.get('.inner-scroller > :nth-child(2) > :nth-child(2) > a', { timeout: 60000 }).click({ force: true });

    // Get the reservationNumber from reservation page and use it in the next commands
    cy.get('@reservationNumber', { timeout: 40000 }).then((reservationNumber) => {
      cy.get(':nth-child(2) > :nth-child(2) > .form-group > .form-control', { timeout: 40000 })
        .type(reservationNumber);
      cy.get('#ngb-typeahead-3-0', { timeout: 40000 }).click();
      cy.get('.btn', { timeout: 40000 }).click();
    });
    cy.wait(5000)
    //Accept Ride
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .click();
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .rightclick();
    cy.wait(2000)
    cy.contains('Accept Ride', { timeout: 40000 })
      .click();
    cy.contains('Are you sure, you want to accept 1 ride?', { timeout: 40000 })
      .should('be.visible');
    cy.contains('Yes', { timeout: 40000 })
      .click();

    //Assign | Dispatch
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .click();
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .rightclick();
    cy.contains('Assign | Dispatch', { timeout: 40000 })
      .click();

    //Assign Affiliate
    cy.get('.pl-20 > .form-group > .ng-select-searchable > .ng-select-container > .ng-value-container > .ng-input > input', { timeout: 40000 })
      .click(); // Click to open the dropdown
    cy.wait(2000);
    cy.get('.ng-dropdown-panel .ng-option', { timeout: 40000 }) // Wait for dropdown options
      .first() // Select the first option
      .click();
    cy.wait(2000)

    //Assign Chauffeur
    cy.get('.dis_grid > .form-group > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper', { timeout: 40000 }).click()
    cy.wait(2000);
    cy.get('.ng-dropdown-panel .ng-option', { timeout: 40000 }) // Wait for dropdown options
      .first() // Select the first option
      .click();

    //Click on Dispatch Button
    cy.get('container-element > .d-flex > :nth-child(2)', { timeout: 40000 }).click()

    //Confirm sending email to affiliate
    cy.get('.modal-transparent__btn', { timeout: 40000 }).click()


    //right click and go to reservation sync
    cy.wait(3000)
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .click();
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .rightclick();
    cy.contains('Reservation Sync', { timeout: 40000 })
      .click();
    cy.contains('Generate Link', { timeout: 40000 })
      .click();

    //Updating event name
    const eventName = faker.string.numeric(8);
    Eventname = eventName;

    // Click on the edit icon to reveal the input field
    cy.get('.ss-edit.ss-edit-pro', { timeout: 40000 }).click();

    // Wait for the input field to appear, and then clear and type the event name
    cy.get('input[maxlength="20"]', { timeout: 40000 })
      .should('be.visible')
      .clear()
      .type(eventName);

    console.log(eventName);
    cy.log(eventName);

    // //Update due date
    // cy.get('span[role="button"] > i.ss-lock.lock', { timeout: 40000 })
    //   .eq(0) // Change index based on which element you need
    //   .click({ force: true });

    // cy.get('.modal-primary__btn', { timeout: 40000 }).click()
    // cy.get('.col-sm-12 > .form-group > .form-control', { timeout: 40000 }).click().type(789789)
    // cy.contains('button', 'Save').click();
    // cy.get('.d-flex.small > [ngbdatepicker=""]', { timeout: 40000 }).click()
    // cy.get('.right', { timeout: 40000 }).click()
    // cy.get('.ngb-dp-day').contains('28').click();

    //Applying Discounts
    cy.get(':nth-child(3) > :nth-child(1) > .card > .mb-3 > [role="button"] > .ss-lock').click()
    cy.get('.modal-primary__btn').click()
    cy.get('.col-sm-12 > .form-group > .form-control', { timeout: 40000 }).click().type(789789)
    cy.contains('button', 'Save', { timeout: 40000 }).click();
    cy.wait(6000)
    cy.get(':nth-child(2) > .card > .row > :nth-child(2) > .d-flex > .input-group > .form-control', { timeout: 40000 }).click().type('10');
    cy.contains('button', 'Generate Link').click();

    //Storing the Link in global variable
    cy.get('.text-success').invoke('text').then((text) => {
      generateLink = text;  // Store the text in the global variable
      cy.log('Generated Link: ' + generateLink);  // Log it for reference
    });

    //Storing OTP in the global variable
    cy.get('p[style="color: #000; text-align: center; font-family: Helvetica, Arial, sans-serif; font-size: 64px; font-style: normal; font-weight: 400; line-height: 64px;"]')
      .invoke('text')
      .then((text) => {
        otp = text.trim().substring(0, 4);  // Store OTP value in a variable
        cy.log('OTP: ' + otp);  // Log OTP for reference
      });
  });

  Cypress._.times(2, () => {
    it('should create multiple reservations and add them to event', () => {

      let iteration = 2;  //Give index number from the example.json.data

      cy.visit('https://rc.synq7.com/');

      // Login process
      cy.get('.input-container > .ng-pristine', { timeout: 40000 })
      .type('qaautomation@test.com');
      cy.get('.custom-btn', { timeout: 40000 }).click();

      cy.get('#Password', { timeout: 40000 })
      .type('Qa123456@');
      cy.get('.custom-btn', { timeout: 40000 }).click({ force: true });
      cy.url({ timeout: 40000 }).should('include', 'dispatch/dashboard');

      cy.wait(3000);
      // Navigate to ride booking page
      cy.wait(3000);
      cy.get('span.btn-text', { timeout: 10000 }).click({ force: true });

      //Filling Up Passenger Info
      cy.get(':nth-child(1) > .booking-info-cards > .front-side > .form-group > .booking-search__left > .input-group > .form-control', { timeout: 40000 }).should('be.enabled')
        .click()
        .type('Bayes RideCentric');

      cy.get(':nth-child(1) > .booking-info-cards > .front-side > .form-group > .booking-search__left > .input-group > #basic-addon2', { timeout: 40000 })
        .should('be.visible')
        .click();

      // Click the final button
      cy.get(':nth-child(1) > :nth-child(7) > .btn-success-main', { timeout: 40000 })
        .click();

      //Filling reservation details 
      cy.get('.ngb-dp-today > .btn-light', { timeout: 40000 }).click()
      cy.get(':nth-child(5) > .time-link', { timeout: 40000 }).click()
      cy.get(':nth-child(11) > .time-link', { timeout: 40000 }).click()
      cy.get(':nth-child(2) > .time-zoon-link', { timeout: 40000 }).click()
      cy.get('.set-time-btn', { timeout: 40000 }).click()
      cy.get('.ng-dropdown-panel-items', { timeout: 40000 }).contains('3').click();
      cy.get('.ng-dropdown-panel-items', { timeout: 40000 }).contains('2').click();

      cy.fixture('example.json').then((data) => {
        // Get the current set of data based on iteration
        const entry = data[iteration % data.length];

        cy.get('#ReservationAddress0').type(entry.pickup_location);
        cy.wait(2000);
        cy.get('#ReservationAddress0').type('{downarrow}').type('{enter}');
        cy.wait(2000);

        cy.get('#ReservationAddress1').type(entry.dropoff_location);
        cy.wait(2000);
        cy.get('#ReservationAddress1').type('{downarrow}').type('{enter}');
        cy.wait(3000);

        //Click on Show Vehicle Button
        cy.get('.btn', { timeout: 40000 })
          .should('be.enabled')
          .click({ force: true });

        //Click on desired vehicle
        cy.get('.vehicle-details', { timeout: 40000 }).contains(new RegExp(`^${entry.vehicle}$`)).click();
        // Increment the iteration count for the next run
      });

      //Confirm Ride Button
      cy.get(':nth-child(4) > .justify-content-between', { timeout: 40000 }).click()

      //Click on Reserve Button
      cy.get('.res_btn_group > :nth-child(2)', { timeout: 40000 }).click()

      // //Credit Card
      // cy.get('#PassengerCard', { timeout: 40000 })
      //   .should('be.visible')
      //   .select('25110001', { force: true });
      // cy.get('.bbtn', { timeout: 40000 }).click()

      //ACH
      cy.get('#PaymentMethod', { timeout: 40000 })
        .should('be.visible')
        .select('AH', { force: true })
        .should('have.value', 'AH');
      cy.get('button.bbtn.btn-small', { timeout: 40000 }).click();

      //Retrieving Reservation Number
      cy.get('h3.mt-20', { timeout: 40000 })
        .invoke('text')
        .then((text) => {
          const reservationNumber = text.match(/\d+/)[0];
          reservationNumbers.push(reservationNumber);
          cy.log('Reservation Number:', reservationNumber);
          console.log('Reservation Number:', reservationNumber);

          // Store reservationNumber as an alias to use later
          cy.wrap(reservationNumber).as('reservationNumber');
        });

      // Click on Dispatch Button after reservation
      cy.get('.d-flex > [routerlink="/ride/dispatch/dashboard"]', { timeout: 60000 })
        .should('be.visible')
        .click({ force: true });

      //Click Find Ride
      cy.get('.inner-scroller > :nth-child(2) > :nth-child(2) > a', { timeout: 60000 }).click({ force: true });

      // Get the reservationNumber from reservation page and use it in the next commands
      cy.get('@reservationNumber', { timeout: 40000 }).then((reservationNumber) => {
        cy.get(':nth-child(2) > :nth-child(2) > .form-group > .form-control', { timeout: 40000 })
          .type(reservationNumber);
        cy.get('#ngb-typeahead-3-0', { timeout: 40000 }).click();
        cy.get('.btn', { timeout: 40000 }).click();
        cy.wait(3000)
      });


      //Add to event
      cy.wait(3000)
      cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
        .click();
      cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
        .rightclick();
      cy.wait(2000)
      cy.contains('Reservation Sync', { timeout: 40000 })
        .click();
      cy.contains('Add to Event', { timeout: 40000 })
        .click();

      // Select the event 
      cy.wait(3000)
      cy.get('#EventCode', { timeout: 40000 })
        .select(Eventname, { force: true })
        .should('have.value', Eventname);
      cy.wait(1000)
      cy.get('.btn', { timeout: 40000 }).click()

    });

  });

  it('should search for reservation and remove from event', () => {

    cy.visit('https://rc.synq7.com/');

    // Login process
    cy.get('.input-container > .ng-pristine', { timeout: 40000 })
      .type('bayes@test.com');
    cy.get('.custom-btn', { timeout: 40000 }).click();

    cy.get('#Password', { timeout: 40000 })
      .type('Bayestest25@');
    cy.get('.custom-btn', { timeout: 40000 }).click({ force: true });
    cy.url({ timeout: 40000 }).should('include', 'dispatch/dashboard');

    //Click Find Ride
    cy.get('.inner-scroller > :nth-child(2) > :nth-child(2) > a', { timeout: 60000 }).click({ force: true });

    // Take the second last value of reservation from the array
    cy.get('[formcontrolname="f_resid"]', { timeout: 40000 }).click().type(reservationNumbers[1]);
    cy.wait(1000)
    cy.get('#ngb-typeahead-3-0 > span', { timeout: 40000 }).click()
    cy.get('.btn', { timeout: 40000 }).click()

    //right click and remove from event
    cy.wait(3000)
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .click();
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .rightclick();
    cy.contains('Reservation Sync', { timeout: 40000 })
      .click();
    cy.contains('Remove from Event', { timeout: 40000 })
      .click();
    cy.get('.modal-primary__btn', { timeout: 40000 }).click()
    cy.get('.alert', { timeout: 40000 }).should('be.visible').and('contain.text', 'Deleted successfully!!');

  })

  it('should navigate to res link, enter otp, complete payment process', () => {

    //visit the generated link and input the OTP
    cy.visit(generateLink);
    cy.wait(2000)
    cy.focused().type(otp);
    cy.wait(8000)

    //Click on payment proceed button
    cy.get('.resSync-right__down > .button-large', { timeout: 40000 }).click()
    cy.wait(2000)

    //Accept Terms & Condition Page
    cy.get('#acceptTerms', { timeout: 40000 }).click()
    cy.wait(2000)
    cy.get('.resSync-right__down > .button-large', { timeout: 40000 }).should('be.visible').click()
    cy.wait(2000)

    //ACH
    cy.get('div.resSyncPayment-box__inner.ach', { timeout: 40000 }).should('be.visible').click({ force: true });
    cy.get('button.button-large.button-blue.resSync-btn', { timeout: 40000 }).click({ force: true });
    //Click on Go to Reservations Button
    cy.get('.reservation-btn-text', { timeout: 40000 }).click()
    cy.wait(2000)


    // //Credit Card
    
    // cy.get(':nth-child(1) > .resSyncPayment-box__inner', { timeout: 40000 }).click();
    // cy.wait(2000)
    // //Add New Credit Card
    // cy.get('.resSyncPayment-page__left > .button-large', { timeout: 40000 }).click()
    // cy.wait(2000)
    // //Filling Credit Card Informations
    // cy.get('.ccForm > #cardHolderName', { timeout: 40000 }).click().type('Bayes')
    // cy.wait(2000)
    // cy.get('.ccForm > #cardNumber', { timeout: 40000 }).click().type('4111111111111111')
    // cy.wait(2000)
    // cy.get('.ccForm > #expiryDate', { timeout: 40000 }).click().type('0828')
    // cy.wait(2000)
    // cy.get('.ccForm > #cvv', { timeout: 40000 }).click().type('888')
    // cy.wait(2000)
    // //Click on Confirm Reservation
    // cy.get('.resSync-right__down > .button-large', { timeout: 40000 }).should('be.visible').click()
    // cy.wait(2000)
    // //Link Copy
    // cy.get('.copy-icon', { timeout: 40000 }).click()
    // cy.wait(2000)
    // //Click on Go to Reservations Button
    // cy.get('.reservation-btn-text', { timeout: 40000 }).click()
    // cy.wait(2000)







  })


  after(() => {
    cy.log('Reservation Numbers:', JSON.stringify(reservationNumbers));
    cy.log('Generated Link:', generateLink);
    cy.log('OTP:', otp);
    cy.log('Event Name:', Eventname);

    console.log('Reservation Numbers:', reservationNumbers);
    console.log('Generated Link:', generateLink);
    console.log('OTP:', otp);
    console.log('Event Name:', Eventname);
  });

});