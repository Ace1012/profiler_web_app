import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { UsersGuard } from './guards/users.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ServicesComponent } from './organization-services/services.component';
import { UsersComponent } from './users/users.component';
import { CustomerServicesComponent } from './users/customer-services/customer-services.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canLoad:[LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard], canLoad:[HomeGuard]},
  {path: 'users', component:UsersComponent, canActivate:[UsersGuard] },
  {path: 'organizations', component:OrganizationsComponent, canActivate:[AuthGuard]},
  {path: 'services', component:ServicesComponent, canActivate:[AuthGuard]},
  {path: 'customers', component:CustomerServicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, UsersComponent, OrganizationsComponent, ServicesComponent];
