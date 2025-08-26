import { Routes } from '@angular/router';
import { VehiculeList } from './components/vehicule-list/vehicule-list';
import { AddVehicule } from './components/add-vehicule/add-vehicule';
import { EditVehicule } from './components/edit-vehicule/edit-vehicule';
import { FleetOperational } from './components/fleet-operational/fleet-operational';

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

  {
    path:'vehicule/edit/:id',
    component:EditVehicule
  },
  {
    path: 'stats',
    component: FleetOperational,
  }


];
