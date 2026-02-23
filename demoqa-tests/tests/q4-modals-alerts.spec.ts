import { test, expect } from '@playwright/test';
import { ModalsAlertsPage } from '../pages/ModalsAlertsPage';
import { modalsAlertsData } from '../data/modalsAlerts.data';

test.describe('Q4 - Modales y Alertas', () => {

  test('Abrir y cerrar Small Modal', async ({ page }) => {
    const modals = new ModalsAlertsPage(page);

    
    await modals.goto(); //  Navegar

    
    await modals.abrirSmallModal();// Abrir el small modal
    await expect(page.locator('.modal-content')).toBeVisible();// Esperar que el modal esté visible
    console.log('Small Modal abierto correctamente');

    
    await modals.cerrarSmallModal();//Cerrar el small modal
    await expect(page.locator('.modal-content')).not.toBeVisible();// Esperar que el modal ya no esté visible
    console.log('Small Modal cerrado correctamente');
  });

  test('Alert simple: aceptar', async ({ page }) => {
    const modals = new ModalsAlertsPage(page);

   
    await modals.goto(); //  Navegar a alerts
    await page.goto('https://demoqa.com/alerts');
    await page.waitForLoadState('domcontentloaded');

    
    await modals.clickAlertYAceptar(); //Click y aceptar alert
    console.log('Alert simple aceptado correctamente');
  });

  test('Confirm alert: aceptar y cancelar', async ({ page }) => {
    const modals = new ModalsAlertsPage(page);

 
    await modals.goto();//Navegar a alerts
    await page.goto('https://demoqa.com/alerts');
    await page.waitForLoadState('domcontentloaded');

  
    await modals.clickConfirmYAceptar();//Aceptar el confirm
    const resultOk = await modals.getConfirmResult();
    expect(resultOk).toContain('Ok');
    console.log(`Confirm aceptado: "${resultOk}"`);

   
    await modals.clickConfirmYCancelar();//Cancelar el confirm
    const resultCancel = await modals.getConfirmResult();
    expect(resultCancel).toContain('Cancel');
    console.log(`Confirm cancelado: "${resultCancel}"`);
  });

  test('Prompt alert: ingresar texto y verificar', async ({ page }) => {
    const modals = new ModalsAlertsPage(page);

    
    await modals.goto();//Navegar a alerts
    await page.goto('https://demoqa.com/alerts');
    await page.waitForLoadState('domcontentloaded');

    
    await modals.clickPromptYIngresar(modalsAlertsData.promptText);// Ingresar texto en el prompt

    
    const resultPrompt = await modals.getPromptResult();
    expect(resultPrompt).toContain(modalsAlertsData.promptText);//Verificar que el texto ingresado aparece en la página
    console.log(`Prompt verificado: "${resultPrompt}"`);
  });

});