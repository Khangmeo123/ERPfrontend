import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from 'src/app/_shared/components/error/error.module';
import { AdminComponent } from './admin.component';
import { UserComponent } from './_pages/user/user.component';



@NgModule({
  declarations: [AdminComponent, UserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorModule
  ]
})
export class AdminModule { }
