import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ApiUrlConstants} from './api-url-constants';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PlayerSearchService {

  constructor(private http: Http) { }

  /**
   * Searches for a player name, returning an array of name matches
   * @param searchName Player name for searching
   * @returns {Observable<string[]>}
   */
  doPlayerSearch(searchName: string): Observable<string[]> {
    let url = ApiUrlConstants.SearchPlayer + searchName;
    return this.http.get(url)
      .map((res) => {
        if (res.status !== 200) {
          throw new Error('Player not found');
        }

        let data: string[] = JSON.parse(res.text());

        return data;
      });
  }

}
