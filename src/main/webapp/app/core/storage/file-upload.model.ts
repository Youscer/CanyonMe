import { Observable } from 'rxjs';

export interface FileUpload {
  progress$: Observable<number | undefined>;
  url$: Observable<string>;
}
