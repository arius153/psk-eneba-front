import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {LoginComponent} from './core/login/login.component';
import {LoggedUserGuard} from './shared/guards/logged-user.guard';
import {ToolComponent} from 'src/app/core/tool/tool.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tool/:id',
    component: ToolComponent
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [LoggedUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
