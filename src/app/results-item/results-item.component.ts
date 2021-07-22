import { Component, Input, OnInit } from '@angular/core';
import { SearchElement, WikiResponse } from '../bin/wiki-response';

@Component({
  selector: 'app-results-item',
  templateUrl: './results-item.component.html',
  styleUrls: ['./results-item.component.sass']
})
export class ResultsItemComponent implements OnInit {
  public lastQuery: string | undefined;
  @Input()
  public set result(value: WikiResponse | null){
    this.res = value?.query?.search;
    this.res?.forEach( item => {
      item.snippet += '...';
    })
  }
  public res: SearchElement[] | undefined;

  constructor() { }

  ngOnInit() { }
}
