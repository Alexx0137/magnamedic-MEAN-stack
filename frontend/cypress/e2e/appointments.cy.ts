describe('Gestión de citas', () => {
    before(() => {


        cy.login('alexx@mail.com', 'secret');
    });

    it('Debe permitir agregar, editar, y eliminar una cita', () => {

        // Navega a la página de citas después de estar logueado
        cy.visit('/appointments/list');

        // Agregar una nueva cita
        cy.get('#link-form').click()
        cy.get('[data-cy="patient"]').click().contains('8080 - Nelson Garcia').click();
        cy.get('[data-cy="date"]').type('2024-07-15');
        cy.get('[data-cy="time"]').type('10:00');
        cy.get('[data-cy="speciality"]').select('Medicina Géneral');
        cy.get('[data-cy="doctor"]').select('Laura Vargas');
        cy.get('[data-cy="observations"]').type('Observaciones de prueba');
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue guardada
        cy.contains('Cita médica creada exitosamente', ).should('be.visible');

        // Editar la cita
        cy.get('[data-cy="edit-appointment-button"]').first().click();
        cy.get('[data-cy="state"]').select('Cancelada');
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue actualizada
        cy.contains('Cita médica actualizada exitosamente').should('be.visible');

        // Eliminar la cita
        cy.get('[data-cy="delete-appointment-button"]').first().click();
        cy.contains('Sí, eliminar').click();
        cy.contains('Cita médica eliminada exitosamente').should('be.visible');
    });
});
