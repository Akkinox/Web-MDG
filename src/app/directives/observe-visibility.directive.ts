import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appObserveVisibility]',
  standalone: true
})
export class ObserveVisibilityDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  
  // false = no ocultar al inicio (para Hero), true = ocultar al inicio (para otros elementos)
  @Input() hideOnInit: boolean = true;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Agregar clase inicial solo si hideOnInit es true
    if (this.hideOnInit) {
      this.el.nativeElement.classList.add('fade-in-hidden');
    }

    // Configurar el Intersection Observer
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // El elemento entra en el viewport - FADE IN
          this.el.nativeElement.classList.remove('fade-out-hidden');
          this.el.nativeElement.classList.add('fade-in-visible');
        } else {
          // El elemento sale del viewport - FADE OUT
          this.el.nativeElement.classList.remove('fade-in-visible');
          this.el.nativeElement.classList.add('fade-out-hidden');
        }
      });
    }, options);
    
    // Empezar a observar el elemento
    this.observer.observe(this.el.nativeElement);

    // Si hideOnInit es true, chequear si ya está visible al cargar
    if (this.hideOnInit) {
      setTimeout(() => {
        if (this.el.nativeElement.getBoundingClientRect().top < window.innerHeight) {
          this.el.nativeElement.classList.remove('fade-in-hidden');
          this.el.nativeElement.classList.add('fade-in-visible');
        }
      }, 50);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}


