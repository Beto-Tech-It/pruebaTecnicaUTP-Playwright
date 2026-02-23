import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SelectMenuPage extends BasePage {

  private readonly selectValue: Locator;//tipo locator para el contenedor del Select Value
  private readonly selectOne:   Locator;//tipo locator para el contenedor del Select One

  constructor(page: Page) {
    super(page);

    this.selectValue = page.locator('#withOptGroup'); // contenedor Select Value
    this.selectOne   = page.locator('#selectOne');    // contenedor Select One
  }

  async goto(): Promise<void> {
    await this.navigate();        // va a demoqa.com - heredado de BasePage
    await this.goToWidgets();     // va a la sección Widgets
    await this.goToSelectMenu();  // va a Select Menu
  }

  private async goToWidgets(): Promise<void> {
    await this.page.click('a[href="/widgets"]'); // selector css confirmado en devtools
    await this.page.waitForLoadState('domcontentloaded');
  }

  private async goToSelectMenu(): Promise<void> {
    await this.page.click('a[href="/select-menu"]'); // selector css confirmado en devtools
    await this.page.waitForLoadState('domcontentloaded');//es más flexible, espera solo a que el HTML cargue sin preocuparse por anuncios o scripts externos que nunca terminan.
  }

  async seleccionarValor(option: string): Promise<void> {
    await this.selectValue.click(); // abre el dropdown
    await this.page.getByText(option, { exact: true }).click(); // click en la opción exacta
  }

    async getSelectedValue(): Promise<string | null> {
    // lee el texto del valor seleccionado en Select Value
    return await this.selectValue.locator('[class*="singleValue"]').textContent();
  }
 
  async seleccionarUno(option: string): Promise<void> {
    await this.selectOne.click(); // abre el dropdown
    await this.page.getByText(option, { exact: true }).click(); // click en la opción exacta
  }

  async getSelectedOne(): Promise<string | null> {
    // lee el texto del valor seleccionado en Select One
    return await this.selectOne.locator('[class*="singleValue"]').textContent();
  }
}