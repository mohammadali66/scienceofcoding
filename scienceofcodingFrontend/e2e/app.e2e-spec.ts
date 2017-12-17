import { ScienceofcodingFrontendPage } from './app.po';

describe('scienceofcoding-frontend App', () => {
  let page: ScienceofcodingFrontendPage;

  beforeEach(() => {
    page = new ScienceofcodingFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
