import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signing-pad';
  signatureImg?: string;

  saveSignature(signature: string): void {
    this.signatureImg = signature;
  }
}
