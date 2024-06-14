export interface Message {
  _id: string;
  contenu: string;
  _id_salon: string;
  _id_utilisateur: {
    _id: string;
    prenom: string;
    nom: string;
    urlAvatar: string;
  };
}
