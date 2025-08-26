import { Component, inject, OnInit, signal,PLATFORM_ID, ChangeDetectorRef, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Analytics, FleetComposition } from './services/analytics';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { FleetOperational } from './components/fleet-operational/fleet-operational';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,ChartModule,FleetOperational],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true

})
export class App implements OnInit {

constructor(private cd: ChangeDetectorRef) {
  
  effect(() => {
    if (this.fleetComposition().length > 0) {
     
    }
  });
}

  protected loading = signal(false);

  analyticsService = inject(Analytics);

  protected fleetComposition = signal([] as FleetComposition[]);


  ngOnInit(): void {
    this.getFleetComposition();
    this.initChart();
    
  }

  getFleetComposition() {
    this.loading.set(true);
    this.analyticsService.getFleetComposition().subscribe({
      next: (data) => {
        this.fleetComposition.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la composition de la flotte :', err);
        this.loading.set(false);
      },
    });
  }

    protected options: any;

    protected  data: FleetComposition | any;

    platformId = inject(PLATFORM_ID);

    initChart() {
      if (isPlatformBrowser(this.platformId)) {
        if (this.fleetComposition().length > 0) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');

          const fleetData = this.fleetComposition();
          const labels = fleetData.map(item => item.type_moteur);

          this.data = {
            labels: labels,
            datasets: [
              {
                data: fleetData.map(item => item.proportion),
                backgroundColor: [
                 documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')
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
