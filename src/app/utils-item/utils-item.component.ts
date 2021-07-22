import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultsItemComponent } from '../results-item/results-item.component';

@Component({
  selector: 'app-utils-item',
  templateUrl: './utils-item.component.html',
  styleUrls: ['./utils-item.component.sass']
})
export class UtilsItemComponent implements OnInit {
  public menuActive: boolean = false;
  
  @Output() newSrsort = new EventEmitter<string>();
  public srsort: string = 'relevance';
  
  @Input()
  public totalhits: number | undefined = 0;

  constructor() { }

  ngOnInit() {
    let btns = document.querySelectorAll('.li-btn');
    btns.forEach(btn => {
      if(btn.id === this.srsort){
        btn.classList.add('active-sort');
      }
      btn.addEventListener('click', () => this.switchSrsort(btn.id));
    })
  }

  public toggleMenu(): void{
    this.menuActive = !this.menuActive;
    let menu = document.querySelector('.menu-list');
    menu?.classList.toggle('hidden');
  }

  public switchSrsort (newValue: string): void{
    if(newValue === this.srsort) return;
    this.srsort = newValue;
    this.newSrsort.emit(newValue);
    this.toggleMenu();
    let btns = document.querySelectorAll('.li-btn');
    btns.forEach(btn => {
      if(btn.id === this.srsort){
        btn.classList.add('active-sort');
      }else{
        btn.classList.remove('active-sort');
      }
    });
  }
}
