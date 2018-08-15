import { AppPage } from './app.po';
import { FIRST_ROW_TABS_TITLES } from './mock.data';
import { ElementFinder } from 'protractor';

describe('workspace-project App', () =>
{
  let page: AppPage;
  const LATENCY = 100;

  beforeEach(async () =>
  {
    page = new AppPage();
    await page.GoToHomePage();
    await page.LogoutIfPossible();
  });

  it('should display app title', async () =>
  {
    expect(await page.GetPageTitle()).toEqual('Recursive Notepad');
  });

  it('should set login and password', async (done) =>
  {
    await page.SetLogin('demo@demo.com');
    expect(await page.GetLogin()).toBe('demo@demo.com');
    await page.SetPassword('demo');
    await page.ClickLogin();
    await page.Sleep(30 * LATENCY);
    expect(await page.GetContentTabText()).toBe('_');
    done();
  });

  it('should login and logout without error', async () =>
  {
    await page.Login('demo@demo.com', 'demo');
    await page.Sleep(15 * LATENCY);
    expect(await page.LogoutButtonIsVisible()).toBeTruthy();
    await page.LogoutIfPossible();
    expect(await page.LoginButtonIsVisible()).toBeTruthy();
  });

  it('should fail on invalid email', async () =>
  {
    await page.Login('non@existing.email', 'pwd');
    await page.Sleep(5 * LATENCY);
    const snackBarText = await page.GetSnackBarText();
    expect(snackBarText).toBe('User not exists');
  });

  it('should add entry', async (done) =>
  {
    await page.LoginAsDemo();
    await page.Sleep(3000);
    await page.AddTab('a');
    await page.AddTab('b');
    await page.AddTab('c');
    await page.Sleep(3000);
    done();
  });
  it('test', async (done) =>
  {
    await page.LoginAsDemo();
    await page.Sleep(1500);
    // await page.AddTab('a');
    
    let tab = await page.FindTabByLabel('a');
    await page.DeleteTab(tab);
    
    await page.Sleep(1500);
    done();
     tab = await page.FindTabByLabel('a');
    await page.DeleteTab(tab);
    
    await page.Sleep(1500);
    done();
  });
  it('test2', async (done) =>
  {
    await page.LoginAsDemo();
    await page.Sleep(1500);
    
    await page.AddTab('c');
    await page.DeleteTab(tab);

      done();
  });
  it('should click Tab context menu', async (done) =>
  {
      await page.LoginAsDemo();
      await page.Sleep(3000);
      // const firstTab: ElementFinder = await page.GetFirstActiveTab();
      // expect(firstTab.getText()).toBe(FIRST_ROW_TABS_TITLES[0]);
      await page.FirstTabRightClick();
      
      await page.Sleep(2000);
      
      done();
  });

  // describe('Page title', () =>
  // {
  //   it('should be Recursive Notepad initially', () =>
  //   {

  //   });

  //   it('should change after tab click', () =>
  //   {

  //   });
  // });

  // describe('Login', () =>
  // {

  // });
});
