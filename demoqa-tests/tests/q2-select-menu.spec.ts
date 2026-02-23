import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../pages/SelectMenuPage';
import { selectMenuData } from '../data/selectMenu.data';

test.describe('Q2 - Select Menu', () => {

  test('Seleccionar opciones y validar selecciones', async ({ page }) => {
    const selectMenu = new SelectMenuPage(page);

    
    await selectMenu.goto(); // navegacion a la página de Select Menu

    await selectMenu.seleccionarValor(selectMenuData.selectValue);// Seleccionar Group 1, option 1 en Select Value

    
    const selectedValue = await selectMenu.getSelectedValue();
    expect(selectedValue).toBe(selectMenuData.selectValue);// Validar que el valor se refleja correctamente
    console.log(`Select Value verificado: "${selectedValue}"`);


    await selectMenu.seleccionarUno(selectMenuData.selectOne); //Seleccionar Mr. en Select One

 
    const selectedOne = await selectMenu.getSelectedOne();
    expect(selectedOne).toBe(selectMenuData.selectOne); //Validar que el valor se refleja correctamente
    console.log(`Select One verificado: "${selectedOne}"`);
  });

});