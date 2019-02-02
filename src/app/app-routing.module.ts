import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConectionComponent } from './conection/conection.component';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';

const routes: Routes = [
  { path: 'connection',      component: ConectionComponent },
  { path: 'send-transaction',      component: SendTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
