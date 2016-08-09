// simple test to check the title of the browser.
describe('vvida landing page', function() {
  beforeEach(function() {
    browser.get('/#');
  });

  it('should check title of loaded landing page', function() {
    expect(browser.getTitle()).toEqual('Vvida');
  });

});
