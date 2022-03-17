import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { UsersGuard } from './guards/users.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canLoad:[LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard], canLoad:[HomeGuard]},
  {path:'users', component:UsersComponent, canActivate:[UsersGuard] },
  {path:'organizations', component:OrganizationsComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, UsersComponent];
