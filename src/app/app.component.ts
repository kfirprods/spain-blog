import { Component, Injectable, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class AppComponent  {

}
