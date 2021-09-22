import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagStorageService } from '../../core/storage/imag-storage.service';

@Component({
  selector: 'jhi-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  public progress$: Observable<number | undefined> | undefined;
  public url$: Observable<string> | undefined;
  public path: string | undefined;
  public currentFile: number = 0;
  public links: Array<string> = [];
  @Output() linksEmitter = new EventEmitter<Array<string>>();

  constructor(private imgStorageService: ImagStorageService) {}

  uploadFile(event: any): void {
    const file = event.target.files[0];
    const { progress$, url$ } = this.imgStorageService.uploadFile(file, 'img/');
    this.currentFile += 1;
    this.progress$ = progress$;
    this.url$ = url$;
    this.url$.subscribe({
      next: url => {
        this.links.push(url);
        this.linksEmitter.emit(this.links);
      },
    });
  }
}
