import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  public tableAllPosts(){
    return  this.httpClient.get("https://wordpress.org/news/wp-json/wp/v2/posts");
    }
}
