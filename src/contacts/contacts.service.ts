import { Chat as ChatBaileys, Contact } from '@whiskeysockets/baileys';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../schemas/chats.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createOrUpdateMany(
    chats: ChatBaileys[] | Contact[],
    userId: string,
    whatsappId: string,
  ) {
    const chatsToCreate = chats.map((chat) => {
      if ('conversationTimestamp' in chat) {
        chat.conversationTimestamp =
          typeof chat.conversationTimestamp !== 'number'
            ? chat.conversationTimestamp?.low
            : chat.conversationTimestamp;
      }

      return {
        updateOne: {
          filter: { id: chat.id, userId, whatsappId },
          update: {
            $set: { ...chat, userId, whatsappId },
          },
          upsert: true,
        },
      };
    });

    return this.chatModel.bulkWrite(chatsToCreate);
  }

  async findUserContacts(
    whatsappId: string,
    userId: string,
    lastIndex: number,
    limit: number,
    search?: string,
  ) {
    const filter: FilterQuery<Chat> = { userId, whatsappId };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { id: { $regex: search, $options: 'i' } },
      ];
    }

    return this.chatModel
      .find(filter)
      .limit(limit)
      .skip(lastIndex * limit);
  }

  async findOne(chatId: string) {
    return this.chatModel.findOne({ id: chatId });
  }
}
