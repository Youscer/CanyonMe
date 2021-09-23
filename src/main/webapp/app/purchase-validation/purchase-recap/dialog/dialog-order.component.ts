import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jhi-elements-order-dialog',
  template: `
    <h1 mat-dialog-title>Sorry, out of stock for some items</h1>
    <div mat-dialog-content>
      <p *ngFor="let change of data">{{ change }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class DialogOrderComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
