import { Injectable } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { WhatsappSocket } from './wa-socket';
import { ContactsService } from '../contacts/contacts.service';

@Injectable()
export class WaSocketService {
  constructor(
    private messageService: MessagesService,
    private contactsService: ContactsService,
  ) {}

  async init(userId: string) {
    const whatsappSocket = new WhatsappSocket(
      Date.now().toString(),
      userId,
      this.messageService,
      this.contactsService,
    );

    return whatsappSocket.init();
  }
}
