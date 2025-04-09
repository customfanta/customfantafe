import { Component } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-registrazione',
  standalone: true, // Indica che il componente è standalone
  imports: [RouterLink], // Aggiungi RouterLink agli import
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {
  constructor(private apiCaller: ApiCallerService) {}

  async handleRegister(event: Event): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const username = (form.querySelector('[name="username"]') as HTMLInputElement).value;
    const nome = (form.querySelector('[name="nome"]') as HTMLInputElement).value;
    const email = (form.querySelector('[name="email"]') as HTMLInputElement).value;
    const password = (form.querySelector('[name="password"]') as HTMLInputElement).value;

    try {
      const esito = await this.apiCaller.creaUtente(username, nome, email, password).toPromise();

      if (esito && esito.esito === 'OK') {
        window.location.href = 'index.html';
      } else {
        alert(
          'Errore nella registrazione: ' +
            (esito?.message || 'Controlla i dati inseriti.')
        );
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    }
  }
}
