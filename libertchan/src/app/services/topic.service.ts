import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Topic } from '../models/topic';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = 'http://localhost:8080/api/discussionthreads';
  constructor(private httpClient: HttpClient) {}

  /*  get httpOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return {
      headers
    };
  }*/

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createTopic(topic: Topic) {
    console.log(topic);
    return this.httpClient.post<Topic>(this.baseUrl, topic, this.httpOptions);
  }

  getTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.baseUrl, this.httpOptions);
  }
}