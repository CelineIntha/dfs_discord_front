import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Utilisateur } from '../../models/utilisateur.type';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  imports: [MatIcon, NgFor],
  templateUrl: './liste-utilisateurs.component.html',
  styleUrl: './liste-utilisateurs.component.scss'
})
export class ListeUtilisateursComponent {
  @Input() users: Utilisateur[] = [];
  @Input() serveurId: string = '';

  constructor(private http: HttpClient) { }

  blockUser(userId: string) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.http.post<any>(`http://localhost:3000/block/${this.serveurId}/${userId}`, { serveurId: this.serveurId, userId })
        .subscribe(
          () => {
            console.log(`Utilisateur avec ID ${userId} bloqué avec succès.`);
          },
          error => {
            console.error(`Erreur lors du blocage de l'utilisateur avec ID ${userId}:`, error);
          }
        );
    }
  }
}