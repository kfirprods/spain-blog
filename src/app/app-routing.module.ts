import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view-component/main-view-component';


const routes: Routes = [
  { path: '',
    component: MainViewComponent
  },
  {
    path: 'days/:day',
    component: MainViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
