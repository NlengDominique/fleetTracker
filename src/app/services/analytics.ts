import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface FleetComposition {
  type_moteur: string;
  nb_vehicules: number;
  proportion: number;
}

export interface IFleetOperational {
  statut: string;
  nb_vehicules: number;
}

@Injectable({
  providedIn: 'root'
})
export class Analytics {
  
   private apiUrl = 'http://127.0.0.1:8000/api/v1'

   private http = inject(HttpClient);


   getFleetComposition() {
    return this.http.get<FleetComposition[]>(`${this.apiUrl}/analytics/fleet-composition`);
   }

   getFleetOperational() {
    return this.http.get<IFleetOperational[]>(`${this.apiUrl}/analytics/fleet-operational/vehicle`);
   }


}
