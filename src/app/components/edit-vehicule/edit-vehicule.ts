import { Component, signal,inject, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TMoteur, Vehicule, VehiculeService } from '../../services/vehicule-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
 

@Component({
  selector: 'app-edit-vehicule',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-vehicule.html',
  styleUrl: './edit-vehicule.css'
})
export class EditVehicule implements OnInit{

  
 
  protected vehicule = signal({} as Vehicule)

  protected errors = signal(null)

  private vehiculeService = inject(VehiculeService);

   private activatedRoute = inject(ActivatedRoute);

  protected vehicleId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    private router = inject(Router);
  
    protected loading = signal(false)

   constructor() {

   }
  ngOnInit(): void {
    this.vehiculeService.getVehicule(this.vehicleId).subscribe({
      next: (data) => {
        this.vehicule.set(data)
      },
      error: (err) => {
        // this.errors.set(err)
        console.error('Erreur lors du chargement du véhicule :', err);
      },
    });
  }

  vehiculeForm = new FormGroup({
    marque: new FormControl('', { nonNullable: true }),
    modele: new FormControl('', { nonNullable: true }),
    type_moteur: new FormControl('', { nonNullable: true })
  });

  onSubmit() {
      if (this.vehiculeForm.valid) {
        const vehicule: Vehicule = {
          marque: this.vehiculeForm.value.marque!,
          modele: this.vehiculeForm.value.modele!,
          type_moteur: this.vehiculeForm.value.type_moteur! as TMoteur
        };
  
         this.loading.set(true)
        this.vehiculeService.updateVehicule(this.vehicleId,vehicule).subscribe({
          next: (data) => {
            console.log('Véhicule modifie avec succès :', data);
            this.vehiculeForm.reset();
            this.router.navigate(['/vehicules']);
          },
          error: (err) => {
            this.loading.set(false)
            // this.errors.set(err)
            console.error('Erreur lors de la modification du véhicule :', err);
          }
        });
      }
    }
    
  

}
