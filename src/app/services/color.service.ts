import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ColorService {


  generatePalette(baseColor: string): string[] {

    const shades: string[] = [];

    for (let i = -2; i <= 2; i++) {

      shades.push(
        this.adjustBrightness(baseColor, i * 30)
      );

    }

    return shades;

  }

  generateRandomColor(): string {

    return (
        '#' +
        Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );

    }

  private adjustBrightness(color: string, amount: number): string {

    color = color.replace('#', '');

    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    return (
      '#' +
      [r, g, b]
        .map(value =>
          value.toString(16).padStart(2, '0'))
        .join('')
    );

  }

  hexToRgb(hex: string): string {

    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;

  }

  rgbToHex(rgb: string): string {

  const values = rgb.match(/\d+/g);

  if (!values || values.length !== 3) {

    return 'Invalid RGB';

  }

  const [r, g, b] = values.map(Number);

    return (
      '#' +
      [r, g, b]
        .map(value =>
          value.toString(16).padStart(2, '0'))
        .join('')
    );

  }

  rgbToHsl(rgb: string): string {

  const values = rgb.match(/\d+/g);

  if (!values || values.length !== 3) {
    return 'Invalid RGB';
  }

  let [r, g, b] = values.map(Number);

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {

    const d = max - min;

    s = l > 0.5
      ? d / (2 - max - min)
      : d / (max + min);

    switch (max) {

      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;

    }

    h /= 6;

  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

}

hexToHsl(hex: string): string {

  return this.rgbToHsl(
    this.hexToRgb(hex)
  );

}

hslToRgb(hsl: string): string {

  const values = hsl.match(/\d+/g);

  if (!values || values.length !== 3) {
    return 'Invalid HSL';
  }

  let [h, s, l] = values.map(Number);

  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {

    r = c;
    g = x;

  }

  else if (h < 120) {

    r = x;
    g = c;

  }

  else if (h < 180) {

    g = c;
    b = x;

  }

  else if (h < 240) {

    g = x;
    b = c;

  }

  else if (h < 300) {

    r = x;
    b = c;

  }

  else {

    r = c;
    b = x;

  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;

}

hslToHex(hsl: string): string {

  return this.rgbToHex(
    this.hslToRgb(hsl)
  );

}


}