import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppLinkService {
  buildLink(phone: string | null | undefined, message: string): string | null {
    const normalized = this.normalizePhone(phone);
    if (!normalized) {
      return null;
    }

    return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
  }

  openChat(phone: string | null | undefined, message: string): void {
    const link = this.buildLink(phone, message);
    if (!link || typeof window === 'undefined') {
      return;
    }

    window.open(link, '_blank', 'noopener,noreferrer');
  }

  private normalizePhone(phone: string | null | undefined): string | null {
    if (!phone) {
      return null;
    }

    const digits = phone.replace(/\D/g, '');
    if (!digits) {
      return null;
    }

    if (digits.startsWith('20')) {
      return digits;
    }

    if (digits.startsWith('01') && digits.length === 11) {
      return `20${digits.slice(1)}`;
    }

    return digits;
  }
}