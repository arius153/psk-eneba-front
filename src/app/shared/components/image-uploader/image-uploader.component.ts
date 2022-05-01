import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploaderComponent),
      multi: true
    }
  ]
})
export class ImageUploaderComponent implements ControlValueAccessor {

  @Input()
  name: string;
  @Input()
  required: boolean;

  imagesToDisplay: { index: number, imageString: string, file: File }[] = [];
  imagesToSaveExternal: File[] = [];

  propagateChange = (_: any) => {
  }

  writeValue(value: File[]): void {
    if (value) {
      this.imagesToSaveExternal = value;
    }
  }

  registerOnChange(fn: any): void {
    console.log(fn);
    this.propagateChange(fn);
  }

  registerOnTouched(fn: any): void {
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      this.readAsDataURL(event.target).then(results => {
        results.forEach(result => {
          this.imagesToDisplay.push({index: this.generateIndex(), imageString: result.imageString, file: result.image});
          this.imagesToSaveExternal.push(result.image);
        });
        event.target.value = '';
        this.registerOnChange(this.imagesToSaveExternal);
      });
    }
  }

  readAsDataURL(target): Promise<{ imageString: string, image: File }[]> {
    const filesArray = Array.prototype.slice.call(target.files);
    return Promise.all(filesArray.map(this.fileToDataURL));
  }

  fileToDataURL(file): Promise<{ imageString: string, image: File }> {
    const reader = new FileReader();
    return new Promise((resolve, _) => {
      reader.onload = (event) => {
        resolve({imageString: event.target.result as string, image: file});
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    const image = this.imagesToDisplay.find(obj => obj.index === index);
    if (image !== undefined) {
      this.imagesToDisplay.splice(this.imagesToDisplay.indexOf(image), 1);
      this.imagesToSaveExternal.splice(this.imagesToSaveExternal.indexOf(image.file), 1);
      this.registerOnChange(this.imagesToSaveExternal);
    }
  }

  private generateIndex(): number {
    const indexes = this.imagesToDisplay.map(image => image.index);
    let i = 0;
    while (true) {
      if (!indexes.includes(i)) {
        return i;
      }
      i++;
    }
  }
}
