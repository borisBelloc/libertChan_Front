import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopicModalComponent } from 'src/app/modal/topic-modal/topic-modal.component';
import { TopicService } from 'src/app/services/topic.service';
import { Message } from 'src/app/models/message';
import { Topic } from 'src/app/models/topic';
import { Image } from 'src/app/models/image';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-mosaic',
  templateUrl: './channel-mosaic.component.html',
  styleUrls: ['./channel-mosaic.component.scss']
})
export class ChannelMosaicComponent implements OnInit {
  nbVignettes = 48;
  topics: Topic[];
  currentChannel: string;

  constructor(
    private modalService: NgbModal,
    private topicService: TopicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.topicService.getTopics().subscribe(topics => {
      this.topics = topics;
      //console.log(topics);
    });
    this.route.params.subscribe(p => {
      this.currentChannel = p.shortName;
    });
  }

  openTopicModal() {
    const modalRef = this.modalService.open(TopicModalComponent);
    modalRef.componentInstance.id = 10;

    modalRef.result
      .then(result => {
        console.log(result);
        this.topicService
          .createTopic(
            new Topic(result.title, [
              new Message(result.content, new Image(result.imageLink))
            ]),
            this.currentChannel
          )
          .subscribe(topic => {
            this.topics.push(topic);
            console.log(topic);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
