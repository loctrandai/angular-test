import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/list/list.module').then((mod) => mod.ListModule),
  },
  {
    path: 'detail',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/detail/detail.module').then((mod) => mod.DetailModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
