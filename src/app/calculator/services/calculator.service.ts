import { Injectable, input, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    // validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input: ' + value);
      return;
    }

    // =
    if (value === '=') {
      // TODO: implementar calculo+
      console.log('TODO: implementar calculo');
      return;
    }

    // Limpiar resultados
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    //TODO: revisar cuando tengamos numeros negativos
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((previousValue) => previousValue.slice(0, -1));

      return;
    }

    // Aplicar Operador
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //Limitar caracteres
    if (this.resultText().length >= 10) {
      console.log('Limite de caracteres alcanzado');
      return;
    }

    // validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }

    // Manejo de el cero a la izquierda
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    // Cambiar signo
    if (value === '+/-') {
      // if (this.resultText() === '0') return;
      this.resultText.update((text) =>
        text.startsWith('-') ? text.slice(1) : '-' + text
      );
      return;
    }

    // Números
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((text) => text + value);
      return;
    }
  }
}
