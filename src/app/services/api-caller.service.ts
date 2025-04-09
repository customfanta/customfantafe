import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  private serverHost = 'https://customfantabe.onrender.com';
  private isLocalValue = window.location.hostname === "" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  constructor(private http: HttpClient) {}

  creaUtente(username: string, nome: string, mail: string, password: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/create-user";
    return this.makePost(apiUrl, JSON.stringify({ username, nome, mail, password }));
  }

  effettuaAccesso(usernameMail: string, password: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/make-login.json" : this.serverHost + "/make-login";
    return this.makePost(apiUrl, JSON.stringify({ usernameMail, password }));
  }

  recuperaUtenteLoggato(): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/get-utente-loggato.json" : this.serverHost + "/get-utente-loggato";
    return this.makeGet(apiUrl);
  }

  logOut(): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/logout";
    return this.makeGet(apiUrl);
  }

  cancellaSquadra(username: string, chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/delete-squadra/" + username + "/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  recuperaPersonaggi(chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/read-personaggi.json" : this.serverHost + "/read-personaggi/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  creaSquadra(nomeSquadra: string, descrizioneSquadra: string, chiaveCampionato: string, chiaviPersonaggi: string[]): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/crea-squadra";
    const body = {
      squadra: {
        nome: nomeSquadra,
        descrizione: descrizioneSquadra,
        chiaveCampionato: chiaveCampionato,
      },
      chiaviPersonaggi: chiaviPersonaggi,
    };
    return this.makePost(apiUrl, JSON.stringify(body));
  }

  invitaUtente(usernameDaInvitare: string, ruoloInvito: string, chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/invita-utente";
    const body = {
      usernameUtenteInvitato: usernameDaInvitare,
      ruoloInvito: ruoloInvito,
      chiaveCampionato: chiaveCampionato
    };
    return this.makePost(apiUrl, JSON.stringify(body));
  }

  recuperaUtentiCampionato(chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/utenti-campionato.json" : this.serverHost + "/utenti-campionato/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  rendiUtenteAdmin(username: string, chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/make-utente-admin/" + username + "/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  rimuoviUtenteCampionato(username: string, chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/rimuovi-utente-campionato/" + username + "/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  recuperaAzioni(chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/read-all-azioni.json" : this.serverHost + "/read-all-azioni/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  creaAzione(azione: string, descrizione: string, punteggio: number, chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/create-azione";
    return this.makePost(apiUrl, JSON.stringify({ azione, descrizione, punteggio, chiaveCampionato }));
  }

  creaPersonaggio(nominativo: string, descrizione: string, costo: number, chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/create-personaggio";
    return this.makePost(apiUrl, JSON.stringify({ nominativo, descrizione, costo, chiaveCampionato }));
  }

  aggiungiAzionePersonaggio(chiaveAzione: string, chiavePersonaggio: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/add-azione-to-personaggio";
    return this.makePost(apiUrl, JSON.stringify({ chiaveAzione, chiavePersonaggio }));
  }

  recuperaCampionati(): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/campionati-utente.json" : this.serverHost + "/campionati-utente";
    return this.makeGet(apiUrl);
  }

  creaCampionato(nome: string, descrizione: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/esito.json" : this.serverHost + "/crea-campionato";
    return this.makePost(apiUrl, JSON.stringify({ nome, descrizione }));
  }

  recuperaInvitiRicevuti(): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/read-inviti-ricevuti.json" : this.serverHost + "/read-inviti-ricevuti";
    return this.makeGet(apiUrl);
  }

  recuperaInvitiInviati(): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/read-inviti-inviati.json" : this.serverHost + "/read-inviti-inviati";
    return this.makeGet(apiUrl);
  }

  recuperaInvitiCampionato(chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../mock/api/read-inviti-campionato.json" : this.serverHost + "/read-inviti-campionato/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  accettaInvito(chiaveInvito: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/esito.json" : this.serverHost + "/accetta-invito/" + chiaveInvito;
    return this.makeGet(apiUrl);
  }

  rifiutaInvito(chiaveInvito: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/esito.json" : this.serverHost + "/rifiuta-invito/" + chiaveInvito;
    return this.makeGet(apiUrl);
  }

  recuperaConfigurazioniCampionato(chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/recupera-configurazioni-campionato.json" : this.serverHost + "/recupera-configurazioni-campionato/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  aggiungiConfigurazioneCampionato(chiaveCampionato: string, chiaveConfigurazione: string, valoreConfigurazione: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/esito.json" : this.serverHost + "/aggiungi-configurazione-campionato";
    return this.makePost(apiUrl, JSON.stringify({ chiaveCampionato, chiaveConfigurazione, valoreConfigurazione }));
  }

  ricercaUtente(chiaveCampionato: string, searchParam: string, options = {}): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/ricerca-utente.json" : this.serverHost + "/ricerca-utente/" + chiaveCampionato + "?searchParam=" + searchParam;
    return this.makeGet(apiUrl, options);
  }

  recuperaSquadreCampionato(chiaveCampionato: string): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/recupera-squadre-campionato.json" : this.serverHost + "/recupera-squadre-campionato/" + chiaveCampionato;
    return this.makeGet(apiUrl);
  }

  uploadAzioni(file: any): Observable<any> {
    const apiUrl = this.isLocalValue ? "../../.mock/api/esito.json" : this.serverHost + "/csv/upload-azioni";
    return this.makePostFormData(apiUrl, file);
  }

  private makeGet(apiUrl: string, options: { signal?: AbortSignal } = {}): Observable<any> {
    return this.http.get(apiUrl, { ...options, withCredentials: true });
  }

  private makePost(apiUrl: string, body: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(apiUrl, body, { headers, withCredentials: true });
  }

  private makePostFormData(apiUrl: string, formData: FormData): Observable<any> {
    return this.http.post(apiUrl, formData, { withCredentials: true });
  }
}
