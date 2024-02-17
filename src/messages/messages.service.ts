import type { WAMessage, WAMessageKey } from '@whiskeysockets/baileys';
import type { AnyBulkWriteOperation } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schemas/messages.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createOrUpdateMany(
    messages: WAMessage[],
    userId: string,
    whatsappId: string,
  ) {
    const messagesToCreate: AnyBulkWriteOperation[] = messages.map(
      (message) => {
        message.messageTimestamp =
          typeof message.messageTimestamp !== 'number'
            ? message.messageTimestamp?.low
            : message.messageTimestamp;

        return {
          updateOne: {
            filter: { 'key.id': message.key.id, userId, whatsappId },
            update: { $set: { ...message, userId, whatsappId } },
            upsert: true,
          },
        };
      },
    );

    return this.messageModel.bulkWrite(messagesToCreate);
  }

  async findChatMessages(chatId: string, userId: string, whatsappId: string) {
    return this.messageModel.find({
      'key.remoteJid': chatId,
      userId,
      whatsappId,
    });
  }

  async findOne(key: WAMessageKey) {
    return (
      (await this.messageModel.findOne({ 'key.id': key.id }))?.message ||
      undefined
    );
  }
}
