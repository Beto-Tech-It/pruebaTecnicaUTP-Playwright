import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DroppablePage extends BasePage {

  private readonly draggable: Locator;
  private readonly droppable: Locator;

  constructor(page: Page) {
    super(page);

    this.draggable = page.locator('#simpleDropContainer #draggable');
    this.droppable = page.locator('#simpleDropContainer #droppable');
  }

  async goto(): Promise<void> {
    await this.navigate();         // va a demoqa.com - heredado de BasePage
    await this.goToInteractions(); // va a la sección Interactions
    await this.goToDroppable();    // va a Droppable
  }

  private async goToInteractions(): Promise<void> {
    await this.page.click('a[href="/interaction"]');
    await this.page.waitForLoadState('domcontentloaded');
  }

  private async goToDroppable(): Promise<void> {
    await this.page.click('a[href="/droppable"]');
    await this.draggable.waitFor({ state: 'visible' }); // espera que el elemento esté listo
  }

  async dragAndDrop(): Promise<void> {
    // scroll para asegurar que ambos elementos estén visibles
    await this.draggable.scrollIntoViewIfNeeded();

    const dragBounds = await this.draggable.boundingBox();
    const dropBounds = await this.droppable.boundingBox();

    if (!dragBounds || !dropBounds) {
      throw new Error('No se pudieron obtener las coordenadas');
    }

    const dragX = dragBounds.x + dragBounds.width / 2;
    const dragY = dragBounds.y + dragBounds.height / 2;
    const dropX = dropBounds.x + dropBounds.width / 2;
    const dropY = dropBounds.y + dropBounds.height / 2;

    // movimiento lento que jQuery UI pueda detectar
    await this.page.mouse.move(dragX, dragY, { steps: 5 });
    await this.page.mouse.down();
    await this.page.waitForTimeout(300); // pausa antes de mover
    await this.page.mouse.move(dragX, dragY - 1, { steps: 3 });
    await this.page.mouse.move(dropX, dropY, { steps: 30 });
    await this.page.waitForTimeout(300); // pausa antes de soltar
    await this.page.mouse.up();
  }

  async getDroppableText(): Promise<string | null> {
    return await this.droppable.textContent();
  }

  async getDroppableColor(): Promise<string> {
    return await this.droppable.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
  }
}

//Error!!! No me sale.