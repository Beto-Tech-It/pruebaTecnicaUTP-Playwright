// en el page va los selectores y metodos para interactuar con la pagina, en este caso el formulario de registro
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

interface usuario {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export class RegistrationFormPage extends BasePage {
  private readonly firstName:     Locator;
  private readonly lastName:      Locator;
  private readonly email:         Locator;
  private readonly mobile:        Locator;
  private readonly genderMale:    Locator;
  private readonly dobInput:      Locator;//abrir fecha de nacimiento
  private readonly monthSelect:   Locator;
  private readonly yearSelect:    Locator;
  private readonly hobbySports:   Locator;
  private readonly submitBtn:     Locator;
  private readonly modal:         Locator;
  //private readonly closeModalBtn: Locator;

  constructor(page: Page) {
    
    super(page);

    this.firstName     = page.locator('#firstName');
    this.lastName      = page.locator('#lastName');
    this.email         = page.locator('#userEmail');
    this.mobile        = page.locator('#userNumber');
    this.genderMale    = page.locator('label[for="gender-radio-1"]');
    this.dobInput      = page.locator('#dateOfBirthInput');//Abrir el selector de fecha
    this.monthSelect   = page.locator('.react-datepicker__month-select');
    this.yearSelect    = page.locator('.react-datepicker__year-select');
    this.hobbySports   = page.locator('label[for="hobbies-checkbox-1"]');
    this.submitBtn     = page.locator('#submit');
    this.modal         = page.locator('.modal-content');
    //this.closeModalBtn = page.locator('#closeLargeModal');
  }

  async goto(): Promise<void> {// Método para navegar a la página de registro
  await this.navigate();// Navega a la página principal
  await this.goToForms();// Navega a la sección de Forms
  await this.goToPracticeForm();// Navega a la página de Practice Form
}

private async goToForms(): Promise<void> {
  await this.page.click('a[href="/forms"]'); // selector css por atributo href
  await this.page.waitForLoadState('domcontentloaded');//es más flexible, espera solo a que el HTML cargue sin preocuparse por anuncios o scripts externos que nunca terminan.
}

private async goToPracticeForm(): Promise<void> {
  await this.page.click('a[href="/automation-practice-form"]');// selector css por atributo href
  await this.page.waitForSelector('#firstName', { state: 'visible' });
  //await expect(this.page).toHaveURL('https://demoqa.com/automation-practice-form'); opcional, pero ayuda a asegurar que estamos en la página correcta antes de interactuar con los elementos.
}

  async fillPersonalInfo(data: usuario): Promise<void> {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.mobile.fill(data.mobile);//fill solo se utiliza con strings
    await this.genderMale.click();
  }

  async selectDateOfBirth(day: string, month: string, year: string): Promise<void> {
    await this.dobInput.click();
    await this.page.waitForSelector('.react-datepicker', { state: 'visible' });
    await this.monthSelect.selectOption({ label: month });// asegura que seleccionamos por el texto visible del mes, no por el valor o el índice, lo que hace el test más robusto ante cambios en el orden o valores de los meses.
    await this.yearSelect.selectOption(year);
    await this.page.locator(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`).click();// Selecciona el día del mes actual en el datepicker (formato con 0 inicial), excluyendo fechas fuera del mes para evitar clicks incorrectos.
  }


  async selectHobby(): Promise<void> {
    await this.hobbySports.click();
  }

  async submit(): Promise<void> {
    await this.submitBtn.scrollIntoViewIfNeeded();// demoqa tiene anuncios que tapan el botón Submit, scroll garantiza que esté visible antes del click
    await this.submitBtn.click();
  }

  async getModalText(): Promise<string | null> {
    await this.modal.waitFor({ state: 'visible' });// espera que el modal aparezca y retorna su texto
    return await this.modal.textContent();
  }

  // async closeConfirmation(): Promise<void> {
  //   await this.closeModalBtn.click();
  //   await this.modal.waitFor({ state: 'hidden' });
  // }
}