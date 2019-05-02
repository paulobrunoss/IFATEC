import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  loaders = [];
  constructor() {}

  ngOnInit() {}

  exibirLoader(name) {
    this.loaders.push(name);
  }

  fecharLoader(name) {
    this.loaders = this.loaders.filter(item => item !== name);
  }

  resetarLoader() {
    this.loaders = [];
  }
}
