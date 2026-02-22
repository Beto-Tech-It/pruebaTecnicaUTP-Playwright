import { Page } from '@playwright/test';

export class BasePage {

  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com'); // Todas las preguntas parten desde demoqa.com por eso eso comun entre todos.
    await this.page.waitForLoadState('domcontentloaded');//metodo que es más flexible, espera solo a que el HTML cargue sin preocuparse por anuncios o scripts externos que nunca terminan.   
  }
}