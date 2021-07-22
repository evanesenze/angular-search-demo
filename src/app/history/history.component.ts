import { Component, Input, OnInit } from '@angular/core';
import { HistoryType } from '../bin/types';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  @Input()
  public items: HistoryType[] = [];
  @Input()
  set hideHistory(value: boolean){
    let historyBtn = document.querySelector('.history-list');
    if(value)
      historyBtn?.classList.remove('hidden');
    else 
      historyBtn?.classList.add('hidden');
  }

  constructor() { }

  ngOnInit(): void { }

}
