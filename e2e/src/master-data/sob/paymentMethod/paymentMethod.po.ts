import { browser, by, element } from 'protractor';

export class PaymentMethodPage {
    navigateTo() {
        return browser.get('master-data/sob/payment-method');
    }


    /* Get element in page action*/

    /* add a uom group*/
    getBtnAdd() {

        return element(by.xpath('//button[@data-qe-id="button-add"]'));
    }
    getBtnClear() {
        return element(by.xpath('//button[@data-qe-id="button-clear"]'));
    }

    // get Input in add action
    getInputCode() {
        /* Length valid 1-2*/
        return element(by.xpath('//input[@data-qe-id="dialog-form-code"]'));
    }
    getInputName() {
        return element(by.xpath('//input[@data-qe-id="dialog-form-name"]'));
    }
    getInputDescription() {
        return element(by.xpath('//textarea[@data-qe-id="dialog-form-description"]'));
    }

    //button in add and edit action
    getBtnSave() {
        return element(by.xpath('//button[@data-qe-id="dialog-button-save"]'));
    }
    getBtnCancel() {
        return element(by.xpath('//button[@data-qe-id="dialog-button-cancel"]'));
    }
    getBtnDelete() {
        return element(by.xpath('//button[@data-qe-id="dialog-button-delete"]'));
    }
    getBtnConfirmDelete(){
        let ele =  element.all(by.xpath('//mwl-confirmation-popover-window/div/div/div/div')).get(1);
        return ele.element(by.tagName('button'));
    }
    

    //get Error
    getErrorName() {
        return element(by.xpath('//app-error[@data-qe-id="dialog-error-name"]'));
    }
    getErrorCode() {
        return element(by.xpath('//app-error[@data-qe-id="dialog-error-code"]'));
    }
    //





    /* FrontEnd not Done*/

    getSortCode() {
        return element(by.xpath('//th[@data-qe-id="table-thead-code"]'));
    }
    getSortName() {
        return element(by.xpath('//th[@data-qe-id="table-thead-name"]'));
    }
    getSortDescription() {
        return element(by.xpath('//th[@data-qe-id="table-thead-description""]'));
    }


    //get Row
    getCodeRow1() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-0"]/td')).get(0);
    }
    getNameRow1() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-0"]/td')).get(1);
    }
    getDescriptionRow1() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-0"]/td')).get(2);
    }
    getCodeRow2() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-1"]/td')).get(0);
    }
    getNameRow2() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-1"]/td')).get(1);
    }
    getDescriptionRow2() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-1"]/td')).get(2);
    }
    getCodeRow3() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-2"]/td')).get(0);
    }
    getNameRow3() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-2"]/td')).get(1);
    }
    getDescriptionRow3() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-2"]/td')).get(2);
    }
    getCodeRow4() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-3"]/td')).get(0);
    }
    getNameRow4() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-3"]/td')).get(1);
    }
    getDescriptionRow4() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-3"]/td')).get(2);
    }


    // about input search filter
    getInputSearchCode() {
        return element(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/input'));
    }

    getInputSearchName() {
        return element(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/input'));
    }
    getInputSearchDescription() {
        return element(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/input'));
    }

    //about dropdown to select searchWay
    getWaySearchCode() {
        return element(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/div/button'));
    }

    getWaySearchName() {
        return element(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/div/button'));
    }
    getWaySearchDescription() {
        return element(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/div/button'));
    }




    getResultSearch() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-0"]'));
    }

    getResultSearchCode() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-0"]/td')).get(0);
    }
    getResultSearchName() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-0"]/td')).get(1);
    }
    getResultSearchDescription() {
        return element.all(by.xpath('//tr[@data-qe-id="table-tbody-row-0"]/td')).get(2);
    }
    /* this method error */
   
    // get row 1 row 2 row 3
    getRow1() {
        return element(by.css("[data-qe-id='table-tbody-row-0']"));
    }
    getRow2() {
        return element(by.css("[data-qe-id='table-tbody-row-1']"));
    }
    getRow3() {
        return element(by.css("[data-qe-id='table-tbody-row-2']"));
    }

    
    //get toast show message acction success
    getSuccess(){
        return element(by.id('toast-container'));
    }

    //GET THE WAY TO SEARCH NAME
    getSearchNameEqual() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/div/ul/li')).get(0);
    }
    getSearchNameNotEqual() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/div/ul/li')).get(1);
    }
    getSearchNameStartWith() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/div/ul/li')).get(2);
    }
    getSearchNameEndWith() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/div/ul/li')).get(3);
    }
    getSearchNameContain() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/div/ul/li')).get(4);
    }
    getSearchNameNotContain() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-name"]/div/div/div/div/ul/li')).get(5);
    }



    //GET THE WAY TO SEARCH CODE
    getSearchCodeEqual() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/div/ul/li')).get(0);
    }
    getSearchCodeNotEqual() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/div/ul/li')).get(1);
    }
    getSearchCodeStartWith() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/div/ul/li')).get(2);
    }
    getSearchCodeEndWith() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/div/ul/li')).get(3);
    }
    getSearchCodeContain() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/div/ul/li')).get(4);
    }
    getSearchCodeNotContain() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-code"]/div/div/div/div/ul/li')).get(5);
    }



    //GET THE WAY TO SEARCH DESCRIPTION
    getSearchDescriptionEqual() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/div/ul/li')).get(0);
    }
    getSearchDescriptionNotEqual() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/div/ul/li')).get(1);
    }
    getSearchDescriptionStartWith() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/div/ul/li')).get(2);
    }
    getSearchDescriptionEndWith() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/div/ul/li')).get(3);
    }
    getSearchDescriptionContain() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/div/ul/li')).get(4);
    }
    getSearchDescriptionNotContain() {
        return element.all(by.xpath('//app-advanced-filters[@data-qe-id="table-thead-filter-description"]/div/div/div/div/ul/li')).get(5);
    }

}