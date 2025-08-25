import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Vehicule, VehiculeService } from '../../services/vehicule-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-vehicule-list',
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './vehicule-list.html',
  styleUrl: './vehicule-list.css',
})
export class VehiculeList implements OnInit {
  private vehiculeService = inject(VehiculeService);

  protected vehicules = signal([] as Vehicule[]);

  protected loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.vehiculeService.getVehicules().subscribe({
      next: (data) => {
       this.vehicules.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des véhicules :', err);
        this.loading.set(false);
      },
    });
  }

  deleteVehicule(id: string | undefined) {
    if (confirm('Voulez-vous vraiment supprimer ce véhicule ?')) {
      this.vehiculeService.deleteVehicule(id).subscribe({
        next: () => {
          console.log('Véhicule supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du véhicule :', err);
        },
      });
    }
  }
}
