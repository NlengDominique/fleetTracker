import { Component, inject, OnInit, signal,effect, EffectRef } from '@angular/core';
import { RouterLink} from '@angular/router';
import { Vehicule, VehiculeService } from '../../services/vehicule-service';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-vehicule-list',
  imports: [ RouterLink,TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule,CommonModule],
  templateUrl: './vehicule-list.html',
  styleUrl: './vehicule-list.css',
})
export class VehiculeList implements OnInit {


  private vehiculeService = inject(VehiculeService);

  protected vehicules = signal([] as Vehicule[]);

  protected loading = signal(false);

  constructor() {

    effect(() => {
      if(this.vehicules().length > 0){
        const veh = this.vehicules();
      }
    })
  }
   

 

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
          this.vehicules.set(this.vehicules().filter(v => v.id !== id));
          console.log('Véhicule supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du véhicule :', err);
        },
      });
      
    }
  }
}
