import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private emailService: EmailService) {}

  submitForm() {
    // Validar que los campos requeridos estén completos
    if (!this.formData.name || !this.formData.email || !this.formData.phone || !this.formData.message) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      setTimeout(() => this.errorMessage = '', 5000);
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.emailService.sendContactEmail(this.formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = '¡Mensaje enviado correctamente! Nos contactaremos pronto.';
        this.resetForm();
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Error al enviar el mensaje. Intenta nuevamente.';
        console.error('Error:', error);
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    };
  }
}
