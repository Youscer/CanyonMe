import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseRecapComponent } from './purchase-recap/purchase-recap.component';
import { purchaseValidationRoutes } from './purchase-validation.route';
import { ShippingInformationsComponent } from './shipping-informations/shipping-informations.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

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
    MatSelectModule,
    MatRadioModule,
  ],
  exports: [RouterModule],
  declarations: [PurchaseRecapComponent, ShippingInformationsComponent],
  entryComponents: [PurchaseRecapComponent, ShippingInformationsComponent],
})
export class PurchaseValidationModule {}
