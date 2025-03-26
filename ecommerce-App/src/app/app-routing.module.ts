import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductComponent } from './components/product/product.component';
import { LoginSignupComponent} from './components/login-signup/login-signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {path : "login", component: LoginSignupComponent, canActivate: [authGuard] },
  {path : '', component: HomeComponent, canActivate: [authGuard] },
  {path : 'shop', component: ShopComponent, canActivate: [authGuard]},
  {path : 'product', component: ProductComponent, canActivate: [authGuard]},
  {path : 'product/:id', component: ProductComponent, canActivate: [authGuard]},
  {path : "profile", component: ProfileComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
