describe('Login user', function() {
    var email, password, signInBtn;

    beforeEach(function () {
        browser.get('/users/login');
        email = element(by.model('user.email'));
        password = element(by.model('user.password'));
        signInBtn = browser.findElement(by.css('.login-button'));
    });

    it('Should allow user with correct user credentials', function () {
        email.sendKeys('heavywaters@gmail.com');
        password.sendKeys('Stephen1');
        signInBtn.click().then(function () {
            browser.getCurrentUrl().then(function (url) {
                expect(/profile\/events/.test(url)).toBe(true);
            });
        });
    });
});

describe('Edit user Profile', function() {
    var username, fullName, city,
        country, gender, dob,
        updateUserDataBtn, erroMessage;

    beforeEach(function () {
        element(by.repeater('item in ownerMenu').row(0)).click().then(function() {
            username = element(by.model('userData.username'));
            fullName = element(by.model('userData.name'));
            city = element(by.model('userData.city'));
            dob = element(by.model('userData.dob'));
            country  = element(by.model('userData.country'));
            gender  = element(by.model('userData.gender'));
            erroMessage= element(by.binding('message'));
            updateUserDataBtn = browser.findElement(by.id('update-user-data'));
        });
    });

    it('User edit form should be visible', function() {
        expect(username.isDisplayed()).toBeTruthy();
        expect(fullName.isDisplayed()).toBeTruthy();
        expect(gender.isDisplayed()).toBeTruthy();
        expect(city.isDisplayed()).toBeTruthy();
        expect(country.isDisplayed()).toBeTruthy();
        expect(updateUserDataBtn.isDisplayed()).toBeTruthy();
    });

    it('Should not update user without username, full-name and city ', function() {
        username.sendKeys('Tobolowoski');
        fullName.sendKeys('Oduntan Oluwatobiloba Stephen');
        updateUserDataBtn.click().then(function() {
            expect(erroMessage.getText()).toBe('');
        });
    });

    it('Should update user profile with the correct', function() {
        username.sendKeys('Tobolowoski');
        fullName.sendKeys('Oduntan Oluwatobiloba Stephen');
        city.sendKeys('Lagos');
        country.sendKeys('Nigeria');
        dob.sendKeys('27/06/2000');
        gender.sendKeys('Male');
        updateUserDataBtn.click().then(function() {
            expect(erroMessage.getText()).toBe('You have successfully updated your' +
                ' profile. Click on the home button to get to vvida homepage.');
        });
    });

});
