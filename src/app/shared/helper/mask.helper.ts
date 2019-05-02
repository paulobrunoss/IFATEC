import { FormGroup } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

export function MaskedDate(event: any) {
  const v = event.target.value;

  if (v.match(/^\d{2}$/) !== null) {
    event.target.value = v + '/';
  } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
    event.target.value = v + '/';
  }
}

// export class MaskTexto {
//   static registraPipeCaracterEspeciais(formulario, lista: any[]) {
//     const pipeCaracterEspecial = new FiltroCaracterEspecialPipe();
//     lista.forEach(campo => {
//       formulario.get(campo).valueChanges.subscribe(texto => {
//         formulario.get(campo).setValue(
//           pipeCaracterEspecial.validarTexto(texto),
//           { emitEvent: false }
//         );
//       });
//     });
//   }
// }

export class MascaraComPipe {

  /**
   * Helper para registrar mascaras de input através de pipes
   * @param  {FormGroup} formulario - Formulario onde estao os campos
   * @param  {string[]} lista - Lista com os nomes dos campos que vao receber o valor
   * @param  {Pipe[]} pipes - lista de pipes que vão fazer a mudança,
   * lembrando que a ordem dentro dessa lista importa para o reultado final da mascara,
   */
  static registrarPipes(formulario: FormGroup, lista: string[], pipes: PipeTransform[]) {

    lista.forEach(campo => {
      formulario.get(campo).valueChanges.subscribe(texto => {
        let valorTransformado = texto;
        pipes.forEach(pipe => {
          valorTransformado = pipe.transform(valorTransformado);
        });

        formulario.get(campo).setValue(
          valorTransformado,
          { emitEvent: false }
        );
      });
    });

  }
}
