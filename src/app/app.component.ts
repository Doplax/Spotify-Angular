import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggerService } from '@shared/services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'spotify';

  constructor(private logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.log('Environment:', environment.environmentName);
  }
}
