import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';
import { DialogOrderComponent } from './purchase-recap/dialog/dialog-order.component';
import { PurchaseRecapComponent } from './purchase-recap/purchase-recap.component';
import { purchaseValidationRoutes } from './purchase-validation.route';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(purchaseValidationRoutes),
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  exports: [RouterModule],
  declarations: [PurchaseRecapComponent, PurchaseConfirmationComponent, DialogOrderComponent],
  entryComponents: [PurchaseRecapComponent],
})
export class PurchaseValidationModule {}
