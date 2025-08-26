import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Statut = 'in_use' | 'available' | 'charging';

export type TMoteur = 'ICE' | 'BEV';

interface VehiculeDate {
  human: string;
  string: string;
  local: string;
  timestamp: number;
}

export interface Vehicule {
  id?: string;
  marque: string;
  modele: string;
  type_moteur: TMoteur;
  statut?: Statut;
  created_at?: VehiculeDate;
  updated_at?: VehiculeDate;
}

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1'
  
  private http = inject(HttpClient);

  getVehicules() {
   
    return this.http.get<Vehicule[]>(`${this.apiUrl}/vehicles`);

  }

  addVehicule(vehicule:Vehicule) {
  
    return this.http.post<Vehicule>(`${this.apiUrl}/vehicles`, vehicule);
  }

  deleteVehicule(id:string| undefined) {
    return this.http.delete(`${this.apiUrl}/vehicles/${id}`)
  }

  updateVehicule(id:string| undefined, vehicule:Vehicule) {
    return this.http.put<Vehicule>(`${this.apiUrl}/vehicles/${id}`, vehicule);
  }

  getVehicule(id:string| null) {
    return this.http.get<Vehicule>(`${this.apiUrl}/vehicles/${id}`);
  }
   
}
