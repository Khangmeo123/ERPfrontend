import { browser } from 'protractor';
import { PaymentMethodPage } from './paymentMethod.po'

describe('Sign Up tests', () => {
    let page: PaymentMethodPage;

    beforeEach(()=>{
    
        page = new PaymentMethodPage;
        page.navigateTo();
        
    });
    // it('Sign up page should be invalid',()=>{
    //     page.getNameTextBox().sendKeys('');
    //     let form =  page.getForm().getAttribute('class');
    //     expect(form).toContain('ng-invalid');
    // });

    // it('Sign up page should be invalid',()=>{
    //     page.getEmailTextBox().sendKeys('');
    //     let form =  page.getForm().getAttribute('class');
    //     expect(form).toContain('ng-invalid');
    // });

    // it('Sign up page should be invalid',()=>{
    //     page.getPasswordTextBox().sendKeys('');
    //     let form =  page.getForm().getAttribute('class');
    //     expect(form).toContain('ng-invalid');
    // });
    // it('Sign up page should be invalid',()=>{
    //     page.getAddressTextBox().sendKeys('');
    //     let form =  page.getForm().getAttribute('class');
    //     expect(form).toContain('ng-invalid');
    // });
    // it('Sign up page should be invalid',()=>{
    //     page.getTelTextBox().sendKeys('');
    //     let form =  page.getForm().getAttribute('class');
    //     expect(form).toContain('ng-invalid');
    // });
    // it('Sign up page should be valid',()=>{
    //     page.getNameTextBox().sendKeys('Khang meo');
    //     page.getEmailTextBox().sendKeys('khangmeo@gmail.com');
    //     page.getPasswordTextBox().sendKeys('meomeomeo');
    //     page.getAddressTextBox().sendKeys('hoang duong son cong ung hoa ha noi');
    //     page.getTelTextBox().sendKeys('0929076099');
    //     let form = page.getForm().getAttribute('class');
    //     expect(form).toContain('ng-valid');
    //     page.getBtnSubmit().click();
    //     expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    // });


})