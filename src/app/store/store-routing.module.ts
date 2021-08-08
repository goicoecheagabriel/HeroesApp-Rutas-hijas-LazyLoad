import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes= [
{path: '', component: HomeComponent,
children: [
  { path: 'view', component: ViewComponent },
  { path: '**', redirectTo: 'store' }
]}
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class StoreRoutingModule { }
