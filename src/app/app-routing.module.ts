import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  {
    path: 'contact-details/:id',
    loadChildren: () => import('./contact-details/contact-details.module').then(m => m.ContactDetailsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'update-contact/:id',
    loadChildren: () => import('./update-contact/update-contact.module').then(m => m.UpdateContactPageModule), canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
