import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Analytics, IFleetOperational } from '../../services/analytics';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-fleet-operational',
  imports: [ChartModule],
  templateUrl: './fleet-operational.html',
  styleUrl: './fleet-operational.css',
})
export class FleetOperational implements OnInit {


  constructor(private cd: ChangeDetectorRef) {
    effect(() => {
     if (this.fleetOperational().length > 0) {
      this.Chart();
      console.log('FleetOperational effect triggered');
    }

  
    });
  }
  ngOnInit(): void {
    this.getFleetOperational();
    this.Chart();
  }
  protected analyticsService = inject(Analytics);

  protected fleetOperational = signal([] as IFleetOperational[]);

  getFleetOperational() {
    this.analyticsService.getFleetOperational().subscribe({
      next: (data) => {
        this.fleetOperational.set(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la composition de la flotte :', err);
      },
    });
  }

  protected options: any;

  protected data: IFleetOperational | any;

  platformId = inject(PLATFORM_ID);

   Chart() {
      if (isPlatformBrowser(this.platformId)) {
        if (this.fleetOperational().length > 0) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');

          const fleetData = this.fleetOperational();
          const labels = fleetData.map(item => item.statut);

          this.data = {
            labels: labels,
            datasets: [
              {
                data: fleetData.map(item => item.nb_vehicules),
                backgroundColor: [
                 documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-gray-500')
                ],
              },
            ],
          }

            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
          this.cd.markForCheck();
        }
      }
    }


    
}
