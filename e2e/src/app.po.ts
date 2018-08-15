import { protractor, browser, by, element, $, $$, ElementFinder } from 'protractor';

export class AppPage
{
  GoToHomePage()
  {
    return browser.get('/');
  }

  public async SetLogin(email: string): Promise<void>
  {
    return browser.$('#auth-login-input').sendKeys(email);
  }
  public async SetPassword(password: string): Promise<void>
  {
    return browser.$('#auth-password-input').sendKeys(password);
  }

  public async ClickLogin(): Promise<void>
  {
    return element(by.id('auth-login-button')).click();
  }

  public async ClickLogout(): Promise<void>
  {
    return element(by.id('auth-logout-button')).click();
  }

  public async ClickFirstAddTabButton(): Promise<void>
  {
    return $('.add-tab').click();
  }

  public async PutTextInAddTabButton(text: string): Promise<void>
  {
    await $('.editable-once-input').sendKeys(text);
  }

  public async HitEnterInAddTabButton(): Promise<void>
  {
    await $('.editable-once-input').sendKeys(protractor.Key.ENTER);
  }

  public async AddTab(label: string): Promise<void>
  {
    await this.ClickFirstAddTabButton();
    await this.PutTextInAddTabButton(label);
    await this.HitEnterInAddTabButton();
  }

  public async FindTabByLabel(label: string): Promise<any>
  {
    return element(by.cssContainingText('.editable-tab', label));
  }


  public async Sleep(ms): Promise<void>
  {
    return browser.sleep(ms);
  }

  public async GetContentTabText(): Promise<string>
  {
    return element(by.className('content-tab')).getText();
  }

  public async GetLogin(): Promise<string>
  {
    return element(by.id('auth-login-input')).getAttribute('value');
  }

  public async GetSnackBarText(): Promise<string>
  {
    return $('.cdk-live-announcer-element').getText();
  }

  public async Login(email: string, password: string): Promise<void>
  {
    await this.SetLogin(email);
    await this.SetPassword(password);
    await this.ClickLogin();
  }

  public async LoginAsDemo(): Promise<void>
  {
    await this.SetLogin('demo@demo.com');
    await this.SetPassword('demo');
    await this.ClickLogin();
  }

  private async GetTabByIndex(index: number): Promise<ElementFinder>
  {
    return (await $$('.editable-tab'))[index];
  }

  public async RightClick(elem: ElementFinder): Promise<void>
  {
    return browser.actions().click(elem, protractor.Button.RIGHT).perform();
  }
  private async CloseAlert(): Promise<void>
  {
    await browser.switchTo().alert().accept();
  }

  public async FirstTabRightClick(): Promise<void>
  {
    const tab = await this.GetTabByIndex(1);
    await this.RightClick(tab);
    const deleteButton: ElementFinder = await $('#tab-contextmenu-delete');
    await deleteButton.click();
    await this.CloseAlert();
  }
  public async ClickDeleteInContextMenu(): Promise<void>
  {
    const deleteButton: ElementFinder = await $('#tab-contextmenu-delete');
    await deleteButton.click();

  }
  public async DeleteTab(tab): Promise<void>
  {
    await this.RightClick(tab);
    await this.ClickDeleteInContextMenu();
    await this.CloseAlert();
  }
  public async OpenContextMenuForTab(): Promise<void>
  {
      
  }

  public async GetFirstActiveTab(): Promise<ElementFinder>
  {
    return $('.editable-tab').$('a').$('.active-tab');
  }


  public async LogoutButtonIsVisible(): Promise<boolean>
  {
    return await $('#auth-logout-button').isPresent();
  }

  public async LoginButtonIsVisible(): Promise<boolean>
  {
    return await $('#auth-login-button').isPresent();
  }

  public async LogoutIfPossible(): Promise<void>
  {
    // if (await $('#auth-logout-button').isPresent())
    if (await this.LogoutButtonIsVisible())
    {
      await this.ClickLogout();
    }
    // await this.Sleep(500);
  }

  GetPasswordInputValue()
  {
    return element(by.id('auth-password-input')).getAttribute('value');
  }

  GetPageTitle()
  {
    return element(by.id('app-title')).getText();
  }
}
