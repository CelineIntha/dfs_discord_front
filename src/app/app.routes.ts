import { Routes } from '@angular/router';
import { ConnexionComponent } from './ecrans/connexion/connexion.component';
import { Page404Component } from './ecrans/page404/page404.component';
import { PrincipalComponent } from './ecrans/principal/principal.component';
import { EditionServeurComponent } from './ecrans/edition-serveur/edition-serveur.component';
import { InscriptionComponent } from './ecrans/inscription/inscription.component';
import { userGuard } from './guards/user.guard';
import { SalonComponent } from './ecrans/salon/salon.component';
import { EditionSalonComponent } from './ecrans/edition-salon/edition-salon.component';
import { ProfilComponent } from './ecrans/profil/profil.component';
import { MessageComponent } from './ecrans/message/message.component';

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'salons', component: SalonComponent },
  { path: 'ajout-salon', component: EditionSalonComponent },
  { path: 'salon', component: MessageComponent },
  // { path: 'serveur/:id', component: EditionServeurComponent, title: 'Server :name' },
  { path: 'profil', component: ProfilComponent, canActivate: [userGuard] },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [userGuard],
  },
  {
    path: 'ajout-serveur',
    component: EditionServeurComponent,
    canActivate: [userGuard],
  },
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];