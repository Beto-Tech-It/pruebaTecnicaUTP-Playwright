import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

interface Registro {
  firstName:  string;
  lastName:   string;
  email:      string;
  age:        string;
  salary:     string;
  department: string;
}
export class WebTablesPage extends BasePage {

  private readonly addBtn:      Locator;
  private readonly searchBox:   Locator;
  private readonly firstName:   Locator;
  private readonly lastName:    Locator;
  private readonly email:       Locator;
  private readonly age:         Locator;
  private readonly salary:      Locator;
  private readonly department:  Locator;
  private readonly submitBtn:   Locator;

  constructor(page: Page) {
    super(page);

    this.addBtn     = page.locator('#addNewRecordButton');
    this.searchBox  = page.locator('#searchBox');
    this.firstName  = page.locator('#firstName');
    this.lastName   = page.locator('#lastName');
    this.email      = page.locator('#userEmail');
    this.age        = page.locator('#age');
    this.salary     = page.locator('#salary');
    this.department = page.locator('#department');
    this.submitBtn  = page.locator('#submit');
  }

  async goto(): Promise<void> {
    await this.navigate();       // va a demoqa.com - heredado de BasePage
    await this.goToElements();   // va a la sección Elements
    await this.goToWebTables();  // va a Web Tables
  }

  private async goToElements(): Promise<void> {
    await this.page.click('a[href="/elements"]'); // selector css confirmado en devtools
    await this.page.waitForLoadState('domcontentloaded');
  }

  private async goToWebTables(): Promise<void> {
    await this.page.click('a[href="/webtables"]'); // selector css confirmado en devtools
    await this.page.waitForLoadState('domcontentloaded');
  }

  async agregarRegistro(data: Registro): Promise<void> {
    await this.addBtn.click(); // abre el modal del formulario
    await this.page.waitForSelector('#firstName', { state: 'visible' }); // espera que el formulario aparezca
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.age.fill(data.age);
    await this.salary.fill(data.salary);
    await this.department.fill(data.department);
    await this.submitBtn.click(); // guarda el registro
  }

  async buscarRegistro(email: string): Promise<void> {
    await this.searchBox.fill(email); // busca por email que es único
   await this.page.locator('tr').filter({ hasText: email }).waitFor({ state: 'visible' }); // espera que la fila con ese email aparezca
}

  async editarRegistro(email: string): Promise<void> {
    // busca la fila tr que contenga ese email y hace click en Edit
    const fila = this.page.locator('tr').filter({ hasText: email });
    await fila.locator('[title="Edit"]').click();
    await this.page.waitForSelector('#firstName', { state: 'visible' }); // espera que el formulario abra
  }
  async guardarEdicion(nuevoSalario: string): Promise<void> {
  // limpia el campo salary y pone el nuevo valor
  await this.salary.clear();
  await this.salary.fill(nuevoSalario);
  await this.submitBtn.click(); // guarda los cambios
  await this.page.waitForSelector('#firstName', { state: 'hidden' }); // espera que el formulario se cierre
}

  // async eliminarRegistro(email: string): Promise<void> {
  //   const fila = this.page.locator('tr').filter({ hasText: email });
  //   await fila.locator('[title="Delete"]').click();
  // }

  // async verificarEliminado(email: string): Promise<boolean> {
  //   const fila = this.page.locator('tr').filter({ hasText: email });
  //   return await fila.isHidden();
  // }
}