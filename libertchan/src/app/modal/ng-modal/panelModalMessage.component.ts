import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Image } from 'src/app/models/image';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-panel-modal-message',
  templateUrl: './panelModalMessage.component.html',
  styleUrls: ['./ng-modal.scss']
})
export class PanelModalMessageComponent implements OnInit {
  messageForm: FormGroup;
  @Input() topicId: number;
  @Input() messageList: Message[];
  apiEndPoint = 'http://192.168.1.89:8080/api/uploadFile';
  myImage: File;
  imageLink: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient,
    private citationService: CitationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.citationService.citation.subscribe((quotedMessage: Message) => {
      if (quotedMessage) {
        this.messageForm
          .get('textContent')
          .setValue(
            this.messageForm.get('textContent').value +
              '>' +
              quotedMessage.textContent
          );
      }
    });
  }

  // closeModal() {
  //   this.activeModal.close('Modal closed');
  // }

  private createForm() {
    this.messageForm = this.formBuilder.group({
      author: '',
      textContent: '',
      imageLocation: 'https://picsum.photos/200'
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.messageForm.controls;
  }

  onSubmit(messageForm) {
    this.messageService
      .createMessage(
        new Message(
          this.f.author.value,
          this.f.textContent.value,
          new Image(this.f.imageLocation.value)
        ),
        this.topicId
      )
      .subscribe((m: Message) => {
        this.messageList.push(m);
      });
    this.messageForm.reset();
  }

  fileChange(event) {
    if (event.target.files.length > 0) {
      this.myImage = event.target.files[0];
    }
  }

  fileUpload() {
    let formData: FormData = new FormData();
    formData.append('file', this.myImage, this.myImage.name);
    let headers = new HttpHeaders();
    this.http.post(`${this.apiEndPoint}`, formData, { headers }).subscribe(
      (data: any) => {
        this.imageLink = data.fileDownloadUri;
      },
      error => console.log(error)
    );
  }
}
