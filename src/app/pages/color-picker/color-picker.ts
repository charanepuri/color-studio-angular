import { Component } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.css'
})
export class ColorPicker {

  selectedColor = '#3B82F6';
  red = 59;
  green = 130;
  blue = 246;

  toastMessage = '';

  showToast = false;

  presetColors = [
    '#EF4444',
    '#F97316',
    '#FACC15',
    '#22C55E',
    '#06B6D4',
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#111827',
    '#FFFFFF'
  ];

  onColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedColor = input.value;
    this.hexToRgb();
  }

  get rgb(): string {
    const hex = this.selectedColor.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  get hsl(): string {

    const hex = this.selectedColor.replace('#', '');

    let r = parseInt(hex.substring(0,2),16)/255;
    let g = parseInt(hex.substring(2,4),16)/255;
    let b = parseInt(hex.substring(4,6),16)/255;

    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);

    let h = 0;
    let s = 0;

    const l = (max + min)/2;

    if(max !== min){

      const d = max-min;

      s = l > 0.5
        ? d/(2-max-min)
        : d/(max+min);

      switch(max){

        case r:
          h = (g-b)/d + (g<b ? 6 : 0);
          break;

        case g:
          h = (b-r)/d + 2;
          break;

        case b:
          h = (r-g)/d + 4;
          break;

      }

      h /=6;

    }

    return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;

  }

  copy(text: string): void {

    navigator.clipboard.writeText(text);

    this.toastMessage = 'Copied Successfully!';

    this.showToast = true;

    setTimeout(()=>{
      this.showToast = false;
    },3000);

  }

  hexToRgb(): void {

    const hex = this.selectedColor.replace('#', '');

    this.red = parseInt(hex.substring(0,2),16);
    this.green = parseInt(hex.substring(2,4),16);
    this.blue = parseInt(hex.substring(4,6),16);

  }

  updateFromRgb(): void {

    this.selectedColor =
      '#' +
      [this.red,this.green,this.blue]
        .map(value =>
          value.toString(16).padStart(2,'0'))
        .join('');

  }

  selectPreset(color: string): void {

    this.selectedColor = color;

    this.hexToRgb();

  }

  randomColor(): void {

    const random =
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6,'0');

    this.selectedColor = '#' + random;

    this.hexToRgb();

  }
}