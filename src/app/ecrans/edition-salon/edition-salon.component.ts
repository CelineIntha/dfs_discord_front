import { Component, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { Salon } from '../../models/salon.type';
import { Serveur } from '../../models/serveur.type';
@Component({
  selector: 'app-edition-salon',
  standalone: true,
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortHeader,
    MatSort,
  ],
  templateUrl: './edition-salon.component.html',
  styleUrl: './edition-salon.component.scss'
})
export class EditionSalonComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  snackBar: MatSnackBar = inject(MatSnackBar);

  formulaire: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    _id_serveur: ['', Validators.required],
    public: [false, []],
    urlLogo: ['', []],
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const serveurId = params['serveurId'];
      if (serveurId) {
        this.formulaire.patchValue({ _id_serveur: serveurId });
      }
    });
  }

  onAjoutSalon() {
    if (this.formulaire.valid) {
      this.http.post('http://localhost:3000/salon', this.formulaire.value).subscribe(() => {
        this.snackBar.open('Le salon a bien été ajouté', undefined, {
          duration: 3000,
        });
        this.router.navigateByUrl('/principal');
      });
    }
  }
}
