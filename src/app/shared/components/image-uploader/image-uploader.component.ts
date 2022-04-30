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

  images: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onFileChange(event) {
    console.log('CIA FILE UPLOADAS');
    console.log(event);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.images.push(reader.result as string);
      };

    }
  }
}
