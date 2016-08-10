describe('Test sign up page', function() {
    var signUpTab, email, password, errorMessage, submitButton, confirmPassword;

    beforeEach(function() {
        browser.get('/users/login');
        signUpTab = element(by.repeater('tab in $mdTabsCtrl.tabs').row(1));
        email = element(by.model('user.emailSignup'));
        password = element(by.model('user.passwordSignup'));
        errorMessage = element(by.binding('messageSignup'));
        confirmPassword = element(by.model('user.confirmPassword'));
        submitButton = browser.findElement(by.css('.sign-up-button'));
        signUpTab.click();
    });

    it('Should check if all components are present', function () {
        expect(signUpTab.isPresent()).toBe(true);
        expect(email.isPresent()).toBe(true);
        expect(password.isPresent()).toBe(true);
        expect(confirmPassword.isPresent()).toBe(true);
    });

    it('Should not create a user with an invalid mail', function () {
        email.sendKeys('Heavywater');
        password.sendKeys('**********');
        confirmPassword.sendKeys('**********');
        submitButton.click().then(function(data) {
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe('http://localhost:3000/users/login');
            })
        });
    });

    it('Should not create a user with password that has no number', function () {
        email.sendKeys('heavywater@gmail.com');
        password.sendKeys('Heavywater');
        confirmPassword.sendKeys('Heavywater');
        submitButton.click().then(function() {
            expect(errorMessage.getText()).toEqual('Your password need to contain both numbers and non-word characters');
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe('http://localhost:3000/users/login');
            })
        });
    });

    it('Should not create user with password that doesnt contain uppercase and lowercase alphabets', function () {
        email.sendKeys('heavywater@gmail.com');
        password.sendKeys('heavywater1');
        confirmPassword.sendKeys('heavywater1');
        submitButton.click().then(function() {
            expect(errorMessage.getText()).toEqual('Your password should contain uppercase and lower characters');
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe('http://localhost:3000/users/login');
            })
        });
    });

    it('Should not allow user to use password less than 8 characters', function () {
        email.sendKeys('heavywater@gmail.com');
        password.sendKeys('Steven1');
        confirmPassword.sendKeys('Steven1');
        submitButton.click().then(function() {
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe('http://localhost:3000/users/login');
            });
            expect(errorMessage.getText()).toEqual('Your password needs to have a length greater than 8 characters');
        });
    });

    it('Should create users with correct credentials', function () {
        email.sendKeys('heavywaters@gmail.com');
        password.sendKeys('Stephen1');
        confirmPassword.sendKeys('Stephen1');
        submitButton.click().then(function() {
            browser.getCurrentUrl().then(function(url) {
                expect(/profile\/events/.test(url)).toBe(true);
                element(by.css('[ng-click=\"$mdOpenMenu($event)\"]')).click().then(function () {
                    element(by.css('[ng-click=\"logout()\"]')).click();
                });
            });
        });
    });

    it('Should not create a user with email that\'s in use', function () {
        email.sendKeys('heavywaters@gmail.com');
        password.sendKeys('Stephen1');
        confirmPassword.sendKeys('Stephen1');
        submitButton.click().then(function() {
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe('http://localhost:3000/users/login');
            });
            expect(errorMessage.getText()).toEqual('Email already exists');
        });
    });
});