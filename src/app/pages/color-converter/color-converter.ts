import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './color-converter.html',
  styleUrl: './color-converter.css'
})
export class ColorConverter {

  inputFormat = 'HEX';
  outputFormat = 'RGB';

  history: string[] = [];
  favorites: string[] = [];
  
  inputValue = '#3B82F6';
  result = '';

  toastMessage = '';
  showToast = false;

  constructor(
    private colorService: ColorService
  ) {
    this.convert();
  }

convert(): void {

  const key =
    `${this.inputFormat}-${this.outputFormat}`;

  switch (key) {

    case 'HEX-RGB':

      this.result =
        this.colorService.hexToRgb(this.inputValue);

      break;

    case 'RGB-HEX':

      this.result =
        this.colorService.rgbToHex(this.inputValue);

      break;

    case 'HEX-HSL':

      this.result =
        this.colorService.hexToHsl(this.inputValue);

      break;

    case 'HSL-HEX':

      this.result =
        this.colorService.hslToHex(this.inputValue);

      break;

    case 'RGB-HSL':

      this.result =
        this.colorService.rgbToHsl(this.inputValue);

      break;

    case 'HSL-RGB':

      this.result =
        this.colorService.hslToRgb(this.inputValue);

      break;

    default:

      this.result = this.inputValue;

if (
  this.result &&
  this.result !== 'Conversion not supported'
) {

  const record =
    `${this.inputValue} → ${this.result}`;

  if (!this.history.includes(record)) {

    this.history.unshift(record);

    if (this.history.length > 10) {

      this.history.pop();

    }

  }

}
  }

}

  onInputChange(): void {

    this.convert();

  }

  get previewColor(): string {

    if (this.inputFormat === 'HEX') {

      return this.inputValue || '#ffffff';

    }

    if (this.inputFormat === 'RGB') {

      return this.inputValue || 'rgb(255,255,255)';

    }

    return '#ffffff';

  }

  copyResult(): void {

    if (!this.result) {

      return;

    }

    navigator.clipboard.writeText(this.result);

    this.toastMessage = 'Copied Successfully!';

    this.showToast = true;

    setTimeout(() => {

      this.showToast = false;

    }, 3000);

  }

  swapFormats(): void {

    const tempFormat = this.inputFormat;

    this.inputFormat = this.outputFormat;
    this.outputFormat = tempFormat;

    const tempValue = this.inputValue;

    this.inputValue = this.result;
    this.result = tempValue;

    this.convert();

  }

  clear(): void {

    this.inputValue = '';
    this.result = '';

  }

  addFavorite(): void {

  if (
    this.result &&
    !this.favorites.includes(this.result)
  ) {

    this.favorites.push(this.result);

  }

}

removeFavorite(color: string): void {

  this.favorites =
    this.favorites.filter(

      item => item !== color

    );

}
}