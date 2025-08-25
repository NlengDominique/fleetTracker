import { Routes } from '@angular/router';
import { VehiculeList } from './components/vehicule-list/vehicule-list';
import { AddVehicule } from './components/add-vehicule/add-vehicule';

export const routes: Routes = [
  {
    path: 'dashboard',
    redirectTo: 'vehicules',
  },

  {
    path: 'vehicules',
    component: VehiculeList,
  },
  {
    path:'vehicule/add',
    component:AddVehicule
  },


];
