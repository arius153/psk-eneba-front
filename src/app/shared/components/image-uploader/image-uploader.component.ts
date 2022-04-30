import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Input()
  name: string;
  @Input()
  required: boolean;

  imagesToDisplay: {index: number, imageString: string, file: File}[] = [];
  imagesToSaveInternal: {index: number, image: File}[] = [];
  imagesToSaveExternal: File[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onFileChange(event) {
    console.log('CIA FILE UPLOADAS');
    console.log(event.target.files);
    if (event.target.files && event.target.files.length) {
      this.readAsDataURL(event.target).then(results => {
        results.forEach(result => {
          this.imagesToDisplay.push({index: this.generateIndex(), imageString: result.imageString, file: result.image});
        });
        event.target.value = '';
        console.log(this.imagesToDisplay);
      });
    }
  }

  readAsDataURL(target): Promise<{imageString: string, image: File}[]> {
    const filesArray = Array.prototype.slice.call(target.files);
    return Promise.all(filesArray.map(this.fileToDataURL));
  }

  fileToDataURL(file): Promise<{imageString: string, image: File}> {
    const reader = new FileReader();
    return new Promise((resolve, _) => {
      reader.onload = (event) => {
        resolve({imageString: event.target.result as string, image: file});
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    const image = this.imagesToDisplay.findIndex(obj => obj.index === index);
    if (image !== -1) {
      this.imagesToDisplay.splice(image, 1);
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
