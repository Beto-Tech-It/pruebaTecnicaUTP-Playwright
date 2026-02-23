import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ModalsAlertsPage extends BasePage {

  // Modal
  private readonly smallModalBtn:  Locator;
  private readonly closeModalBtn:  Locator;

  // Alerts
  private readonly alertBtn:       Locator;
  private readonly timerAlertBtn:  Locator;
  private readonly confirmBtn:     Locator;
  private readonly promptBtn:      Locator;

  // Resultados
  private readonly confirmResult:  Locator;
  private readonly promptResult:   Locator;

  constructor(page: Page) {
    super(page);

    this.smallModalBtn  = page.locator('#showSmallModal');
    this.closeModalBtn  = page.locator('#closeSmallModal');
    this.alertBtn       = page.locator('#alertButton');
    this.timerAlertBtn  = page.locator('#timerAlertButton');
    this.confirmBtn     = page.locator('#confirmButton');
    this.promptBtn      = page.locator('#promtButton');
    this.confirmResult  = page.locator('#confirmResult');
    this.promptResult   = page.locator('#promptResult');
  }

  async goto(): Promise<void> {
    await this.navigate();              // va a demoqa.com - heredado de BasePage
    await this.goToAlertsWindows();     // va a Alerts, Frame & Windows
  }

  private async goToAlertsWindows(): Promise<void> {
    await this.page.click('a[href="/alertsWindows"]'); // selector css confirmado en devtools
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── MODAL ──
  async abrirSmallModal(): Promise<void> {
    await this.page.goto('https://demoqa.com/modal-dialogs'); // va directo a modal-dialogs
    await this.page.waitForLoadState('domcontentloaded');
    await this.smallModalBtn.click(); // abre el small modal
    await this.page.waitForSelector('.modal-content', { state: 'visible' }); // espera que el modal aparezca
  }

  async cerrarSmallModal(): Promise<void> {
    await this.closeModalBtn.click(); // cierra el small modal
    await this.page.waitForSelector('.modal-content', { state: 'hidden' }); // espera que el modal desaparezca
  }

  // ── ALERT SIMPLE ──
  async clickAlertYAceptar(): Promise<void> {
    // registra el listener ANTES de hacer click
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(); // acepta el alert
    });
    await this.alertBtn.click();
  }

  // ── TIMER ALERT ──
  async clickTimerAlertYAceptar(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(); // acepta el timer alert
    });
    await this.timerAlertBtn.click();
    await this.page.waitForEvent('dialog', { timeout: 8000 }); // espera hasta 8 segundos
  }

  // ── CONFIRM ALERT ──
  async clickConfirmYAceptar(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(); // acepta el confirm
    });
    await this.confirmBtn.click();
    await this.confirmResult.waitFor({ state: 'visible' }); // espera que aparezca el resultado
  }

  async clickConfirmYCancelar(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss(); // cancela el confirm
    });
    await this.confirmBtn.click();
    await this.confirmResult.waitFor({ state: 'visible' }); // espera que aparezca el resultado
  }

  async getConfirmResult(): Promise<string | null> {
    return await this.confirmResult.textContent(); // lee el resultado del confirm
  }

  // ── PROMPT ALERT ──
  async clickPromptYIngresar(texto: string): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(texto); // ingresa el texto en el prompt
    });
    await this.promptBtn.click();
    await this.promptResult.waitFor({ state: 'visible' }); // espera que aparezca el resultado
  }

  async getPromptResult(): Promise<string | null> {
    return await this.promptResult.textContent(); // lee el resultado del prompt
  }
}