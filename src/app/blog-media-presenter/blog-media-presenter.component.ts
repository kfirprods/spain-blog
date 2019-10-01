import { GalleryImage } from './../data-models/gallery-image.type';
import { Component, OnInit, Input } from '@angular/core';

import { BlogMedia } from './../data-models/blog-media.type';
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

  constructor() {}

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
}
