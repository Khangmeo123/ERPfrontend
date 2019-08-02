import { UomSearchEntity } from './../../../../_backend/uom/uom.searchentity';
import { UomEntity } from './../../../../_backend/uom/uom.entity';
import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { CoaSearchEntity } from './../../../../_backend/coa/coa.searchentity';
import { CoaEntity } from 'src/app/_modules/master-data/_backend/coa/coa.entity';
import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { LegalItemDetailService } from './item-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { EnumEntity } from 'src/app/_helpers/entity';

@Component({
  selector: 'app-detail-item-of-legal-entity',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  providers: [LegalItemDetailService],
})
export class LegalItemDetailComponent implements OnInit, OnDestroy {

  pageTitle = translate('legalItemDetail.header.title');
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;
  isOpenTab4: boolean = false;
  isOpenTab5: boolean = false;
  isOpenTab6: boolean = false;
  isOpenModalItemDiscount: boolean = false;
  isOpenModalTransformationUnit: boolean = false;
  isOpenModalItemMaterial: boolean = false;
  redirectUrl: string;
  legalItemDetailSubs: Subscription = new Subscription();
  legalItemDetailForm: FormGroup;
  discountTypeList: EnumEntity[];
  // itemMaterialForm:
  itemDiscountForm: FormGroup;
  indexItemDiscount: number;

  // itemMaterialForm:
  itemMaterialForm: FormGroup;
  indexItemMaterial: number;

  // inventoryAccount:
  invetoryAccountIds: CoaEntity[];
  invetoryAccountExceptIds: CoaEntity[];
  invetoryAccountSearchEntity: CoaSearchEntity = new CoaSearchEntity();
  invetoryAccountTyping: Subject<CoaSearchEntity> = new Subject();

  // returnAccount:
  returnAccountIds: CoaEntity[];
  returnAccountExceptIds: CoaEntity[];
  returnAccountSearchEntity: CoaSearchEntity = new CoaSearchEntity();
  returnAccountTyping: Subject<CoaSearchEntity> = new Subject();

  // saleAllowancesAccount:
  saleAllowancesAccountIds: CoaEntity[];
  saleAllowancesAccountExceptIds: CoaEntity[];
  saleAllowancesAccountSearchEntity: CoaSearchEntity = new CoaSearchEntity();
  saleAllowancesAccountTyping: Subject<CoaSearchEntity> = new Subject();

  // expenseAccount:
  expenseAccountIds: CoaEntity[];
  expenseAccountExceptIds: CoaEntity[];
  expenseAccountSearchEntity: CoaSearchEntity = new CoaSearchEntity();
  expenseAccountTyping: Subject<CoaSearchEntity> = new Subject();

  // revenueAccount:
  revenueAccountIds: CoaEntity[];
  revenueAccountExceptIds: CoaEntity[];
  revenueAccountSearchEntity: CoaSearchEntity = new CoaSearchEntity();
  revenueAccountTyping: Subject<CoaSearchEntity> = new Subject();

  // discountAccount:
  discountAccountIds: CoaEntity[];
  discountAccountExceptIds: CoaEntity[];
  discountAccountSearchEntity: CoaSearchEntity = new CoaSearchEntity();
  discountAccountTyping: Subject<CoaSearchEntity> = new Subject();

  // item:
  itemIds: ItemEntity[];
  itemExceptIds: ItemEntity[];
  itemSearchEntity: ItemSearchEntity = new ItemSearchEntity();
  itemTyping: Subject<ItemSearchEntity> = new Subject();

  // uom:
  uomIds: UomEntity[];
  uomExceptIds: UomEntity[];
  uomSearchEntity: UomSearchEntity = new UomSearchEntity();
  uomTyping: Subject<UomSearchEntity> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private legalItemDetailService: LegalItemDetailService,
    private genaralService: GeneralService,
    private router: Router,
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.legalItemDetailService.getLegalItemDetail(params.id);
      });

    const itemDetailFormSub = this.legalItemDetailService.legalItemDetailForm.subscribe(res => {
      if (res) {
        this.legalItemDetailForm = res;
      }
    });

    const discountTypeListSub = this.legalItemDetailService.discountTypeList.subscribe(res => {
      if (res) {
        this.discountTypeList = res;
      }
    });

    const itemDiscountForm = this.legalItemDetailService.itemDiscountForm.subscribe(res => {
      if (res) {
        this.itemDiscountForm = res;
      }
    });

    const itemMaterialForm = this.legalItemDetailService.itemMaterialForm.subscribe(res => {
      if (res) {
        this.itemMaterialForm = res;
      }
    });

    // invetoryAccount:
    const inventoryAccountSub = this.legalItemDetailService.invetoryAccountList.subscribe(res => {
      if (res) {
        this.invetoryAccountIds = res.ids;
        this.invetoryAccountExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchInvetoryAccount(this.invetoryAccountTyping);

    // returnAccount:
    const returnAccountSub = this.legalItemDetailService.returnAccountList.subscribe(res => {
      if (res) {
        this.returnAccountIds = res.ids;
        this.returnAccountExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchReturnAccount(this.returnAccountTyping);

    // saleAllowancesAccount:
    const saleAllowancesAccountSub = this.legalItemDetailService.salesAllowancesAccountList.subscribe(res => {
      if (res) {
        this.saleAllowancesAccountIds = res.ids;
        this.saleAllowancesAccountExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchSalesAllowancesAccount(this.saleAllowancesAccountTyping);

    // expenseAccount:
    const expenseAccountSub = this.legalItemDetailService.expenseAccountList.subscribe(res => {
      if (res) {
        this.expenseAccountIds = res.ids;
        this.expenseAccountExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchExpenseAccount(this.expenseAccountTyping);

    // expenseAccount:
    const revenueAccountSub = this.legalItemDetailService.revenueAccountList.subscribe(res => {
      if (res) {
        this.revenueAccountIds = res.ids;
        this.revenueAccountExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchRevenueAccount(this.revenueAccountTyping);

    // discountAccount:
    const discountAccount = this.legalItemDetailService.discountAccountList.subscribe(res => {
      if (res) {
        this.discountAccountIds = res.ids;
        this.discountAccountExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchDiscountAccount(this.discountAccountTyping);

    // itemList:
    const itemListSub = this.legalItemDetailService.itemList.subscribe(res => {
      if (res) {
        this.itemIds = res.ids;
        this.itemExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchItem(this.itemTyping);

    // uomList:
    const uomListSub = this.legalItemDetailService.uomList.subscribe(res => {
      if (res) {
        this.uomIds = res.ids;
        this.uomExceptIds = res.exceptIds;
      }
    });
    this.legalItemDetailService.typingSearchUom(this.uomTyping);

    this.legalItemDetailSubs.add(itemDetailFormSub).add(inventoryAccountSub).add(returnAccountSub).add(itemMaterialForm)
      .add(saleAllowancesAccountSub).add(expenseAccountSub).add(revenueAccountSub).add(discountAccount)
      .add(itemDiscountForm).add(discountTypeListSub).add(itemListSub).add(uomListSub);
  }

  ngOnInit() {
    const currentUrl = this.router.url.split('/')[3];
    switch (currentUrl) {
      case 'item-of-legal-entity':
        this.redirectUrl = '/master-data/legal-entity/item-of-legal-entity';
        break;
      case 'item-group':
        this.redirectUrl = '/master-data/legal-entity/item-group';
        break;
    }
  }

  ngOnDestroy() {
    this.legalItemDetailSubs.unsubscribe();
  }

  saveLegalItemDetail() {
    if (!this.legalItemDetailForm.valid) {
      console.log(this.legalItemDetailForm.value);
    } else {
      this.legalItemDetailService.updateLegalItemDetail(this.legalItemDetailForm.value).then(res => {
        if (res) {
          this.router.navigate([this.redirectUrl]);
        }
      });
    }
  }

  cancelLegalItemDetail() {
    this.router.navigate([this.redirectUrl]);
  }

  // invetoryAccount:
  openInvetoryAccount() {
    this.invetoryAccountSearchEntity = new CoaSearchEntity();
    if (this.legalItemDetailForm.get('inventoryAccountId').value) {
      this.invetoryAccountSearchEntity.ids.push(this.legalItemDetailForm.get('inventoryAccountId').value);
    }
    this.legalItemDetailService.getInvetoryAccountList(this.invetoryAccountSearchEntity);
  }

  typingSearchInvetoryAccount(event: string) {
    this.invetoryAccountSearchEntity = new CoaSearchEntity();
    this.invetoryAccountSearchEntity.accountName.startsWith = event;
    if (this.legalItemDetailForm.get('inventoryAccountId').value) {
      this.invetoryAccountSearchEntity.ids.push(this.legalItemDetailForm.get('inventoryAccountId').value);
    }
    this.invetoryAccountTyping.next(this.invetoryAccountSearchEntity);
  }

  // returnAccount:
  openReturnAccount() {
    this.returnAccountSearchEntity = new CoaSearchEntity();
    if (this.legalItemDetailForm.get('returnAccountId').value) {
      this.returnAccountSearchEntity.ids.push(this.legalItemDetailForm.get('returnAccountId').value);
    }
    this.legalItemDetailService.getReturnAccountList(this.returnAccountSearchEntity);
  }

  typingSearchReturnAccount(event: string) {
    this.returnAccountSearchEntity = new CoaSearchEntity();
    this.returnAccountSearchEntity.accountName.startsWith = event;
    if (this.legalItemDetailForm.get('returnAccountId').value) {
      this.returnAccountSearchEntity.ids.push(this.legalItemDetailForm.get('returnAccountId').value);
    }
    this.returnAccountTyping.next(this.returnAccountSearchEntity);
  }

  // saleAllowancesAccount:
  openSaleAllowancesAccount() {
    this.saleAllowancesAccountSearchEntity = new CoaSearchEntity();
    if (this.legalItemDetailForm.get('salesAllowancesAccountId').value) {
      this.saleAllowancesAccountSearchEntity.ids.push(this.legalItemDetailForm.get('salesAllowancesAccountId').value);
    }
    this.legalItemDetailService.getSalesAllowancesAccountList(this.saleAllowancesAccountSearchEntity);
  }

  typingSearchSaleAllowancesAccount(event: string) {
    this.saleAllowancesAccountSearchEntity = new CoaSearchEntity();
    this.saleAllowancesAccountSearchEntity.accountName.startsWith = event;
    if (this.legalItemDetailForm.get('salesAllowancesAccountId').value) {
      this.saleAllowancesAccountSearchEntity.ids.push(this.legalItemDetailForm.get('salesAllowancesAccountId').value);
    }
    this.saleAllowancesAccountTyping.next(this.saleAllowancesAccountSearchEntity);
  }

  // expneseAccount:
  openExpenseAccount() {
    this.expenseAccountSearchEntity = new CoaSearchEntity();
    if (this.legalItemDetailForm.get('expenseAccountId').value) {
      this.expenseAccountSearchEntity.ids.push(this.legalItemDetailForm.get('expenseAccountId').value);
    }
    this.legalItemDetailService.getExpenseAccountList(this.expenseAccountSearchEntity);
  }

  typingSearchExpenseAccount(event: string) {
    this.expenseAccountSearchEntity = new CoaSearchEntity();
    this.expenseAccountSearchEntity.accountName.startsWith = event;
    if (this.legalItemDetailForm.get('expenseAccountId').value) {
      this.expenseAccountSearchEntity.ids.push(this.legalItemDetailForm.get('expenseAccountId').value);
    }
    this.expenseAccountTyping.next(this.expenseAccountSearchEntity);
  }

  // revenueAccount:
  openRevenueAccount() {
    this.revenueAccountSearchEntity = new CoaSearchEntity();
    if (this.legalItemDetailForm.get('revenueAccountId').value) {
      this.revenueAccountSearchEntity.ids.push(this.legalItemDetailForm.get('revenueAccountId').value);
    }
    this.legalItemDetailService.getRevenueAccountList(this.revenueAccountSearchEntity);
  }

  typingSearchRevenueAccount(event: string) {
    this.revenueAccountSearchEntity = new CoaSearchEntity();
    this.revenueAccountSearchEntity.accountName.startsWith = event;
    if (this.legalItemDetailForm.get('revenueAccountId').value) {
      this.revenueAccountSearchEntity.ids.push(this.legalItemDetailForm.get('revenueAccountId').value);
    }
    this.revenueAccountTyping.next(this.revenueAccountSearchEntity);
  }

  // discountAccount:
  openDiscountAccount() {
    this.discountAccountSearchEntity = new CoaSearchEntity();
    if (this.legalItemDetailForm.get('discountAccountId').value) {
      this.discountAccountSearchEntity.ids.push(this.legalItemDetailForm.get('discountAccountId').value);
    }
    this.legalItemDetailService.getDiscountAccountList(this.discountAccountSearchEntity);
  }

  typingSearchDiscountAccount(event: string) {
    this.discountAccountSearchEntity = new CoaSearchEntity();
    this.discountAccountSearchEntity.accountName.startsWith = event;
    if (this.legalItemDetailForm.get('discountAccountId').value) {
      this.discountAccountSearchEntity.ids.push(this.legalItemDetailForm.get('discountAccountId').value);
    }
    this.discountAccountTyping.next(this.discountAccountSearchEntity);
  }

  // itemDiscounts:
  addItemDiscount() {
    this.indexItemDiscount = -1;
    this.legalItemDetailService.addItemDiscount();
    this.isOpenModalItemDiscount = true;
  }

  editItemDiscount(itemDiscount: any, index: number) {
    this.indexItemDiscount = index;
    this.legalItemDetailService.editItemDiscount(itemDiscount);
    this.isOpenModalItemDiscount = true;
  }

  saveItemDiscount(itemDiscount: any) {
    if (!this.itemDiscountForm.valid) {
      this.genaralService.validateAllFormFields(this.itemDiscountForm);
    } else {
      this.legalItemDetailService.saveItemDiscount(itemDiscount, this.indexItemDiscount);
      this.isOpenModalItemDiscount = false;
    }
  }

  deleteItemDiscount(index: number) {
    this.legalItemDetailService.deleteItemDiscount(index);
  }

  clearItemDiscount() {
    this.legalItemDetailForm.get('discountTypeName').setValue('');
    const currentFormArray = this.legalItemDetailForm.get('itemDiscounts') as FormArray;
    while (currentFormArray.length !== 0) {
      currentFormArray.removeAt(0);
    }
  }

  openDiscountTypeList() {
    if (this.discountTypeList.length === 0) {
      this.legalItemDetailService.getDiscountTypeList();
    }
  }

  returnDiscountTypeValue(node: any) {
    return node.code;
  }

  // itemMaterials:
  openItemList() {
    this.itemSearchEntity = new ItemSearchEntity();
    if (this.itemMaterialForm.get('sourceItemId').value) {
      this.itemSearchEntity.ids.push(this.itemMaterialForm.get('sourceItemId').value);
    }
    this.legalItemDetailService.getItemList(this.itemSearchEntity);
  }

  typingSearchItemList(event: string) {
    this.itemSearchEntity = new ItemSearchEntity();
    this.itemSearchEntity.name.startsWith = event;
    if (this.itemMaterialForm.get('sourceItemId').value) {
      this.itemSearchEntity.ids.push(this.itemMaterialForm.get('sourceItemId').value);
    }
    this.itemTyping.next(this.itemSearchEntity);
  }

  openUomList() {
    this.uomSearchEntity = new UomSearchEntity();
    if (this.itemMaterialForm.get('unitOfMeasureId').value) {
      this.uomSearchEntity.ids.push(this.itemMaterialForm.get('unitOfMeasureId').value);
    }
    this.legalItemDetailService.getUomList(this.uomSearchEntity);
  }

  typingSearchUomList(event: string) {
    this.uomSearchEntity = new ItemSearchEntity();
    this.uomSearchEntity.name.startsWith = event;
    if (this.itemMaterialForm.get('unitOfMeasureId').value) {
      this.uomSearchEntity.ids.push(this.itemMaterialForm.get('unitOfMeasureId').value);
    }
    this.uomTyping.next(this.uomSearchEntity);
  }

  addItemMaterial() {
    this.indexItemMaterial = -1;
    this.legalItemDetailService.addItemMaterial();
    this.isOpenModalItemMaterial = true;
  }

  editItemMaterial(itemMaterial: any, index: number) {
    this.indexItemMaterial = index;
    this.legalItemDetailService.editItemMaterial(itemMaterial);
    this.isOpenModalItemMaterial = true;
  }

  saveItemMaterial(itemMaterial: any) {
    if (!this.itemMaterialForm.valid) {
      this.genaralService.validateAllFormFields(this.itemMaterialForm);
    } else {
      this.legalItemDetailService.saveItemMaterial(itemMaterial, this.indexItemMaterial);
      this.isOpenModalItemMaterial = false;
    }
  }

  deleteItemMaterial(index: number) {
    this.legalItemDetailService.deleteItemMaterial(index);
  }

  selectItem(event: any) {
    this.itemMaterialForm.controls.sourceItemId.setValue(event.id);
    this.itemMaterialForm.controls.sourceItemName.setValue(event.name);
    this.itemMaterialForm.controls.sourceItemCode.setValue(event.code);
  }

  returnItemValue(node) {
    return node;
  }

  returnUomValue(node) {
    return node;
  }

  trackByFn(index, row) {
    return index;
  }
}
