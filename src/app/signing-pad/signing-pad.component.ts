import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'app-signing-pad',
  template: `
    <canvas (mousedown)="onMouseDown($event)" (mousemove)="onMouseMove($event)" (touchmove)="onMouseMove($event)"
            (touchstart)="onMouseDown($event)" #signPad width="350" height="200">
    </canvas>
    <button (click)="clearSignature()">Clear</button>
    <button (click)="saveSignature()">Save</button>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    button {
      background-color: #1976d2;
      color: white;
      font-weight: 600;
      height: 35px;
      border-radius: 3px;
      border: none;
    }

    canvas {
      border: 1px solid;
    }
  `]
})
export class SigningPadComponent {

  @ViewChild('signPad', {static: false}) signPad!: ElementRef<HTMLCanvasElement>;
  @Output() signatureSaved = new EventEmitter();
  private signatureImg?: string;
  private sigPadElement: any;
  private context: any;
  private isDrawing!: boolean;

  public ngAfterViewInit(): void {
    this.sigPadElement = this.signPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#000';
  }

  onMouseDown(e: any): void {
    // The mouse button is clicked, which means the start of drawing the signature
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any): void {
    // The mouse button is released, so this means the end of drawing the signature
    this.isDrawing = false;
  }

  onMouseMove(e: any): void {
    if (this.isDrawing) { // if we're not drawing we need to ignore the events
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  clearSignature(): void {
    this.signatureImg = undefined;
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  saveSignature(): void {
    this.signatureImg = this.sigPadElement.toDataURL('image/png');
    this.signatureSaved.emit(this.signatureImg);
  }

  private relativeCoords(event: any): { x: number, y: number } {
    const bounds = event.target.getBoundingClientRect();
    const cords = {
      clientX: event.clientX || event.changedTouches[0].clientX,
      clientY: event.clientY || event.changedTouches[0].clientY
    };
    const x = cords.clientX - bounds.left;
    const y = cords.clientY - bounds.top;
    return {x, y};
  }
}
