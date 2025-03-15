import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductComponent } from './components/product/product.component';
import { LoginSignupComponent} from './components/login-signup/login-signup.component';


const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'shop', component: ShopComponent},
  {path : 'product', component: ProductComponent},
  {path : 'product/:id', component: ProductComponent},
  {path : "login", component: LoginSignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
