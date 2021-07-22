import { Component, Input, OnInit } from '@angular/core';
import { SearchElement } from '../bin/wiki-response';

@Component({
  selector: 'app-site-item',
  templateUrl: './site-item.component.html',
  styleUrls: ['./site-item.component.sass']
})
export class SiteItemComponent implements OnInit {

  @Input()
  public item: SearchElement | null = null;

  constructor() { }

  ngOnInit() {}

}
