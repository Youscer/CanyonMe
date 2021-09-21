import { Route } from '@angular/router';
import { ToolBarComponent } from './toolbar.component';

export const toolbarRoute: Route = {
  path: '',
  component: ToolBarComponent,
  outlet: 'toolbar',
};
