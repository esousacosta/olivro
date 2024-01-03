import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// For reference
// https://github.com/valor-software/ng2-charts
// https://valor-software.com/ng2-charts/#LineChart

@Component({
  selector: 'olv-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss'],
})
// TODO: remove the dots on the data points so they behave
// like idealo's
export class PriceChartComponent {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Histórico de preços',
        backgroundColor: 'rgba(0,255,0,0.3)',
        borderColor: 'green',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartType: ChartType = 'line';
}
