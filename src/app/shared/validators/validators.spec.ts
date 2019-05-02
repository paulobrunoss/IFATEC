import { TestBed, inject } from '@angular/core/testing';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ValidatorFn,
    AbstractControl,
    FormControl
} from '@angular/forms';
import * as Moment from 'moment';
import 'moment/locale/pt-br';

import * as Validator from './validators';
import { DataValidators, FieldsValidators } from './validators';

describe('Validator', () => {
    let formulario: any;
    let fieldsValidators: any;
    let dataValidators: any;

    beforeEach(() => {
        fieldsValidators = new FieldsValidators();
        dataValidators = new DataValidators();

        formulario = new FormBuilder().group({
            dataFim: [''],
            dataInicio: [''],
            codigo: ['']
        }
        );

        formulario.setValidators([
            dataValidators.dataMenorQueValidator('dataFim', 'dataInicio'),
            fieldsValidators.campoEmBranco('codigo')
        ]);

        formulario.get('dataInicio').setValue({ jsdate: new Date(2018, 4, 2) });
    });


    describe('deverá validar valores de um formulario ->', () => {
        it('os valores estão válidos, com a data fim vazia', () => {
            formulario.get('codigo').setValue('teste');
            expect(formulario.valid).toBe(true);
        });

        it('os valores estão válidos, com a data fim preenchida corretamente', () => {
            formulario.get('dataFim').setValue({ jsdate: new Date(2018, 4, 4) });
            expect(formulario.valid).toBe(true);
        });

        it('data final preenchida incorretamente', () => {
            formulario.get('dataFim').setValue({ jsdate: new Date(2018, 4, 1) });
            expect(formulario.valid).toBe(false);
        });

        it('codigo escrito incorretamente', () => {
            formulario.get('codigo').setValue('   ');
            expect(formulario.valid).toBe(false);
        });

        it('codigo escrito incorretamente', () => {
            formulario.get('codigo').setValue('undefined');
            expect(formulario.valid).toBe(false);
        });

    });
});
