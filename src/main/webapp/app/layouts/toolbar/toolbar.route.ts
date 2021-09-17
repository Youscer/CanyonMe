import { Route } from '@angular/router';
import { ToolBarComponent } from './toolbar.component';


export const navbarRoute: Route = {
  path: '',
  component: ToolBarComponent,
  outlet: 'toolbar',
};
