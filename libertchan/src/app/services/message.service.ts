import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from '../models/topic';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8080/api/messages';

  constructor(private httpClient: HttpClient) {}

  get httpOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return {
      headers
    };
  }

  getChannels() {
    return this.httpClient.get(this.baseUrl, this.httpOptions);
    // .get(this.baseUrl);
  }

  getChannelByShortName(shortName: string) {
    return this.httpClient.get(
      this.baseUrl + '/' + shortName,
      this.httpOptions
    );
  }

  getMessagesByTopicId(id: number) {
    return this.httpClient.get(this.baseUrl + '/topic/' + id, this.httpOptions);
  }

  createMessage(message: Message, id: number) {
    // TODO: corps message not null!
    // console.log("mm ", message.textContent.length);
    return this.httpClient.post(
      this.baseUrl + '/topic/' + id,
      message,
      this.httpOptions
    );
  }
}
