import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSearchComponent } from './user-search/user-search.component';
import { TableDetailsComponent } from './table-details/table-details.component';


const routes: Routes = [
  {
    path: '',
    component:TableDetailsComponent
  },
  {
    path: 'user',
    component: UserSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
