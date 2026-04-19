import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ServicesComponent } from './components/services/services';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('mi-app');
  private location = inject(Location);
  private router = inject(Router);
  private intersectionObserver: IntersectionObserver | null = null;

  ngOnInit() {
    // Detectar cambios en la URL
    this.router.events.subscribe(() => {
      this.scrollToCurrentSection();
    });
    
    // Scroll inicial si hay una sección en la URL
    this.scrollToCurrentSection();
    
    // Observar secciones para actualizar URL al hacer scroll
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    // Limpiar observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private scrollToCurrentSection() {
    const path = this.location.path();
    // Extraer el sectionId de la ruta (ej: "/about" -> "about")
    const sectionId = path.replace('/', '');
    
    if (sectionId && sectionId !== '') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  private setupIntersectionObserver() {
    const sections = ['inicio', 'about', 'services', 'contact'];
    
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.location.go('/' + sectionId);
        }
      });
    }, options);

    // Observar cada sección
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element && this.intersectionObserver) {
        this.intersectionObserver.observe(element);
      }
    });
  }
}
