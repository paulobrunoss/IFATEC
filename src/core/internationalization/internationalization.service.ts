import { Injectable, EventEmitter } from '@angular/core';
/**
* Service responsible for manage language.
*/
@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  idiomas = ['pt-BR'];
  /**
   * Set the default language.
   */
  private actualLanguage;
  private index;

  constructor() {

    // Verificações removidas para que seja setado o idioma portugues ate que a Api de Internacionalização esta funcionando
    // if (this.actualLanguage === undefined) {
      // this.index = this.idiomas.indexOf(navigator.language);
      // if (this.index > -1 ) {
      //   this.actualLanguage = this.idiomas[this.index];
      // } else {
        this.actualLanguage = this.idiomas[0];
        // this.idiomas.forEach(element => {
        //   this.index = element.split('-').indexOf(navigator.language);
        //   if (this.index > -1 ) {
        //     this.actualLanguage = element;
        //     return;
        //   }
        // });
      // }
    // }
  }

  /**
   * Event to propagate the language change throughout the site.
   */
  onLanguageChanged = new EventEmitter();

  /**
   * Set the selected language.
   * @param language Chosen language.
   */
  setLanguage(language: string): void {
    this.actualLanguage = language;
    this.onLanguageChanged.emit(this.actualLanguage);
  }

  /**
   * Get the actual language
   */
  getLanguage(): string {
    return this.actualLanguage;
  }
}
