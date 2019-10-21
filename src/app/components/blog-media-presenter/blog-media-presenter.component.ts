import { GalleryImage } from './../../models/gallery-image.type';
import { AuthenticationService } from './../../services/authentication.service';
import { faPen, faCheck, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BlogMedia } from '../../models/blog-media.type';
import { Image } from '@ks89/angular-modal-gallery';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';


@Component({
  selector: 'app-blog-media-presenter',
  templateUrl: './blog-media-presenter.component.html',
  styleUrls: ['./blog-media-presenter.component.scss']
})
export class BlogMediaPresenterComponent implements OnInit {
  @Input()
  media: BlogMedia;

  galleryImages: Image[];

  /* icons for editing */
  faPen = faPen;
  faCheck = faCheck;
  faTimes = faTimes;
  faPlus = faPlus;
  faMinus = faMinus;
  /*                   */

  /* editing media source */
  isEditingMedia: boolean;
  newSource: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Output()
  changeMediaSource = new EventEmitter();
  /*                      */

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.galleryImages = [];

    if (this.media.type === 'gallery') {
      const imageUrls: Array<GalleryImage> = this.media.source;

      for (let i = 0; i < imageUrls.length; i++) {
        this.galleryImages.push(new Image(i,
          { img: imageUrls[i].source, description: imageUrls[i].description },
          { img: imageUrls[i].source }));
      }
    }
  }

  editSource() {
    this.newSource = this.media.source;
    this.isEditingMedia = true;
  }

  applySourceEdit() {
    this.media.source = this.newSource;
    this.changeMediaSource.emit();

    this.isEditingMedia = false;
  }

  cancelSourceEdit() {
    this.isEditingMedia = false;
  }

  addImageToGallery(sourceInput, descriptionInput) {
    const source = sourceInput.value;
    const description = descriptionInput.value;

    if (source === '' || description === '') {
      return;
    }

    this.newSource.push({ source, description });

    sourceInput.value = '';
    descriptionInput.value = '';

    sourceInput.focus();
  }

  removeImageFromGallery(imageSource) {
    this.newSource.pop(imageSource);
  }
}
