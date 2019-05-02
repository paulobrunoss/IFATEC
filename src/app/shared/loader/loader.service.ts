import { Injectable } from '@angular/core';
import { LoaderComponent } from './loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderComponent: LoaderComponent;

  constructor() {}

  exibirLoader(name) {
    this.loaderComponent.exibirLoader(name);
  }

  fecharLoader(name) {
    this.loaderComponent.fecharLoader(name);
  }

  resetarLoader() {
    this.loaderComponent.resetarLoader();
  }
}
