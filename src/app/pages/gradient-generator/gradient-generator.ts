import { Component } from '@angular/core';

@Component({
  selector: 'app-gradient-generator',
  standalone: true,
  imports: [],
  templateUrl: './gradient-generator.html',
  styleUrl: './gradient-generator.css'
})


export class GradientGenerator {
  toastMessage = '';

  showToast = false;

  presetGradients = [

      {
        name: 'Sunset',
        color1: '#FF7E5F',
        color2: '#FEB47B'
      },

      {
        name: 'Ocean',
        color1: '#2193B0',
        color2: '#6DD5ED'
      },

      {
        name: 'Instagram',
        color1: '#833AB4',
        color2: '#FD1D1D'
      },

      {
        name: 'Forest',
        color1: '#11998E',
        color2: '#38EF7D'
      },

      {
        name: 'Fire',
        color1: '#F12711',
        color2: '#F5AF19'
      },

      {
        name: 'Purple',
        color1: '#8E2DE2',
        color2: '#4A00E0'
      }

    ];

  gradientType = 'linear';

  directions = [
    { label: '↖', angle: 315 },
    { label: '↑', angle: 0 },
    { label: '↗', angle: 45 },
    { label: '←', angle: 270 },
    { label: '→', angle: 90 },
    { label: '↙', angle: 225 },
    { label: '↓', angle: 180 },
    { label: '↘', angle: 135 }
  ];


  color1 = '#3B82F6';

  color2 = '#EC4899';

  angle = 45;

  get gradientStyle(): string {

    switch (this.gradientType) {

      case 'radial':

        return `radial-gradient(circle, ${this.color1}, ${this.color2})`;

      case 'conic':

        return `conic-gradient(from ${this.angle}deg, ${this.color1}, ${this.color2})`;

      default:

        return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`;

    }

  }

  get cssCode(): string {

    switch (this.gradientType) {

      case 'radial':

        return `background: radial-gradient(circle, ${this.color1}, ${this.color2});`;

      case 'conic':

        return `background: conic-gradient(from ${this.angle}deg, ${this.color1}, ${this.color2});`;

      default:

        return `background: linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2});`;

    }

  }

  updateColor1(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.color1 = input.value;

  }

  updateColor2(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.color2 = input.value;

  }

  updateAngle(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.angle = Number(input.value);

  }

  copyCss(): void {

    navigator.clipboard.writeText(this.cssCode);

    this.toastMessage = 'CSS Copied Successfully!';

    this.showToast = true;

    setTimeout(() => {

      this.showToast = false;

    },3000);

  }

  randomGradient(): void {

    this.color1 =
      '#' +
      Math.floor(Math.random()*16777215)
        .toString(16)
        .padStart(6,'0');

    this.color2 =
      '#' +
      Math.floor(Math.random()*16777215)
        .toString(16)
        .padStart(6,'0');

    this.angle =
      Math.floor(Math.random()*361);

  }

  applyPreset(
    preset:any
    ):void{

    this.color1 = preset.color1;

    this.color2 = preset.color2;

  }

  setGradientType(type: string): void {

    this.gradientType = type;

  }

  setDirection(angle: number): void {

    this.angle = angle;

  }
}