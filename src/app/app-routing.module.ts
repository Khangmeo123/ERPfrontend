import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_pages/login/login.component';
import { PageComponent } from './_pages/page/page.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: PageComponent, children:[
    {path: 'home', loadChildren: () => import('./_modules/home/home.module').then(m => m.HomeModule)},
    {path: 'admin', loadChildren: () => import('./_modules/admin/admin.module').then(m => m.AdminModule)}
  ], canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
