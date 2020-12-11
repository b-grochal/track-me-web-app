import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth-guard';
import { TripsComponent } from './trips.component';
import { AllTripsListComponent } from './views/all-trips-list/all-trips-list.component';
import { BasicUserTripsListComponent } from './views/basic-user-trips-list/basic-user-trips-list.component';
import { TripSensorDataComponent } from './views/trip-sensor-data/trip-sensor-data.component';

const routes: Routes = [
    {
      path: '',
      component: TripsComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      data: {
        expectedRole: 'Admin'
      },
      children: [
        { path: 'all', component: AllTripsListComponent, data: {expectedRole: 'Admin'} },
        { path: 'list', component: BasicUserTripsListComponent, data: {expectedRole: 'Admin'} },
        { path: ':id/sensor-data', component: TripSensorDataComponent, data: {expectedRole: 'Admin, BasicUser'} }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TripsRoutingModule {}