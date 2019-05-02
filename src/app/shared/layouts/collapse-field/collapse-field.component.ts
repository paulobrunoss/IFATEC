import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-collapse-field',
  templateUrl: './collapse-field.component.html'
})
export class CollapseFieldComponent implements OnInit, OnChanges {

  first;
  allItems;
  expand = false;
  @Input() lista;

  constructor() { }

  ngOnInit() {
    this.tratarItems();
  }

  ngOnChanges() {
    this.tratarItems();
  }

  tratarItems() {
    this.first = this.lista[0];
    this.allItems = this.lista;
  }

  expandirItems() {
    this.expand = true;
  }

  colapsarItems() {
    this.expand = false;
  }
}
