import { test, expect } from '@playwright/test';
import { RegistrationFormPage } from '../pages/RegistrationFormPage';
import { user } from '../data/usuario.data';

test.describe('Q1 - Formulario de Registro', () => {

  test('Llenar formulario y verificar modal de confirmación', async ({ page }) => {

    const form = new RegistrationFormPage(page);

    await form.goto(); // navegar la pagina del formulario de registro

    await form.fillPersonalInfo(user);//llenar el formulario con los datos del usuario definido en usuario.data.ts

    await form.selectDateOfBirth(user.dobDay, user.dobMonth, user.dobYear); //11 April 1989, Seleccionar fecha de nacimiento

    await form.selectHobby(); //agrega el hobby

    await form.submit();// envia el formulario

    
    const modalText = await form.getModalText();
    expect(modalText).toContain(`${user.firstName} ${user.lastName}`); // Verifica que el modal tiene el nombre completo
    console.log('Modal verificado correctamente');

   
  //await form.closeConfirmation(); // cerra el modal con el close pero no cierra xD
  });

});