import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ApiCallerService } from '../services/api-caller.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campionati',
  templateUrl: './campionati.component.html',
  styleUrls: ['./campionati.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class CampionatiComponent implements OnInit {
  user: any = null;
  invitiCount: number = 0;
  showCreaCampionatoModal: boolean = false;
  nomeCampionato: string = '';
  descrizioneCampionato: string = '';
  campionati: any[] = [];
  inviti: any[] = [];

  constructor(private apiCaller: ApiCallerService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    this.init();
  }

  async init(): Promise<void> {
    try {
      this.campionati = await this.apiCaller.recuperaCampionati().toPromise();
      this.inviti = await this.apiCaller.recuperaInvitiRicevuti().toPromise();
      this.invitiCount = this.inviti.length;
    } catch (error) {
      console.error('Errore durante l\'inizializzazione:', error);
    }
  }

  toggleInvitiSidebar(): void {
    const sidebar = document.getElementById('inviti-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    } else {
      console.warn('Sidebar non trovata nel DOM.');
    }
  }

  async creaCampionato(): Promise<void> {
    if (!this.nomeCampionato.trim() || !this.descrizioneCampionato.trim()) {
      console.warn('Nome o descrizione del campionato non validi.');
      return;
    }

    try {
      const nuovoCampionato = await this.apiCaller.creaCampionato(this.nomeCampionato, this.descrizioneCampionato);
      this.closeModaleCreaCampionato();
      if (nuovoCampionato) {
        this.campionati = await this.apiCaller.recuperaCampionati().toPromise();
      }
    } catch (error) {
      console.error('Errore durante la creazione del campionato:', error);
    }
  }

  closeModaleCreaCampionato(): void {
    this.showCreaCampionatoModal = false;
  }

  logout(): void {
    try {
      localStorage.removeItem('user');
      this.apiCaller.logOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  }
}
