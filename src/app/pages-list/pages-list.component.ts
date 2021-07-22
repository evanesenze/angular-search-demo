import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagesList } from '../bin/types';
import { WikiResponse } from '../bin/wiki-response';

@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.sass']
})
export class PagesListComponent implements OnInit {
  public sroffset: number = 0;
  @Output() switchPage = new EventEmitter<number>();
  @Input()
  set result (value: WikiResponse | null){
    this.sroffset = value?.continue ? value.continue.sroffset : Math.ceil((value?.query?.searchinfo.totalhits || 10) / 10 ) * 10;
    this.updatePagesList({
      sroffset: this.sroffset,
      totalhits: value?.query?.searchinfo.totalhits || 1
    })
  }
  constructor() { }

  ngOnInit() { }

  public nextPage(): void{
    this.switchPage.emit(this.sroffset);
  }

  public prevPage(): void{
    //this.sroffset -= 20;
    this.switchPage.emit(this.sroffset - 20);
  }

  public switch(event: any): void{
    this.switchPage.emit((event.target.id - 1) * 10);
  }

  public updatePagesList(value: PagesList): void {
    let pagesCount = Math.ceil(value.totalhits / 10);
    let currentPage = value.sroffset / 10;
    let pagesBtns = document.querySelectorAll('.page-btn');
    let backBtn = document.querySelector('.back-btn');
    let forwardBtn = document.querySelector('.forward-btn');
    currentPage === 1 ? backBtn?.classList.add('hidden') : backBtn?.classList.remove('hidden');
    currentPage === pagesCount ? forwardBtn?.classList.add('hidden') : forwardBtn?.classList.remove('hidden');
    let leftBorder = 4;
    let rightBorder = pagesCount - 4;
    let offset = pagesCount < 6 || currentPage < leftBorder ? 1 : currentPage > rightBorder ? rightBorder : currentPage - 2;
    pagesBtns.forEach((btn, index) => {
      let pageNum = index + offset;
      btn.id = String(pageNum);
      pageNum === currentPage ? btn.classList.add('current-page') : btn.classList.remove('current-page');
      pageNum > pagesCount ? btn.classList.add('hidden') : btn.classList.remove('hidden');
      btn.textContent = String(pageNum);
    });
  }

}
