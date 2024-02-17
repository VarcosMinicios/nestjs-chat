import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from '../schemas/chats.schema';

@Module({
  controllers: [ContactsController],
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [ContactsService],
})
export class ContactsModule {}
