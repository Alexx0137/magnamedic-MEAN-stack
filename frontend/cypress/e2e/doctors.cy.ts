describe('Crud de médicos', () => {
    before(() => {


        cy.login('alexx@mail.com', 'secret');
    });

    it('Debe permitir agregar, editar, y eliminar un médico', () => {

        // Navega a la página de citas después de estar logueado
        cy.visit('/doctors/list');

        // Agregar una nueva cita
        cy.get('#link-form').click()
        cy.get('[data-cy="name"]').type('Laura')
        cy.get('[data-cy="last_name"]').type('Vargas')
        cy.get('[data-cy="identification_type_id"]').select('Cédula de ciudadanía');
        cy.get('[data-cy="identification"]').type('101010')
        cy.get('[data-cy="gender_id"]').select('Femenino');
        cy.get('[data-cy="address"]').type('Calle 51 # 20 - 20');
        cy.get('[data-cy="telephone"]').type('3103105487');
        cy.get('[data-cy="email"]').type('laura@mail.com');
        cy.get('[data-cy="speciality"]').select('Medicina Géneral');
        cy.get('[data-cy="professional_card"]').type('ABC123456');
        cy.get('[data-cy="date"]').type('1990-05-20');


        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue guardada
        cy.contains('Médico creado exitosamente', ).should('be.visible');

        // Editar la cita
        cy.get('[data-cy="edit-appointment-button"]').first().click();
        cy.get('[data-cy="state"]').first().click();
        cy.get('[data-cy="save"]').click();

        // Verificar que la cita fue actualizada
        cy.contains('Médico actualizado exitosamente').should('be.visible');

        // Eliminar la cita
        cy.get('[data-cy="delete-appointment-button"]').first().click();
        cy.contains('Sí, eliminar').click();
        cy.contains('Médico eliminado exitosamente').should('be.visible');
    });
});
