describe('Crud de usuarios', () => {
    before(() => {


        cy.login('alexx@mail.com', 'secret');
    });

    it('Debe permitir agregar, editar, y eliminar un usuario', () => {

        // Navega a la página de citas después de estar logueado
        cy.visit('/users/list');

        // Agregar una nueva cita
        cy.get('#link-form').click()
        cy.get('[data-cy="name"]').type('Esteban')
        cy.get('[data-cy="last_name"]').type('Rendon')
        cy.get('[data-cy="identification_type_id"]').select('Cédula de ciudadanía');
        cy.get('[data-cy="identification"]').type('202020')
        cy.get('[data-cy="email"]').type('esteban@mail.com');
        cy.get('[data-cy="role"]').select('Administrador');
        cy.get('[data-cy="password"]').type('admin');
        cy.get('[data-cy="confirmPassword"]').type('admin');

        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue guardada
        cy.contains('Usuario creado exitosamente', ).should('be.visible');

        // Editar la cita
        cy.get('[data-cy="edit-appointment-button"]').first().click();
        cy.get('[data-cy="state"]').first().click();
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue actualizada
        cy.contains('Usuario actualizado exitosamente').should('be.visible');

        // Eliminar la cita
        cy.get('[data-cy="delete-appointment-button"]').first().click();
        cy.contains('Sí, eliminar').click();
        cy.contains('Usuario eliminado exitosamente').should('be.visible');
    });
});
