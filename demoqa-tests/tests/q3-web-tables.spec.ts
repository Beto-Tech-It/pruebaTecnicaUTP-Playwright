import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pages/WebTablesPage';
import { webTablesData } from '../data/webTables.data';

test.describe('Q3 - Web Tables', () => {

  test('Añadir, buscar y editar un registro', async ({ page }) => {
    const webTables = new WebTablesPage(page);

    
    await webTables.goto();// Navegar a la página

     
    await webTables.agregarRegistro(webTablesData);//Añadir nuevo registro

     
    await webTables.buscarRegistro(webTablesData.email);//Buscar el registro creado por email

  
    const fila = page.locator('tr').filter({ hasText: webTablesData.email });//Verificar que el registro aparece en la tabla
    await expect(fila).toBeVisible();// espera que la fila con ese email sea visible
    console.log(`Registro encontrado: ${webTablesData.email}`);// Si el registro no se encuentra, el test fallará aquí

   
    await webTables.editarRegistro(webTablesData.email);//Editar el registro



    await expect(page.locator('#firstName')).toHaveValue(webTablesData.firstName);//Verificar que el formulario se abrió con los datos correctos
    console.log('Formulario de edición abierto correctamente');

 
    await webTables.guardarEdicion('99999');//Cambiar el salario y guardar


    const filaEditada = page.locator('tr').filter({ hasText: webTablesData.email });
    await expect(filaEditada).toContainText('99999');// Verificar que el cambio se refleja en la tabla y espera que la fila editada contenga el nuevo salario
    console.log('Registro editado correctamente');

    

    //await page.waitForTimeout(2000); //Pausa para ver nuevo salario editado

    // await webTables.eliminarRegistro(webTablesData.email); // descomentar para eliminar
  });

});