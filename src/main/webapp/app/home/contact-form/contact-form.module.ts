import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from './contact-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, NgbModule, MatFormFieldModule, MatCardModule, MatIconModule],
  declarations: [ContactFormComponent],
  entryComponents: [ContactFormComponent],
  exports: [ContactFormComponent],
})
export class ContactFormModule {}
