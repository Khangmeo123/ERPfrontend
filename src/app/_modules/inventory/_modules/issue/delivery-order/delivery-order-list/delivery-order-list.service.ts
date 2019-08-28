import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { DeliveryOrder } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.entity';
import { FormBuilder } from '@angular/forms';
import { DeliveryOrderRepository } from './delivery-order-list.repository';
import { DeliveryOrderSearch } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.searchentity';

@Injectable()
export class DeliveryOrderListService {

    public deliveryOrderList: BehaviorSubject<DeliveryOrder[]> = new BehaviorSubject<DeliveryOrder[]>([]);
    public deliveryOrderCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public statusList: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);
    
    constructor(
        private fb: FormBuilder,
        private deliveryOrderRepository: DeliveryOrderRepository,
      ) {
      }

      getList = (DeliveryOrderSearchEntity: DeliveryOrderSearch): Subscription => {
        return forkJoin(
          this.deliveryOrderRepository.getList(DeliveryOrderSearchEntity),
          this.deliveryOrderRepository.count(DeliveryOrderSearchEntity),
        )
          .subscribe(([list, count]) => {
            if (list) {
              this.deliveryOrderList.next(list);
            }
            if (count) {
              this.deliveryOrderCount.next(count);
            }
          });
      };
}
