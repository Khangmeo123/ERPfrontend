import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import Cropper from 'cropperjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: [
    './cropper.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CropperComponent implements OnInit {
  @Input() control: FormControl = new FormControl();

  display = false;

  result = '';

  selectedFile: File;

  cropper: Cropper;

  imageData = '';

  @Output() output = new EventEmitter();

  @Output() cancel = new EventEmitter();

  cropped = false;

  @ViewChild('image', {static: true}) image;
  @ViewChild('file', {static: true}) file;

  constructor() {
  }

  @Input()
  get imageDataURL() {
    return this.imageData;
  }

  set imageDataURL(data) {
    this.control.setValue(data);
    this.imageData = data;
  }

  get filename() {
    if (this.selectedFile) {
      return this.selectedFile.name;
    }
    return null;
  }

  ngOnInit() {
    if (this.control.value) {
      this.result = this.control.value;
    }
  }

  onCrop(image) {
    if (!this.cropped) {
      if (this.cropper) {
        this.imageDataURL = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
        this.cropper.destroy();
        this.cropped = true;
      } else {
        this.cropper = new Cropper(image, {
          aspectRatio: 1,
          cropBoxResizable: true,
          cropBoxMovable: true,
        });
      }
    }
  }

  onOk() {
    this.destroy();
    this.output.emit(this.imageDataURL);
    this.result = this.imageDataURL;
  }

  onSelectFile(event) {
    this.cropper = null;
    this.selectedFile = null;
    const {files} = event.target;
    if (files.length) {
      this.selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
      };
      reader.onloadend = () => {
        this.imageDataURL = reader.result.toString();
      };
      reader.readAsDataURL(this.selectedFile);
    }
    if (this.selectedFile) {
      this.display = true;
    }
  }

  destroy() {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
    this.display = false;
    this.cropped = false;
    this.file.nativeElement.value = null;
  }

  onCancel(event) {
    this.destroy();
    this.cancel.emit(event);
  }
}
