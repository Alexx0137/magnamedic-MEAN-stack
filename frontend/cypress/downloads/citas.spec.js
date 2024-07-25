describe('Gestión de citas', () => {
    it('Debe permitir agregar, editar, y eliminar una cita', () => {
        // Navega a la página de citas
        cy.visit('/citas'); // Reemplaza con la ruta real

        // Agregar una nueva cita
        cy.get('[data-cy="fecha"]').type('2024-07-15');
        cy.get('[data-cy="hora"]').type('10:00');
        cy.get('[data-cy="estado"]').select('Disponible');
        cy.get('[data-cy="especialidad"]').select('Cardiología');
        cy.get('[data-cy="medico"]').select('Dr. Smith');
        cy.get('[data-cy="paciente"]').select('Paciente 1');
        cy.get('[data-cy="guardar"]').click();

        // Verificar que la cita fue guardada
        cy.contains('La cita fue agendada').should('be.visible');

        // Editar la cita
        cy.get('[data-cy="editar"]').click();
        cy.get('[data-cy="estado"]').select('Cancelada');
        cy.get('[data-cy="guardar"]').click();

        // Verificar que la cita fue actualizada
        cy.contains('La cita ha sido actualizada').should('be.visible');

        // Eliminar la cita
        cy.get('[data-cy="eliminar"]').click();
        cy.contains('La cita ha sido eliminada').should('be.visible');
    });
});
