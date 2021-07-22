import { Component, OnInit } from '@angular/core';
import { HistoryType, SearchItemResponse, SearchType } from '../bin/types';
import { WikiResponse } from '../bin/wiki-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'search-project';
  public items: HistoryType[] = []
  public result: WikiResponse | null = null;
  public newQuery: SearchType | null = null;
  public hideHistory: boolean = false; 

  constructor(){
    localStorage.history = JSON.stringify([]);    
  }

  ngOnInit(): void {
    let utils = document.querySelector('app-pages-list');
    utils?.classList.add('hidden');
  }
  
  public doSearch(value: SearchItemResponse): void{
    this.result = value.response;
    this.items = JSON.parse(localStorage.history);
    let utils = document.querySelector('app-pages-list');
    utils?.classList.remove('hidden');
  }

  public toggleHistory(value: boolean): void{
    this.hideHistory = !value;
  }

  public switchPage(value: number): void{
    this.newQuery = {
      value: this.items[this.items.length - 1].text,
      offset: value,
      updateHistory: false
    };
  }
}
