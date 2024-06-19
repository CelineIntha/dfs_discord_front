import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Message } from '../../models/message.type';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Utilisateur } from '../../models/utilisateur.type';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Salon } from '../../models/salon.type';
import { NgFor, NgIf } from '@angular/common';
import { ListeUtilisateursComponent } from '../liste-utilisateurs/liste-utilisateurs.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    ListeUtilisateursComponent
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {
  @Input() salonId: string | null = null;
  listeMessage: Message[] = [];
  formulaire: FormGroup;
  userId: string | null = null;
  usersList: Utilisateur[] = []; 
  currentServeurId: string = ''; 

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private snackBar: MatSnackBar) { 
    this.formulaire = this.formBuilder.group({
      contenu: ['', [Validators.required]],
      _id_utilisateur: [`${this.userId}`, Validators.required],
      _id_salon: [`${this.salonId}`] 
    });
    this.getUserId();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['salonId'] && this.salonId) {
      this.formulaire.patchValue({ _id_salon: this.salonId });
      this.fetchMessages();
    }
  }

  getUserId() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.http.get<Utilisateur>('http://localhost:3000/utilisateur/me')
        .subscribe(
          (data) => {
            this.userId = data._id;
            this.formulaire.patchValue({ _id_utilisateur: this.userId });
          },
          error => {
            console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
          }
        );
    }
  }

  blockUser(userId: string) {
    if (!this.currentServeurId) {
      console.error('currentServeurId is not set.');
      return;
    }

    const url = `http://localhost:3000/utilisateur/block/${this.currentServeurId}/${userId}`;
    this.http.post(url, {})
      .subscribe(
        () => {
          console.log(`Utilisateur avec ID ${userId} bloqué avec succès.`);
        },
        error => {
          console.error(`Erreur lors du blocage de l'utilisateur avec ID ${userId}:`, error);
        }
      );
  }

  fetchMessages() {
    const jwt = localStorage.getItem('jwt');

    if (jwt && this.salonId) {
      this.http.get<Message[]>(`http://localhost:3000/message/${this.salonId}`)
        .subscribe(
          (listeMessage) => {
            this.listeMessage = listeMessage;
          },
          error => {
            console.error('Erreur lors de la récupération des messages:', error);
          }
        );
    }
  }

  onMessageSubmit() {
    if (this.formulaire.valid && this.salonId) {
      this.http.post('http://localhost:3000/message', this.formulaire.value)
        .subscribe(
          () => {
            this.snackBar.open('Le message a bien été ajouté', undefined, { duration: 3000 });
            this.fetchMessages();
            this.formulaire.reset(); 
          },
          error => {
            console.error('Erreur lors de l\'ajout du message:', error);
          }
        );
    }
  }

  trackById(index: number, item: Message): string {
    return item._id;
  }
}