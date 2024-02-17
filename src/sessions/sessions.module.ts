import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { WaSocketService } from '../wa-socket/wa-socket.service';
import { MessagesService } from '../messages/messages.service';
import { ContactsService } from '../contacts/contacts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../schemas/messages.schema';
import { Chat, ChatSchema } from '../schemas/chats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [SessionsController],
  providers: [
    SessionsService,
    WaSocketService,
    MessagesService,
    ContactsService,
  ],
})
export class SessionsModule {}
