
import { Routes, RouterModule } from '@angular/router';
import { checkLoginGuard } from './shared/guards/check-login.guard';
import { checkSessionGuard } from './shared/guards/check-session.guard';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'notfound',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [checkSessionGuard]
  },
  {
    path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [checkLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
