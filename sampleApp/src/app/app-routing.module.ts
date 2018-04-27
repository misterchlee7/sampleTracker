import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { ReturnComponent } from './return/return.component';
import { AdminCartComponent } from './admin-cart/admin-cart.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'admin/create', component: CreateComponent },
  { path:'admin/edit/product/:id', component: EditComponent },
  { path:'admin/edit/user/:id', component: EditUserComponent },
  { path:'admin/dash', component: AdminDashComponent },
  { path:'admin/requests', component: RequestsComponent },
  { path:'admin/history', component: HistoryComponent },
  { path:'admin/return', component: ReturnComponent },
  { path:'user/samples', component: UserSamplesComponent },
  { path:'user/dash', component: UserDashComponent },
  { path:'confirmation', component: ConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


