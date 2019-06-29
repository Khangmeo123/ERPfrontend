import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './_pages/user/user.component';



const routes: Routes = [
  {path: '', children: [
    {path: 'user', component: UserComponent},
    {path: '', redirectTo: 'user', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
