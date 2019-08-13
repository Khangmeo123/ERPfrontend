import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_pages/login/login.component';
import { PageComponent } from './_pages/page/page.component';
import { AuthGuard } from './_helpers';
import { SignUpComponent } from './_pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'master-data',
        loadChildren: () => import('./_modules/master-data/master-data.module').then(m => m.MasterDataModule),
      },
    ],
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
