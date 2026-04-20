import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from '../../directives/observe-visibility.directive';

@Component({
  selector: 'app-services',
  imports: [ObserveVisibilityDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent {}
