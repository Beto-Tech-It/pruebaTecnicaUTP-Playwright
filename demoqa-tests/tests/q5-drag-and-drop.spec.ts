import { test, expect } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';

test.describe('Q5 - Drag and Drop', () => {

  test('Drag and Drop: verificar texto y color', async ({ page }) => {
    const droppable = new DroppablePage(page);

   
    await droppable.goto(); //  Navegar

    
    const textoInicial = await droppable.getDroppableText();
    expect(textoInicial?.trim()).toBe('Drop Here');//  Verificar texto inicial
    console.log(`Texto inicial: "${textoInicial?.trim()}"`);

    
    await droppable.dragAndDrop();// Realizar drag and drop

    
    await page.waitForTimeout(500);
    const textoFinal = await droppable.getDroppableText();
    expect(textoFinal?.trim()).toBe('Dropped!');// Esperar y verificar que el texto cambió
    console.log(`Texto final: "${textoFinal?.trim()}"`);

    
    const color = await droppable.getDroppableColor();
    console.log(`Color después del drop: ${color}`);// Verificar color azul 
  });

});

//Error!!! No me sale.