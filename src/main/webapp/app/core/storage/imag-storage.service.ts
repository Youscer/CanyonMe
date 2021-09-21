import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FileUpload } from './file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class ImagStorageService {
  public file: any;
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File, uploadFolder: string): FileUpload {
    const { name } = file;
    this.file = file;

    const uploadPath = `${uploadFolder}/${new Date().getTime()}_${name}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(uploadPath, file);
    return {
      progress$: uploadTask.percentageChanges(),
      url$: this.getDownloadUrl(uploadTask, uploadPath),
    };
  }

  private getDownloadUrl(uploadTask: AngularFireUploadTask, uploadPath: string): Observable<any> {
    return from(uploadTask).pipe(switchMap(() => this.storage.ref(uploadPath).getDownloadURL()));
  }
}
