import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseRecapComponent } from './purchase-recap/purchase-recap.component';
import { purchaseValidationRoutes } from './purchase-validation.route';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  ],
  exports: [RouterModule],
  declarations: [PurchaseRecapComponent, PurchaseConfirmationComponent],
  entryComponents: [PurchaseRecapComponent],
})
export class PurchaseValidationModule {}
