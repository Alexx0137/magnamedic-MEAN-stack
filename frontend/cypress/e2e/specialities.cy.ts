describe('Crud de especialidades médicas', () => {
    before(() => {


        cy.login('alexx@mail.com', 'secret');
    });

    it('Debe permitir agregar, editar, y eliminar una especialidad', () => {

        // Navega a la página de citas después de estar logueado
        cy.visit('/specialities/list');

        // Agregar una nueva cita
        cy.get('#link-form').click()
        cy.get('[data-cy="code"]').type('100');
        cy.get('[data-cy="name"]').type('Medicina Géneral');
        cy.get('[data-cy="consulting_room"]').type('101');
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue guardada
        cy.contains('Especialidad médica creada exitosamente', ).should('be.visible');

        // Editar la cita
        cy.get('[data-cy="edit-appointment-button"]').first().click();
        cy.get('[data-cy="consulting_room"]').type('305');
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue actualizada
        cy.contains('Especialidad médica actualizada exitosamente').should('be.visible');

        // Eliminar la cita
        cy.get('[data-cy="delete-appointment-button"]').first().click();
        cy.contains('Sí, eliminar').click();
        cy.contains('Especialidad médica eliminada exitosamente').should('be.visible');
    });
});
