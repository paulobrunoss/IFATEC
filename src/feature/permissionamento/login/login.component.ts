import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArmazenamentoGlobalService } from 'src/core/armazenamento-global/armazenamento-global.service';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { UsuarioModel } from '../usuario.model';
import { FieldsValidators } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  fieldsValidators = new FieldsValidators();
  formulario: FormGroup;
  disabled = true;
  hide = false;
  ListaGrupoSeguranca: any[];
  subscriptions = new Subscription();
  MSG_FALTA_GRUPO_SEGURANCA;

  constructor(
    private readonly router: Router,
    private readonly storage: ArmazenamentoGlobalService,
    private readonly mensagem: MensagemService,
    private readonly fb: FormBuilder,
    private readonly loaderService: LoaderService
  ) {
    this.loaderService.resetarLoader();
  }

  ngOnInit() {

    this.iniciarFormulario();
  }

   /**
   * Método responsável por inicializar o formulário(FormBuilder) e suas validalições
   */
  private iniciarFormulario() {
    this.formulario = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });

    this.disabled = false;

    this.formulario.setValidators([
      this.fieldsValidators.campoEmBranco('login'),
      this.fieldsValidators.campoEmBranco('senha')
    ]);
  }

  /**
   * submete formulario para novo cadastro
   * @param formulario
   */
  onSubmit() {
    if (this.formulario.invalid) {
      if (!this.formulario.get('login').value) {
        this.formulario.get('login').markAsTouched();
      }
      if (!this.formulario.get('senha').value) {
        this.formulario.get('senha').markAsTouched();
      }
    }

    if (this.formulario.valid) {
      const usuario = this.converterFormularioParaModel(this.formulario);
    }

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  /**
   * Limpa o formulário.
   */
  limpar() {
    this.formulario.reset();
    this.disabled = false;
  }

  /**
  * converte formulario para model
  * @param formulario
  */
  converterFormularioParaModel(formulario: any) {
    const usuario = new UsuarioModel();
    const key = CryptoJS.enc.Utf8.parse('chave_ifatec123456');
    const iv = CryptoJS.enc.Utf8.parse('');
    const senha = CryptoJS.enc.Utf8.parse(formulario.value.senha);

    const encrypted = CryptoJS.AES.encrypt(senha, key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });


    usuario.Login = formulario.value.login;
    usuario.Senha = encrypted.toString();

    return usuario;
  }

  /**
   * Metodo responvel por demonstrar e/ou ocultar a senha digitada.
   */
  espiar() {
    this.hide = !this.hide;
    const espiar = document.getElementById('senha');
    if (this.hide) {
      espiar.setAttribute('type', 'text');
    } else {
      espiar.setAttribute('type', 'password');
    }

  }

}
