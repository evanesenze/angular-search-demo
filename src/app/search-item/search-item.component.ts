import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchItemResponse, SearchType } from '../bin/types';
import { SearchElement, WikiResponse } from '../bin/wiki-response';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.sass']
})
export class SearchItemComponent implements OnInit {
  public totalhits: number | undefined = 0;
  public srsort: string = 'relevance';
  public latsQuery: string | undefined;

  @Input()
  public set newQuery(query: SearchType | null){
    if(!query) return;
    this.search(query?.value, query?.offset, query?.updateHistory);
  }

  @Output() doSearch = new EventEmitter<SearchItemResponse>();

  @Output() activeBtn = new EventEmitter<boolean>();

  constructor(private _search: SearchService) { }

  ngOnInit() {
    let input = document.querySelector('input');
    input?.addEventListener('focus', () => {
      let search = document.querySelector('.input');
      search?.classList.add('input-selected');
    });
    input?.addEventListener('blur', () => {
      let search = document.querySelector('.input');
      search?.classList.remove('input-selected');
    });
    input?.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        this.search(input?.value);
      }
    });
    let historyBtn = document.querySelector('.history-btn');
    historyBtn?.addEventListener('click', e => {
      historyBtn?.classList.toggle('active-btn');
      this.activeBtn.emit(!historyBtn?.classList.contains('active-btn'));
    })
    let utils = document.querySelector('app-utils-item');
    utils?.classList.add('hidden');
  }

  public newSrsort(newSrsort: string): void{
    this.srsort = newSrsort;
    this.search(this.latsQuery, 0, false);
  }

  public search(value: string | undefined, offset: number = 0, updateHistory: boolean = true): void{
    if (!value) return;
    this.latsQuery = value;
    this._search.req(value, this.srsort, offset).then((response: WikiResponse) => {
      if(!response) return;
      response?.query?.search.forEach((item: SearchElement) => {
        let date = new Date(item.timestamp || '');
        let str = this.getDateAsStr(date);
        item.timestamp = str;
      })
      if(updateHistory)
        this.updateLocalStorage(value);
      this.totalhits = response.query?.searchinfo.totalhits;
      this.doSearch.emit({
        query: value,
        response
      });
      let utils = document.querySelector('app-utils-item');
      utils?.classList.remove('hidden');
    });
  }

  public updateLocalStorage(query: string): void {
    let history = JSON.parse(localStorage.history);
    history.push({text: query, time: this.getTimeAsStr(new Date())});
    localStorage.history = JSON.stringify(history);
  }

  private getDateAsStr(date: Date): string {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}.${month}.${date.getFullYear()}`;
  }

  private getTimeAsStr(date: Date): string {
    let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${h}:${m}`;
  }

}
