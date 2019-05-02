import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent implements OnInit, OnChanges {

  @Input() formControlInput: FormControl;
  @Input() errorMessageResource: any;
  @Input() label: any;
  @Input() class: string;
  @Input() required = false;
  mensagensErro: any[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.montarMensagensDeErro();
  }

  montarMensagensDeErro(): any {
    this.mensagensErro = [];
    if (this.errorMessageResource) {
      for (const _key in this.errorMessageResource) {
        if (_key) {
          const objetoMSG = {
            key: _key,
            mensagem: this.errorMessageResource[_key]
          };
          this.mensagensErro.push(objetoMSG);
        }
      }
    }
  }

  get IsRequired() {
    if (this.required) {
      return true;
    }
    const obrigatorio = this.formControlInput.hasError('required') || this.formControlInput.hasError('requiredIf');
    return obrigatorio;
  }

}
