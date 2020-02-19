import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
    catDisplayGames: Subject<boolean> = new Subject();

  constructor() { }
}
