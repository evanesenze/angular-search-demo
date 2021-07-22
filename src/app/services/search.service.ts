import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WikiResponse } from '../bin/wiki-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http: HttpClient) { }

  public async req(query: string, srsort: string, offset: number): Promise<WikiResponse>{
    let res: WikiResponse = {
      batchcomplete: undefined,
      continue: undefined,
      query: undefined
    }
    await this._http.get(`https://ru.wikipedia.org/w/api.php?action=query&list=search&srsort=${srsort}&sroffset=${offset}&format=json&srsearch=${query}&origin=*`)
      .toPromise().then((x: any) => {
        console.log(x);
        res = x;
      });
    return res;
  }
}
