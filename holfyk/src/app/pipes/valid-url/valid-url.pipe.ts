import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validUrlPipe',
  standalone: true,
})
@Injectable({
  providedIn: 'root', // Це забезпечить пайп глобально доступним
})
export class ValidUrlPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Замінюємо пробіли на дефіси
    let sanitizedValue = value.replace(/\s+/g, '-');

    // Видаляємо апострофи та інші небажані символи
    sanitizedValue = sanitizedValue.replace(/[\'\`]/g, '');

    return sanitizedValue;
  }
}
