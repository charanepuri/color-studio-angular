import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { ColorPicker } from './pages/color-picker/color-picker';
import { PaletteGenerator } from './pages/palette-generator/palette-generator';
import { GradientGenerator } from './pages/gradient-generator/gradient-generator';
import { ColorConverter } from './pages/color-converter/color-converter';

import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'picker', component: ColorPicker },
  { path: 'palette', component: PaletteGenerator },
  { path: 'gradient', component: GradientGenerator },
  { path: 'converter', component: ColorConverter },
  { path: 'about', component: About },
  { path: '**', component: NotFound }
];