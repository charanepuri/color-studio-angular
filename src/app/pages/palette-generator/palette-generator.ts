import { Component } from '@angular/core';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-palette-generator',
  standalone: true,
  imports: [],
  templateUrl: './palette-generator.html',
  styleUrl: './palette-generator.css',
  
})
export class PaletteGenerator {

  baseColor = '#3B82F6';

  palette: string[] = [];
  
  toastMessage = '';

  showToast = false;
  
  constructor(
    private colorService: ColorService
  ) {

    this.generatePalette();

  }

  onColorChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.baseColor = input.value;

    this.generatePalette();

  }

  generatePalette(): void {

    this.palette =
      this.colorService.generatePalette(
        this.baseColor
      );

  }

  copyColor(color: string): void {

    navigator.clipboard.writeText(color);

    this.toastMessage = `${color} copied!`;

    this.showToast = true;

    setTimeout(() => {

      this.showToast = false;

    }, 3000);

  }

  randomPalette(): void {

    this.baseColor =
      this.colorService.generateRandomColor();

    this.generatePalette();

  }
}