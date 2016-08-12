import { HeraldPage } from './app.po';

describe('herald App', function() {
  let page: HeraldPage;

  beforeEach(() => {
    page = new HeraldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
