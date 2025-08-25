import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehicule, VehiculeService } from '../../services/vehicule-service';
import { TMoteur } from '../../services/vehicule-service';
import { Router } from '@angular/router';
import { sign } from 'crypto';

@Component({
  selector: 'app-add-vehicule',
  imports: [ReactiveFormsModule],
  templateUrl: './add-vehicule.html',
  styleUrl: './add-vehicule.css'
})
export class AddVehicule {
  vehiculeForm = new FormGroup({
    marque: new FormControl('', { nonNullable: true }),
    modele: new FormControl('', { nonNullable: true }),
    type_moteur: new FormControl('', { nonNullable: true })
  });

  private router = inject(Router);


  private vehiculeService = inject(VehiculeService);

  onSubmit() {
    if (this.vehiculeForm.valid) {
      const vehicule: Vehicule = {
        marque: this.vehiculeForm.value.marque!,
        modele: this.vehiculeForm.value.modele!,
        type_moteur: this.vehiculeForm.value.type_moteur! as TMoteur
      };

      this.vehiculeService.addVehicule(vehicule).subscribe({
        next: (data) => {
          console.log('Véhicule ajouté avec succès :', data);
          this.vehiculeForm.reset();
          this.router.navigate(['/vehicules']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du véhicule :', err);
        }
      });
    }
  }
}
