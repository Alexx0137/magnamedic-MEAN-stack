describe('Crud de pacientes', () => {
    before(() => {


        cy.login('alexx@mail.com', 'secret');
    });

    it('Debe permitir agregar, editar, y eliminar un paciente', () => {

        // Navega a la página de citas después de estar logueado
        cy.visit('/patients/list');

        // Agregar una nueva cita
        cy.get('#link-form').click()
        cy.get('[data-cy="name"]').type('Nelson')
        cy.get('[data-cy="last_name"]').type('Garcia')
        cy.get('[data-cy="identification_type_id"]').select('Cédula de ciudadanía');
        cy.get('[data-cy="identification"]').type('808080')
        cy.get('[data-cy="gender_id"]').select('Masculino');
        cy.get('[data-cy="blood_type_id"]').select('O+');
        cy.get('[data-cy="eps"]').select('Compensar');
        cy.get('[data-cy="address"]').type('Calle 100 # 15 - 15');
        cy.get('[data-cy="telephone"]').type('3013235487');
        cy.get('[data-cy="email"]').type('alexxg@mail.com');
        cy.get('[data-cy="date"]').type('1984-07-13');
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue guardada
        cy.contains('Paciente creado exitosamente', ).should('be.visible');

        // Editar la cita
        cy.get('[data-cy="edit-appointment-button"]').first().click();
        cy.get('[data-cy="state"]').first().click();
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue actualizada
        cy.contains('Paciente actualizado exitosamente').should('be.visible');

        // Eliminar la cita
        cy.get('[data-cy="delete-appointment-button"]').first().click();
        cy.contains('Sí, eliminar').click();
        cy.contains('Paciente eliminado exitosamente').should('be.visible');
    });
});
