import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { UserSamplesComponent } from './user-samples/user-samples.component';
import { BorrowedComponent } from './user-samples/borrowed/borrowed.component';
import { FavoritedComponent } from './user-samples/favorited/favorited.component';
import { RequestsComponent } from './requests/requests.component';
import { HistoryComponent } from './history/history.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatPaginatorModule} from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { ReturnComponent } from './return/return.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { AdminCartComponent } from './admin-cart/admin-cart.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
// import { AdminCartDialog } from './admin-dash/admin-dash.component';
import { AdminCartConfirmDialog } from './admin-dash/admin-dash.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    EditComponent,
    ConfirmationComponent,
    AdminDashComponent,
    UserDashComponent,
    UserSamplesComponent,
    BorrowedComponent,
    FavoritedComponent,
    RequestsComponent,
    HistoryComponent,
    EditUserComponent,
    ReturnComponent,
    // AdminCartComponent,
    // AdminCartDialog,
    AdminCartConfirmDialog
  ],
  imports: [
    NgbModule.forRoot(),
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  entryComponents: [
    // AdminCartDialog,
    AdminCartConfirmDialog
  ],

  providers: [
    { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  HttpService],

  bootstrap: [AppComponent],
})
export class AppModule { }
