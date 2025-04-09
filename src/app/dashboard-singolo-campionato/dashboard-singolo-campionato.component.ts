import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiCallerService } from '../services/api-caller.service';

@Component({
  selector: 'app-dashboard-singolo-campionato',
  templateUrl: './dashboard-singolo-campionato.component.html',
  styleUrls: ['./dashboard-singolo-campionato.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class DashboardSingoloCampionatoComponent implements OnInit {
  user: any = null;
  campionato: any = null;
  squadraData: any = null;
  allSquadreResponse: any[] = [];
  personaggi: any[] = [];
  selectedPersonaggi: any[] = [];
  credits: number = 160;
  numeroMassimoPersonaggi: number = 5;
  squadraName: string = '';
  squadraDesc: string = '';
  menuVisible: boolean = false;
  modalVisible: boolean = false;
  searchTerm: string = '';
  searchResults: any[] = [];
  tooltipVisible: boolean = false;
  tooltipContent: string = '';
  tooltipPosition: { top: string; left: string } = { top: '0px', left: '0px' };

  constructor(private apiCaller: ApiCallerService, public router: Router) {}

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.campionato = JSON.parse(localStorage.getItem('campionato') || '{}');

    if (!this.user) {
      this.router.navigate(['/homepage']);
      return;
    }

    try {
      this.allSquadreResponse = await this.apiCaller
        .recuperaSquadreCampionato(this.campionato.chiaveCampionato)
        .toPromise();
      this.squadraData = this.allSquadreResponse.find(
        (squadra) => squadra.laMiaSquadra
      );
      if (this.squadraData) {
        this.displaySquadra();
      } else {
        this.displayCreateForm();
      }
    } catch (error) {
      console.error('Errore durante il recupero delle squadre:', error);
    }
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  isAdmin(): boolean {
    return (
      this.campionato?.ruoloUtente === 'ADMIN' ||
      this.campionato?.ruoloUtente === 'OWNER'
    );
  }

  displaySquadra() {
    console.log('Visualizza squadra:', this.squadraData);
  }

  async displayCreateForm() {
    try {
      this.personaggi = await this.apiCaller
        .recuperaPersonaggi(this.campionato.chiaveCampionato)
        .toPromise();
    } catch (error) {
      console.error('Errore durante il recupero dei personaggi:', error);
    }
  }

  togglePersonaggioSelection(personaggio: any) {
    const index = this.selectedPersonaggi.findIndex(
      (p) => p.chiave === personaggio.chiave
    );
    if (index === -1) {
      if (
        this.selectedPersonaggi.length < this.numeroMassimoPersonaggi &&
        this.credits >= personaggio.costo
      ) {
        this.selectedPersonaggi.push(personaggio);
        this.credits -= personaggio.costo;
      } else {
        alert('Crediti insufficienti o limite raggiunto');
      }
    } else {
      this.selectedPersonaggi.splice(index, 1);
      this.credits += personaggio.costo;
    }
  }

  async createSquadra() {
    try {
      const nominativi = this.selectedPersonaggi.map((p) => p.chiave);
      await this.apiCaller.creaSquadra(
        this.squadraName,
        this.squadraDesc,
        this.campionato.chiaveCampionato,
        nominativi
      );
      this.ngOnInit(); // Ricarica i dati
    } catch (error) {
      console.error('Errore durante la creazione della squadra:', error);
    }
  }

  openInvitaUtenteModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  async handleSearchInput() {
    if (this.searchTerm.length >= 3) {
      try {
        this.searchResults = await this.apiCaller
          .ricercaUtente(this.campionato.chiaveCampionato, this.searchTerm)
          .toPromise();
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
      }
    } else {
      this.searchResults = [];
    }
  }

  selectUser(user: any) {
    this.searchTerm = user.username;
    this.searchResults = [];
  }

  async invitaUtente() {
    try {
      await this.apiCaller.invitaUtente(
        this.searchTerm,
        'PLAYER',
        this.campionato.chiaveCampionato
      );
      this.closeModal();
    } catch (error) {
      console.error("Errore durante l'invito dell'utente:", error);
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('campionato');
    this.apiCaller
      .logOut()
      .toPromise()
      .then(() => {
        this.router.navigate(['/homepage']);
      });
  }

  getInitials(str: string): string {
    return str
      ?.trim()
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  }

  showTooltip(personaggio: any, event: MouseEvent) {
    this.tooltipContent = `${personaggio.nomePersonaggio} con ${personaggio.punteggioAttuale} pt`;
    this.tooltipVisible = true;

    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.tooltipPosition = {
      top: `${rect.bottom + 5}px`,
      left: `${rect.left + rect.width / 2}px`,
    };
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
}
