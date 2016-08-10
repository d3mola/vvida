describe('Test create-event page', function() {
	var signUpTab, eventName, categoryName, description,location, venue, sponsor,
	 addButton, startDate, endDate;

	beforeEach(function() {
		browser.get('/users/login');
		signUpTab = element(by.repeater('tab in $mdTabsCtrl.tabs').row(1));
		browser.get('/user/profile/events');
		eventName = element(by.model('event.name'));
		categoryName = element(by.model('event.category_id'));
		description = element(by.model('event.description'));
		location = element(by.model('event.location'));
		venue = element(by.model('event.venue'));
		startDate = element(by.model('event.start_time'));
		endDate = element(by.model('event.end_time'));
		sponsor = element(by.model('event.sponsor'));
		addButton = browser.findElement(by.css('.add-button'));
		signUpTab.click();


	});

	it('should check title of loaded events page', function () {
		expect(browser.getTitle()).toEqual('Vvida');
	});

	it('should check if all components are present', function () {
		expect(eventName.isPresent()).toBe(true);
		expect(categoryName.isPresent()).toBe(true);
		expect(description.isPresent()).toBe(true);
		expect(location.isPresent()).toBe(true);
		expect(venue.isPresent()).toBe(true);
		expect(startDate.isPresent()).toBe(true);
		expect(endDate.isPresent()).toBe(true);
		expect(sponsor.isPresent()).toBe(true);
	});
});
