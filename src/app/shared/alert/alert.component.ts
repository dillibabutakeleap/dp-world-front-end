import {Component, OnInit} from '@angular/core';
import {Alert, AlertType} from './models/alert';
import {AlertService} from './services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']
})
export class AlertComponent implements OnInit {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            //allowing only one alert at a time
            this.alerts = [];

            // add alert to array
            alert['id'] = Math.random().toString();
            this.alerts.push(alert);

        });

    }

    removeAlert(alert: Alert) {
        console.log(this.alerts)
        console.log(alert)

        this.alerts = this.alerts.filter(x => x.id !== alert.id);
        console.log(this.alerts)
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}
