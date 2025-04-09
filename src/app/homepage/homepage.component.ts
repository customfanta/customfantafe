import { Component } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-homepage',
  standalone: true, // Indica che il componente è standalone
  imports: [RouterLink], // Aggiungi RouterLink agli import
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private apiCaller: ApiCallerService, private router: Router) {}

  async handleLogin(event: Event): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const username = (form.querySelector('[name="username"]') as HTMLInputElement).value;
    const password = (form.querySelector('[name="password"]') as HTMLInputElement).value;

    try {
      const utente = await this.apiCaller.effettuaAccesso(username, password).toPromise();

      if (utente) {
        localStorage.setItem('user', JSON.stringify(utente));
        this.router.navigate(['/campionati']);
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  }
}
