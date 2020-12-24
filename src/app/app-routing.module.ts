import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartPageComponent} from "./cart-page/cart-page.component";

const routes: Routes = [
  {path: '', component: CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
