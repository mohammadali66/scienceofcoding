import { Injectable } from '@angular/core';

@Injectable()
export class MainService{
  mainUrl = 'http://127.0.0.1:8000';
  wsUrl = 'ws://localhost:8000';
  
  constructor(){}

}
