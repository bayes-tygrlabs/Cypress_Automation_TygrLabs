import { faker } from '@faker-js/faker';

describe('Guest Booking', () => {
    function bookRide(action) {
        let iteration = 0; // Give index number from example.json

        cy.visit('https://rc.synq7.com/');
        cy.get('.mt-3 > .easy-btn', { timeout: 40000 }).click();
        cy.wait(5000)

        // Filling reservation details
        cy.get('.ngb-dp-today > .btn-light', { timeout: 40000 }).click();
        cy.get(':nth-child(5) > .time-link', { timeout: 40000 }).click();
        cy.get(':nth-child(11) > .time-link', { timeout: 40000 }).click();
        cy.get(':nth-child(2) > .time-zoon-link', { timeout: 40000 }).click();
        cy.get('.set-time-btn', { timeout: 40000 }).click();
        cy.get('.ng-dropdown-panel-items', { timeout: 40000 }).contains('3').click();
        cy.get('.ng-dropdown-panel-items', { timeout: 40000 }).contains('2').click();

        cy.fixture('example.json').then((data) => {
            const entry = data[iteration % data.length];

            cy.get('#ReservationAddress0').type(entry.pickup_location);
            cy.wait(2000);
            cy.get('#ReservationAddress0').type('{downarrow}').type('{enter}');
            cy.wait(2000);

            cy.get('#ReservationAddress1').type(entry.dropoff_location);
            cy.wait(2000);
            cy.get('#ReservationAddress1').type('{downarrow}').type('{enter}');
            cy.wait(3000);

            cy.get('.col-sm-12 > .btn', { timeout: 40000 }).should('be.enabled').click({ force: true });

            cy.get('.vehicle-details', { timeout: 40000 }).contains(new RegExp(`^${entry.vehicle}$`)).click();
        });

        // Confirm Ride Button
        cy.get(':nth-child(4) > .justify-content-between', { timeout: 40000 }).click();

        // Generating Random Form Input
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const mobileNumber = faker.phone.number('##########'); // Generates a 10-digit number

        cy.get('#FirstName', { timeout: 40000 }).click().type(firstName);
        cy.get('#LastName', { timeout: 40000 }).click().type(lastName);
        cy.get('#Email', { timeout: 40000 }).click().type(email);
        cy.get('.CountryNumberInput', { timeout: 40000 }).click().type(mobileNumber);

        cy.get('#CheckNewProfile', { timeout: 40000 }).uncheck();
        cy.get('.custom-btn', { timeout: 40000 }).click();

        // Perform action based on input parameter
        if (action === 'quote') {
            cy.get('.btn-ghost', { timeout: 40000 }).click(); // Click Save as Quote
        } else if (action === 'reserve') {
            cy.get('.res_btn_group > :nth-child(2)', { timeout: 40000 }).click(); // Click Reserve Button
        }
    }

    it('should book a ride and save as quote', () => {
        bookRide('quote');
        
        cy.get('h3.mt-20', { timeout: 40000 })
          .invoke('text')
          .then((text) => {
              cy.log(text); 
          }); 
    });
    

    it('should book a ride and reserve', () => {
        bookRide('reserve');
        
        cy.get(':nth-child(2) > :nth-child(1) > .row > :nth-child(1) > .form-group > .form-control', { timeout: 40000 }).click().type('Test Name');
        cy.get('#cc-number', { timeout: 40000 }).click().type('4111 1111 1111 1111')
        cy.get('#cc-exp-date', { timeout: 40000 }).click().type('0630')
        cy.get('#cc-cvc', { timeout: 40000 }).click().type('888')
        cy.get('.bbtn', { timeout: 40000 }).click()
        cy.get('h3.mt-20', { timeout: 40000 })
          .invoke('text')
          .then((text) => {
              cy.log(text);
          }); 
    });


});
