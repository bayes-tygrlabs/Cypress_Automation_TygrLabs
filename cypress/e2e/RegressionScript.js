describe('Regression Test', () => {
  it('should complete the entire ride booking workflow including login, passenger info, reservation, dispatch, sending emails and status updates', () => {

    let iteration = 0;  //Give index number from the example.json.data

    cy.visit('https://rc.synq7.com/');

    //Reservation Creation\\

    // Login process
    cy.get('.input-container > .ng-pristine', { timeout: 40000 })
      .type('bayes@test.com');
    cy.get('.custom-btn').click();
    cy.get('#Password', { timeout: 40000 })
      .type('Bayestest25@');
    cy.get('.custom-btn', { timeout: 40000 }).click({ force: true });
    cy.url({ timeout: 40000 }).should('include', 'dispatch/dashboard');
    cy.wait(2000);

    // Navigate to ride booking page
    cy.visit('https://rc.synq7.com/ride/booking');
    cy.wait(1000);

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
    });

    //Confirm Ride Button
    cy.get(':nth-child(4) > .justify-content-between', { timeout: 40000 }).click()

    //Click on Reserve Button
    cy.get('.res_btn_group > :nth-child(2)', { timeout: 40000 }).click()

    //Filling Billing Info
    cy.get('#PassengerCard', { timeout: 40000 }).select('Amex## - 0005')
    cy.get('.bbtn', { timeout: 40000 }).click()

    //Retrieving Reservation Number
    cy.get('h3.mt-20', { timeout: 40000 })
      .invoke('text')
      .then((text) => {
        const reservationNumber = text.match(/\d+/)[0];
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

    //Functionalities Check After Booking Reservations\\
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

    //Send Chauffeur Link
    cy.wait(3000)
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .click();
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .rightclick();
    cy.contains('Send Chauffeur Link', { timeout: 40000 })
      .click();

    //Inputting country code and number
    cy.get('.CountryOptionItem', { timeout: 40000 }).click()
    cy.get('.select2-search__field', { timeout: 40000 }).type('Bangladesh').type('{enter}')
    cy.get('.CountryNumberInput', { timeout: 40000 })
      .clear()
      .type('01744820559');

    //If an email already exists, clear it out. If not, just skip this step
    cy.get('body').then(($body) => {  // Check if the element exists in the body
      if ($body.find('.chip > .ss-close').length > 0) {  // If the element exists
        cy.get('.chip > .ss-close').click(); // Click the element
      }
    });

    // Inputting Email Address
    cy.get('#receiverEmailId', { timeout: 40000 })
      .clear()
      .type('bayesridecentric@gmail.com');
    cy.get('.btn', { timeout: 40000 }).click();
    cy.wait(3000)
    cy.log('Chauffeur Link Has Been Sent');

    //Click on the reservation
    cy.wait(2000)
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .click();
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
      .rightclick();

    //Taking mouse hover to mail section
    cy.get('[ngbtooltip="Send Mail/SMS"]', { timeout: 40000 })
      .trigger('mouseenter'); // Move the cursor to the element

    // Pax Ride Confirmation
    cy.contains('a', 'Pax Ride Confirmation', { timeout: 40000 })
      .click({ force: true }); // Force click even if not visible
    cy.get('select[formcontrolname="MailFormat"]').select('HTML-PDF');
    cy.get('form.ng-untouched.ng-valid > :nth-child(1) > :nth-child(2) > .tile > .p-20 > .d-flex > .btn-medium', { timeout: 40000 }).click()

    // Affiliate Ride Order
    cy.contains('a', 'Affiliate Ride Order', { timeout: 40000 })
      .click({ force: true }); // Force click even if not visible
    // Get the email input field
    const emailInput = cy.get('#receiverEmailId');
    // Check if the chip (existing email) exists
    cy.get('.chip-input-container').find('.chip').then(($chips) => {
      if ($chips.length > 0) {
        // If the chip exists, click on the close icon to remove the email
        cy.get('.chip-input-container > :nth-child(1) > .ss-close').click();
      }
      // Now type the new email in the input field
      cy.get('#receiverEmailId').type('bayesridecentric@gmail.com');
    });
    cy.wait(3000)
    cy.get('.btn-medium', { timeout: 40000 }).click()
    cy.log('Affiliate Ride Order Email Has Been Sent');

    // //Status Change
    function waitForLoaderToDisappear() {
      cy.get('.spinner', { timeout: 60000 }).should('not.exist');
      cy.get('#divpreloader.preloader.show', { timeout: 60000 }).should('not.exist');
      // Retry mechanism in case the loader reappears after some time
      cy.wait(500); // Buffer time
      cy.get('body').then(($body) => {
        if ($body.find('#divpreloader.preloader.show').length > 0) {
          cy.get('#divpreloader.preloader.show', { timeout: 60000 }).should('not.exist');
        }
      });
    }
    // Function to safely update status
    function updateStatus(statusSelector) {
      waitForLoaderToDisappear(); // Ensure the page is stable
      cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 })
        .should('be.visible')
        .should('not.be.disabled')
        .as('statusCell');
      cy.get('@statusCell').click();
      cy.wait(500); // Allow UI to update
      cy.get('@statusCell').rightclick();
      cy.contains('Status Update', { timeout: 40000 }).click();
      cy.get(statusSelector, { timeout: 40000 }).click();
      waitForLoaderToDisappear(); // Ensure the UI is fully ready before next action
    }
    // Status Change Sequence
    updateStatus(':nth-child(3) > .res-stat-btn > .text'); // Ride Accepted
    updateStatus(':nth-child(5) > .res-stat-btn > .text'); // Enroute
    updateStatus(':nth-child(7) > .res-stat-btn > .text'); // On-site
    updateStatus(':nth-child(9) > .res-stat-btn > .text'); // On-Board
    updateStatus(':nth-child(11) > .res-stat-btn > .text'); // Complete

    //Navigate to settings and Click on Archive Res
    cy.get('.ss-settings', { timeout: 40000 }).click()
    cy.contains('a', 'Archive Res', { timeout: 40000 }).click();
    cy.get('form.ng-untouched > :nth-child(1) > :nth-child(2) > :nth-child(1) > .form-group > .form-control', { timeout: 40000 }).click()
    cy.get('select[title="Select year"]', { timeout: 40000 }).select('2027');
    cy.contains('div.btn-light', '25', { timeout: 40000 }).click();
    cy.get('@reservationNumber', { timeout: 40000 }).then((reservationNumber) => {
      cy.get(':nth-child(3) > .form-group > .form-control', { timeout: 40000 }).click().type(reservationNumber);
      cy.get('.row.align-items-center > .d-flex > .btn', { timeout: 40000 }).click();
    });
    cy.get('tbody > tr > :nth-child(1)', { timeout: 40000 }).click()
    cy.get(':nth-child(1) > .d-flex > .btn', { timeout: 40000 }).click()
    cy.get('.modal-primary__btn', { timeout: 40000 }).click()

    //Navigate to Ride Closeout and Continue the Process
    cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
    cy.get('.ss-download', { timeout: 40000 }).click()
    cy.get('.col-12 > .btn', { timeout: 40000 }).click()
    cy.get('@reservationNumber', { timeout: 40000 }).then((reservationNumber) => {
      // cy.get('input[placeholder="res, pax, account"]', { timeout: 40000 }).click().type(reservationNumber).type('{enter}');
      cy.get('input[placeholder="res, pax, account"]', { timeout: 40000 })
        .click()
        .type(reservationNumber, { delay: 500 }) // Adjust delay as needed
        .type('{enter}');
      cy.wait(3000)

    });

    cy.get('.tabulator-row > [tabulator-field="ResNoLive"]', { timeout: 40000 }).dblclick();

    //Billing Info (Cost Finalizing and Save)
    cy.get(':nth-child(6) > :nth-child(1) > div.form-switch > .switch-wrapper > .ng-untouched', { timeout: 40000 }).click()
    cy.wait(2000)
    cy.get('.pl-20 > .btn', { timeout: 40000 }).click({ force: true });
    cy.get('.chip-input-container > :nth-child(2) > .ss-close', { timeout: 40000 }).click()
    cy.get('.p-20 > .d-flex > .btn', { timeout: 40000 }).click()
    cy.contains('a', 'Dispatch', { timeout: 40000 }).click({ force: true });











  });
});