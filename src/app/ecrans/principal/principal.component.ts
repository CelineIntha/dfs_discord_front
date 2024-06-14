import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Serveur } from '../../models/serveur.type';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SalonComponent } from '../salon/salon.component';
import { Utilisateur } from '../../models/utilisateur.type';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, SalonComponent, RouterLink],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  listeServeur: Serveur[] = [];
  salonVisible = false;
  serveurSelectionneId: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http.get<Serveur[]>('http://localhost:3000/serveur/possede')
        .subscribe((listeServeur) => {
          this.listeServeur = listeServeur;
        });
    }
  }

  afficherSalon(serveurId: string) {
    this.salonVisible = true;
    this.serveurSelectionneId = serveurId;
  }

  creerSalon(serveurId: string) {
    this.router.navigate(['/ajout-salon'], { queryParams: { serveurId } });
  }
}
