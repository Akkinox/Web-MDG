import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api'; // Cambiar a tu URL de producción

  constructor(private http: HttpClient) { }

  sendContactEmail(formData: ContactForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-email`, formData);
  }
}

