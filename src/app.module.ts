import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { SessionsModule } from './sessions/sessions.module';
import { WaSocketService } from './wa-socket/wa-socket.service';
import { MessagesService } from './messages/messages.service';
import { ContactsService } from './contacts/contacts.service';
import { Message, MessageSchema } from './schemas/messages.schema';
import { Chat, ChatSchema } from './schemas/chats.schema';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://1120marcos:DsxpDPplraybrtLt@cluster0.7rebbbt.mongodb.net/testeApp?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    ChatsModule,
    MessagesModule,
    SessionsModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [WaSocketService, MessagesService, ContactsService],
})
export class AppModule {}
