import { Component, OnInit } from '@angular/core';
import {MensajeriaService} from '../../services/mensajeria.service';
@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.component.html',
  styleUrls: ['./chat2.component.css']
})
export class Chat2Component implements OnInit {
  message: string;
  messages: string[] = [];
  constructor(private chatService:MensajeriaService) { }

  ngOnInit() {
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
