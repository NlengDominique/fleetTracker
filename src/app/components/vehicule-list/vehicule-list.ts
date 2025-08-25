import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Vehicule, VehiculeService } from '../../services/vehicule-service';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-vehicule-list',
  imports: [RouterOutlet, NgClass,RouterLink],
  templateUrl: './vehicule-list.html',
  styleUrl: './vehicule-list.css'
})
export class VehiculeList implements OnInit {
  

  constructor() {}

  private vehiculeService = inject(VehiculeService);

  protected vehicules : Vehicule[] = [];

  protected loading = signal(false);


  ngOnInit(): void {
    this.vehiculeService.getVehicules().subscribe({
      next: (data) => {
        this.loading.set(true);
        this.vehicules = data;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des véhicules :', err);
      }
    });
  }

  
  

 
}
