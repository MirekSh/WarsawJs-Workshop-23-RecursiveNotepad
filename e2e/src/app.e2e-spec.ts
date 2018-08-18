import { AppPage } from './app.po';
import { DbSeed } from './dbSeed';

describe('workspace-project App', () =>
{
  let page: AppPage;
  const LOGIN = 'test2@test.com';
  const PASS = 'test';
  const LATENCY = 100;

  // if (0)
    beforeEach(async () =>
    {
      const seeder = new DbSeed();
      await seeder.Seed();
    });

  beforeEach(async () =>
  {
    page = new AppPage();
    await page.GoToHomePage();
    await page.LogoutIfPossible();
  });

  it('is seed succeeded?', async (done) =>
  {
    await page.Login('test2@test.com', 'test');
    await page.WaitForTabsLoad();
    expect(await page.TabsCount()).toBe(3);
    done();
  });

  it('should display app title', async () =>
  {
    expect(await page.GetPageTitle()).toEqual('Recursive Notepad');
  });

  it('should set login and password', async (done) =>
  {
    await page.SetLogin(LOGIN);
    expect(await page.GetLoginValue()).toBe(LOGIN);
    await page.SetPassword(PASS);
    await page.ClickLogin();
    await page.Sleep(30 * LATENCY);
    expect(await page.GetContentTabText()).toBe('_');
    done();
  });

  it('should login and logout without error', async () =>
  {
    await page.Login(LOGIN, PASS);
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
    const tab = await page.FindTabByLabel('a');
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
});
