describe('Dispatch Test', () => {
  it('should login successfully & quote a ride', () => {

    let iteration = 2;  //Give index number from the example.json.data

    cy.visit('https://rc.synq7.com/');
    

    // Login process
    cy.get('.input-container > .ng-pristine', { timeout: 40000 })
      .type('bayes@test.com');
    cy.get('.custom-btn').click();

    cy.get('#Password', { timeout: 40000 })
      .type('Bayestest25@');
    cy.get('.custom-btn', { timeout: 40000 }).click({ force: true });
    cy.url({ timeout: 40000 }).should('include', 'dispatch/dashboard');

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

    //Filling and Editing Details in Reservation
    cy.get('.tabulator-row > [tabulator-field="ResStatus"]', { timeout: 40000 }).dblclick()
    cy.get('[ngbtooltip="Edit/Change"]', { timeout: 40000 }).click({ force: true })

    //Adding First Stop
    cy.get('.stop-add', { timeout: 40000 }).click({ force: true })
    cy.wait(1000)
    cy.get('#ReservationAddress', { timeout: 40000 })
      .click({ force: true })
      .type('Irving')
      .wait(500)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.accordion-button', { timeout: 40000 }).click({ force: true })
    cy.wait(500)
    cy.get('.accordion-body > :nth-child(1) > :nth-child(1) > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type('05')
    cy.get('.accordion-body > :nth-child(1) > :nth-child(2) > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type('Love Road')
    cy.get('.mb-3 > :nth-child(3) > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type('1111')
    cy.get('.CountryNumberInput', { timeout: 40000 }).click().type('7897897899')
    cy.get('.row.mt-20 > .col-sm-12 > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type('Will wait here for 3 Mins')
    cy.get('.col-sm-12 > .btn', { timeout: 40000 }).click({ force: true })
    cy.wait(1000)
    cy.get('.mr-2', { timeout: 40000 }).click({ force: true })

    //Adding Second Stop
    cy.get('.stop-add', { timeout: 40000 }).click({ force: true })
    cy.wait(1000)
    cy.get('#ReservationAddress', { timeout: 40000 })
      .click({ force: true })
      .type('Las')
      .wait(1000)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.accordion-button', { timeout: 40000 }).click({ force: true })
    cy.wait(500)
    cy.get('.accordion-body > :nth-child(1) > :nth-child(1) > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type('6th')
    cy.get('.accordion-body > :nth-child(1) > :nth-child(2) > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type('Ring Road')
    cy.get('.mb-3 > :nth-child(3) > .form-group > .form-control', { timeout: 40000 }).click().type('5000')
    cy.get('.CountryNumberInput', { timeout: 40000 }).click({ force: true }).type('5656565656')
    cy.get('.row.mt-20 > .col-sm-12 > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type('Not going to wait here for long')
    cy.get('.col-sm-12 > .btn', { timeout: 40000 }).click({ force: true })

    //Validating users cannot add more than two stops when its oneway
    cy.wait(1000)
    cy.get('.stop-add', { timeout: 40000 }).click()
    cy.wait(500)
    cy.get('.modal-body > .text-center > p').should('contain.text', 'You can’t add more than two stops for "OneWay" ride. Please select "By the Hour". Do you want to change it?')
    cy.wait(500)
    cy.get('.modal-transparent__btn', { timeout: 40000 }).click()
    cy.wait(500)
    cy.get('.stop-add', { timeout: 40000 }).click()
    cy.wait(500)
    cy.get('.modal-primary__btn', { timeout: 40000 }).click()
    cy.wait(500)

    //Changing the ride type
    cy.get('#ByHour', { timeout: 40000 }).click()
    cy.get('#increment', { timeout: 40000 }).click()
    cy.get('#increment', { timeout: 40000 }).click()
    cy.get(':nth-child(6) > .d-flex > .btn', { timeout: 40000 }).click()
    cy.get('.mr-2', { timeout: 40000 }).click()
    cy.wait(2000)

    //Adding Third Stop
    cy.get('.stop-add', { timeout: 40000 }).click({ force: true })
    cy.wait(1000)
    cy.get('#ReservationAddress', { timeout: 40000 })
      .click({ force: true })
      .type('Lamar Brown')
      .wait(1000)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.accordion-button', { timeout: 40000 }).click({ force: true })
    cy.wait(500)
    cy.get('.accordion-body > :nth-child(1) > :nth-child(1) > .form-group > .form-control', { timeout: 40000 }).click().type('Block A, Street 56')
    cy.get('.accordion-body > :nth-child(1) > :nth-child(2) > .form-group > .form-control', { timeout: 40000 }).click().type('Bayes Road')
    cy.get('.mb-3 > :nth-child(3) > .form-group > .form-control', { timeout: 40000 }).click().type('3300')
    cy.get('.CountryNumberInput', { timeout: 40000 }).click().type('5656565656')
    cy.get('.row.mt-20 > .col-sm-12 > .form-group > .form-control', { timeout: 40000 }).click().type('will buy flowers')
    cy.get('.col-sm-12 > .btn', { timeout: 40000 }).click()
    cy.wait(2000)

    //Special Instructions
    cy.get('.col-sm-12 > .edit > .ss-edit', { timeout: 40000 }).click()
    cy.wait(500)
    cy.get(':nth-child(1) > :nth-child(1) > .col-sm-12 > .form-group > .form-control', { timeout: 40000 }).eq(0).click({ force: true }).type("This is chauffeur note")
    cy.wait(500)
    cy.get(':nth-child(2) > .col-sm-12 > .form-group > .form-control', { timeout: 40000 }).click({ force: true }).type("This is reservation/dispatch note")
    cy.wait(500)
    cy.get(':nth-child(3) > .d-flex > .btn', { timeout: 40000 }).click()
    cy.get('.modal-primary__btn', { timeout: 40000 }).click()
    cy.wait(1000)

    //Adding Additional Services
    cy.get('#ExtraSvcCode', { timeout: 40000 }).select('Baggage Claim $15.00')
    cy.get('.ss-rounded-plus', { timeout: 40000 }).click()
    cy.get('.modal-primary__btn', { timeout: 40000 }).click()
    cy.wait(500)
    cy.get('.ss-remove', { timeout: 40000 }).eq(0).click({ force: true })
    cy.wait(1000)
    cy.get('.mr-2', { timeout: 40000 }).click({ force: true })
    cy.wait(500)
    cy.get('#ExtraSvcCode', { timeout: 40000 }).select('MISCELLANEOUS $20.00')
    cy.wait(500)
    cy.get('.ss-rounded-plus', { timeout: 40000 }).click()
    cy.wait(500)
    cy.get('.modal-primary__btn', { timeout: 40000 }).click()
    cy.wait(500)

    //Adding Additional Passenger
    cy.get('.ss-square-plus', { timeout: 40000 }).click()
    cy.wait(500)
    cy.get('tbody > :nth-child(1) > :nth-child(1) > .form-control', { timeout: 40000 }).type('Passenger')
    cy.wait(500)
    cy.get('tbody > :nth-child(1) > :nth-child(2) > .form-control', { timeout: 40000 }).type('One')
    cy.wait(500)
    cy.get('tbody > :nth-child(1) > :nth-child(3) > .form-control', { timeout: 40000 }).type('passengeradditional@hotmail.com')
    cy.wait(500)
    cy.get('.col-sm-12 > .d-flex > .btn', { timeout: 40000 }).click()
    cy.get('.modal-primary__btn', { timeout: 40000 }).click()

    //Sending Updated Confimation
    cy.get('.res_btn_group > .btn').click()



  });
});