import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { CampionatiComponent } from './campionati/campionati.component';
import { PannelloAdminCampionatoComponent } from './pannello-admin-campionato/pannello-admin-campionato.component';
import { DashboardSingoloCampionatoComponent } from './dashboard-singolo-campionato/dashboard-singolo-campionato.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'campionati', component: CampionatiComponent },
  { path: 'pannello-admin', component: PannelloAdminCampionatoComponent },
  { path: 'dashboard-campionato', component: DashboardSingoloCampionatoComponent }
];
