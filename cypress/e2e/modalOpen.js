describe('Modal Opening Test', () => {
    it('should open the modal when the button is clicked', () => {
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

        // //Verifying Header Navigations
        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
        cy.wait(2000); // Wait for the page to update
        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).should('exist').should('be.visible');
        cy.log('Ride Closeout is Visible');

        cy.contains('a', 'Invoice', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.contains('a', 'Invoice', { timeout: 40000 }).should('exist').should('be.visible');
        cy.log('Invoice is Visible');

        cy.contains('a', 'Manifest', { timeout: 40000 }).click();
        cy.log('Manifest is Visible');
        cy.wait(2000);

        cy.contains('a', 'Incident', { timeout: 40000 }).click().should('be.visible');
        cy.log('Incident is Visible');
        cy.wait(2000);

        cy.get('.ss-settings', { timeout: 40000 }).click().should('be.visible');
        cy.log('Settings is Visible');
        cy.wait(2000);

        cy.get('.internal_notification > app-notifications > .icon-link > .ss-notification', { timeout: 40000 })
            .should('exist') 
            .should('be.visible') 
            .click();
        cy.log('Notifications is Visible');
        cy.wait(2000);
    
        cy.contains('span.btn-text', 'Quote/Book Ride', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.contains('span.btn-text', 'Quote/Book Ride', { timeout: 40000 }).should('be.visible');
        cy.log('QUOTE/BOOK RIDE is Visible');
        cy.wait(2000);

        cy.contains('a', 'Dispatch', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.contains('a', 'Dispatch', { timeout: 40000 }).should('be.visible');
        cy.log('Dispatch is Visible');
        cy.wait(2000);

        cy.get('.ss-find-ride', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close').click()
        cy.log('Find Ride is Visible');

        cy.get('.ss-dispatch-filter', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-5', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-6', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-7', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-8', { timeout: 40000 }).click({force:true})
        cy.wait(2000);
        cy.get('.btn-link > .ss-close').click()
        cy.log('Filter Rides is Visible');

        cy.get('.ss-show-hide-column', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close').click()
        cy.log('Show/Hide Columns is Visible');

        cy.get(':nth-child(3) > .tile > .dispatch-info > table > tbody > :nth-child(1) > :nth-child(1)', { timeout: 40000 }).click({force:true}).should('be.visible') //Clicking on unassigned rides
        cy.get('.tabulator-table > :nth-child(1) > [tabulator-field="ResStatus"]', { timeout: 40000 }).click({force:true}).should('be.visible') //Clicking the first ride
        cy.get('.ss-ride-history', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close').click()
        cy.log('Reservation Logs is visible');

        cy.get(':nth-child(3) > .tile > .dispatch-info > table > tbody > :nth-child(1) > :nth-child(1)', { timeout: 40000 }).click({force:true}).should('be.visible') //Clicking on unassigned rides
        cy.get('.tabulator-table > :nth-child(1) > [tabulator-field="ResStatus"]', { timeout: 40000 }).click({force:true}).should('be.visible') //Clicking the first ride
        cy.get('.ss-add-deposit', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-10', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-11', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close').click()
        cy.log('Add Deposit/Credit is visible');

        cy.get('.ss-reset', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.log('Refresh/Reset is visible');

        cy.get(':nth-child(3) > .tile > .dispatch-info > table > tbody > :nth-child(1) > :nth-child(1)', { timeout: 40000 }).click({force:true}).should('be.visible') //Clicking on unassigned rides
        cy.get('.tabulator-table > :nth-child(1) > [tabulator-field="ResStatus"]', { timeout: 40000 }).click({force:true}) //Clicking the first ride
        cy.get('[ngbtooltip="Edit Ride"]', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.contains('Edit/Change').click({force:true})
        cy.wait(2000);
        cy.contains('a', 'Dispatch', { timeout: 40000 }).click();
        cy.log('Edit Ride is visible');
        
        cy.get(':nth-child(3) > .tile > .dispatch-info > table > tbody > :nth-child(1) > :nth-child(1)', { timeout: 40000 }).click({force:true}).should('be.visible') //Clicking on unassigned rides
        cy.wait(2000);
        cy.get('.tabulator-table > :nth-child(1) > [tabulator-field="ResStatus"]', { timeout: 40000 }).click({force:true})//Clicking the first ride
        cy.wait(2000);
        cy.get('.ss-car', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close').click()
        cy.log('Assign & Dispatch is visible');

        cy.get(':nth-child(3) > .tile > .dispatch-info > table > tbody > :nth-child(1) > :nth-child(1)', { timeout: 40000 }).click({force:true})//Clicking on unassigned rides
        cy.wait(2000);
        cy.get('.tabulator-table > :nth-child(1) > [tabulator-field="ResStatus"]', { timeout: 40000 }).click({force:true}).should('be.visible') //Clicking the first ride
        cy.wait(2000)
        cy.get('.ss-document', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(3000);
        cy.get('.btn-link > .ss-close').click()
        cy.log('Ride Closeout Note is visible');

        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
        cy.wait(2000)
        cy.get('.tabulator-table > :nth-child(1) > [tabulator-field="ResStatus"]', { timeout: 40000 }).click({ force: true }) //Clicking the first ride
        cy.get('.ss-ride-history', { timeout: 40000 }).click({ force: true }).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click()
        cy.log('Reservation logs in Ride Closeout is visible');

        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
        cy.wait(2000)
        cy.get('.ss-find-ride', { timeout: 40000 }).click({ force: true }).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click()
        cy.log('Find Ride in Ride Closeout is visible');

        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
        cy.wait(2000)
        cy.get('.ss-dispatch-filter', { timeout: 40000 }).click({ force: true }).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-13', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-14', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-15', { timeout: 40000 }).click({force:true}).should('be.visible')
        cy.wait(2000);
        cy.get('#ngb-nav-16', { timeout: 40000 }).click({force:true})
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click()
        cy.log('Filter Rides in Ride Closeout is visible');

        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
        cy.wait(2000)
        cy.get('.ss-show-hide-column', { timeout: 40000 }).click({ force: true }).should('be.visible')
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click()
        cy.log('Show/Hide Column in Ride Closeout is visible');
        
        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
        cy.wait(2000)
        cy.get('.ss-reset', { timeout: 40000 }).click({ force: true }).should('be.visible')
        cy.wait(2000);
        cy.log('Refresh/Reset in Ride Closeout is visible');

        cy.contains('a', 'Ride Closeout', { timeout: 40000 }).click();
        cy.wait(2000)
        cy.get('.tabulator-table > :nth-child(1) > [tabulator-field="ResStatus"]', { timeout: 40000 }).dblclick({ force: true })
        cy.wait(3000);
        // cy.get('.btn-link > .ss-close', { timeout: 40000 }).click()
        cy.log('Ride Details in Ride Closeout is visible');

        cy.contains('a', 'Invoice', { timeout: 40000 }).click({ force: true });
        cy.get(':nth-child(2) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(3) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(4) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Invoice Details are visible');

        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000); // Wait for 1 second
        cy.contains('a', 'Employee/App User', { timeout: 40000 }).click();
        cy.wait(2000); // Wait for 2 seconds
        cy.log('Employee/App user is visible');
        
        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Customer Account', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.col-md-4 > .d-flex > .btn', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Customer account is visible');
        
        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Passenger', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.col-md-4 > .d-flex > .btn', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Passenger is visible');
        
        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Travel Arranger', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.col-md-4 > .d-flex > .btn', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Travel Arranger is visible');
        
        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Travel Arranger Agency', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.col-md-4 > .d-flex > .btn', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Travel Arranger Agency is visible');
        
        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Event Code', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.btn', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Event Code is visible');
        
        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Archive Res', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.btn-tabs > :nth-child(2) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Archive Res is visible');
        
        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Global Affiliate', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.col-lg-2 > .d-flex > .btn', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Global Affiliate is visible');

        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        // cy.contains('a', 'GNet', { timeout: 40000 }).click();
        // cy.wait(2000);
        cy.log('GNet is visible');

        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Reward Setup', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('#ngb-nav-23', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('#ngb-nav-24', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.log('Reward Setup is visible');

        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'Service Area/Rates', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get('.btn', { timeout: 40000 }).click()
        cy.wait(2000);
        cy.get('.btn-link > .ss-close', { timeout: 40000 }).click()
        cy.wait(2000);
        cy.get('.ss-rate-exception', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-Account-level-discount', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-blackout-dates-rates', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-Service-area-geo', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('All Service Area sections are visible');

        cy.get('.ss-settings', { timeout: 40000 }).click({ force: true });
        cy.wait(1000);
        cy.contains('a', 'System Setup', { timeout: 40000 }).click();
        cy.wait(2000);
        cy.get(':nth-child(2) > a > .icon-circle > .ss-account-status', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('.ss-user1', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-airline', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-airport', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-chauffeur-category', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(7) > a > .icon-circle > .ss-dispatch-status', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-extra-services', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        // cy.get('.ss-incident-management', { timeout: 40000 }).click({ force: true })
        // cy.wait(2000);
        cy.get('.ss-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-user-settings-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-user-type-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-payment-gateway', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-payment-type', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-run-type', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(18) > a > .icon-circle > .ss-reservation-status', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-reward-level', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-UDF', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-vehicle-type', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('All settings in system setup is visible');
        
        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.contains('a', 'Dispatch', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.log('Dispatch in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(1) > :nth-child(1) > ul > :nth-child(2) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-tabs > :nth-child(2) > .ng-untouched', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(3) > .ng-untouched', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Flight Search in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(1) > :nth-child(1) > ul > :nth-child(3) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Invoice in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(1) > :nth-child(1) > ul > :nth-child(4) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-data-validation-1', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-processor', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-upload', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.ss-edit', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Manifest Processor in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(1) > :nth-child(1) > ul > :nth-child(5) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Quote/Book Ride in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(1) > :nth-child(1) > ul > :nth-child(6) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Ride Closeout in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(2) > .category-menu > ul > :nth-child(1) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Activity Report in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(2) > .category-menu > ul > :nth-child(2) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(2) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(3) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Affiliate Pay in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(2) > .category-menu > ul > :nth-child(3) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(2) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(3) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('In-House Chauffeur Pay in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(2) > .category-menu > ul > :nth-child(4) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(2) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(3) > .nav-link', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Travel Arranger Comm in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(2) > .category-menu > ul > :nth-child(5) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.mb-15 > .btn-tabs > :nth-child(2) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(3) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(4) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.reward_table > .btn-tabs > :nth-child(2) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Reward Pay in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(3) > .category-menu > ul > :nth-child(1) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-tabs > :nth-child(2) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('AR Aging Report in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(3) > .category-menu > ul > :nth-child(2) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-tabs > :nth-child(2) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('AR Statement Report in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(3) > .category-menu > ul > :nth-child(3) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-tabs > :nth-child(2) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-tabs > :nth-child(3) > input', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Invoice Report in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(3) > .category-menu > ul > :nth-child(4) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Credit Card Batch Report in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(3) > .category-menu > ul > :nth-child(5) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Revenue Batch Report in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(3) > .category-menu > ul > :nth-child(6) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.btn-tabs > :nth-child(2) > .ng-untouched', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get(':nth-child(3) > .ng-untouched', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Ride Closeout Report in Mega Menu is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(4) > .category-menu > ul > :nth-child(1) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('#ngb-nav-26', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000)
        cy.log('Account Performance is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(4) > .category-menu > ul > :nth-child(2) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000)
        cy.log('Feedback Report is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(4) > .category-menu > ul > :nth-child(4) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000)
        cy.get('#ngb-nav-28', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.wait(2000)
        cy.log('Company Performance is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(4) > .category-menu > ul > :nth-child(6) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.log('Incident Report is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(4) > .category-menu > ul > :nth-child(7) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.log('Manifest Report is visible');

        cy.get('.icon-link > .ss-megamenu', { timeout: 40000 }).click({ force: true });
        cy.wait(2000);
        cy.get('app-mega > .mega-menu > :nth-child(2) > .col-lg-9 > .row > :nth-child(4) > .category-menu > ul > :nth-child(8) > a', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.get('.tile-menu > .ss-invoice-menu', { timeout: 40000 }).click({ force: true })
        cy.get('#ngb-nav-30', { timeout: 40000 }).click({ force: true })
        cy.wait(2000);
        cy.log('Profit Margin Report is visible');















        






    });
});