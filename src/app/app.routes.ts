import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { CampionatiComponent } from './campionati/campionati.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'campionati', component: CampionatiComponent }
];
