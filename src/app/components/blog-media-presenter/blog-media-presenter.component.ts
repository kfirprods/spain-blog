import { AuthenticationService } from './../../services/authentication.service';
import { faPen, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { GalleryImage } from '../../models/gallery-image.type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BlogMedia } from '../../models/blog-media.type';
import { Image } from '@ks89/angular-modal-gallery';

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
  /*                   */

  /* editing media source */
  isEditingMedia: boolean;
  newSimpleSource: string;

  @Output()
  changeMediaSource = new EventEmitter();
  /*                      */

  constructor(public auth: AuthenticationService) {}

  ngOnInit() {
    this.galleryImages = [];

    if (this.media.type === 'gallery') {
      const imageUrls: Array<GalleryImage> = this.media.source;

      for (let i = 0; i < imageUrls.length; i++) {
        this.galleryImages.push(new Image(i,
          {img: imageUrls[i].source, description: imageUrls[i].description},
          {img: imageUrls[i].source}));
      }
    }
  }

  editSimpleSource() {
    this.newSimpleSource = this.media.source;
    this.isEditingMedia = true;
  }

  applySimpleSourceEdit() {
    this.media.source = this.newSimpleSource;
    this.changeMediaSource.emit();

    this.isEditingMedia = false;
  }

  cancelSimpleSourceEdit() {
    this.isEditingMedia = false;
  }
}
