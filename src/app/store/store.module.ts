import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { StoreRoutingModule } from './store-routing.module';
import { ViewComponent } from './pages/view/view.component';



@NgModule({
  declarations: [
  
    HomeComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
