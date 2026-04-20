import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from '../../directives/observe-visibility.directive';

@Component({
  selector: 'app-about',
  imports: [ObserveVisibilityDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
}
