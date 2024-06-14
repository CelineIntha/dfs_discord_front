import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Salon } from '../../models/salon.type';
import { Utilisateur } from '../../models/utilisateur.type';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltipModule, MessageComponent, MatButtonModule],
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss']
})
export class SalonComponent implements OnChanges {
  @Input() serveurId: string | null = null;
  // listeUtilisateur: Utilisateur[] = [];
  listeSalon: Salon[] = [];
  messageVisible = false;
  salonSelectionneId: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['serveurId'] && this.serveurId) {
      console.log(`Chargement des salons pour le serveurId: ${this.serveurId}`);
      this.fetchSalons();
      // this.fetchUtilisateurs();
    }
  }

  fetchSalons() {
    const jwt = localStorage.getItem('jwt');

    if (jwt && this.serveurId) {
      this.http.get<Salon[]>(`http://localhost:3000/salon/${this.serveurId}`)
        .subscribe(
          (listeSalon) => {
            this.listeSalon = listeSalon;
          },
          error => {
            console.error('Erreur lors de la récupération des salons:', error);
          }
        );
    }
  }

  afficherMessageBySalon(salonId: string) {
    this.messageVisible = true;
    this.salonSelectionneId = salonId;
  }

}
