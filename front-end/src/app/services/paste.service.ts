import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Paste } from '../models/paste';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'observe': 'response'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PasteService {

  public url:string;
  paste: any;
  constructor(private http: HttpClient) {
      this.url = GLOBAL.url;
  }

  addPaste(paste: Paste): Observable<any>{
    return this.http.post(this.url+'paste', paste, httpOptions );
  }

  getByUUID(uuid: string): Observable<any>{
        return this.http.get(this.url+'paste/' + uuid, httpOptions);
  }

  getPrivatePaste(id: number,uuid: string): Observable<any>{
    return this.http.get(this.url+'private_paste?id='+id+'&private_uuid='+uuid)
  }

  delPaste(uuid: string): Observable<any>{
    return this.http.delete(this.url+'paste/'+ uuid, httpOptions);  
  }

  editPaste(uuid: string,value: string,attribute: string): Observable<any> {
    if (attribute == "content"){
     this.paste = {paste: {content: value}}
    }else if(attribute == "title"){
      this.paste = {paste: {title: value}}
    }else if(attribute == "exposure"){
      this.paste = {paste: {exposure: value}}
    }
    return this.http.patch(this.url+'paste/' + uuid, this.paste, httpOptions);
  }
}
