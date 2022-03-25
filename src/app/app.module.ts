import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { CustomHttpInterceptor } from './interceptor/HttpInterceptor';
import { UserMoreDetailsComponent } from './user-more-details/user-more-details.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { AddOrganizationDialogComponent } from './add-organization-dialog/add-organization-dialog.component';
import { ServicesComponent } from './organization-services/services.component';
import { UpdateServiceDialogComponent } from './update-service-dialog/update-service-dialog.component';
import { AddServiceDialogComponent } from './add-service-dialog/add-service-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UsersComponent,
    UpdateUserDialogComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent,
    SnackBarComponent,
    UserMoreDetailsComponent,
    OrganizationsComponent,
    AddOrganizationDialogComponent,
    ServicesComponent,
    UpdateServiceDialogComponent,
    AddServiceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:CustomHttpInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
