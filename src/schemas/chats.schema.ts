import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, now, Schema as MongooseSchema } from 'mongoose';
import type { proto } from '@whiskeysockets/baileys/WAProto';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true, collection: 'chats' })
export class Chat {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  whatsappId?: string;

  @Prop()
  id: string;

  @Prop({ type: String })
  imgUrl?: string | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  messages?: proto.IHistorySyncMsg[] | null;

  @Prop({ type: String })
  newJid?: string | null;

  @Prop({ type: String })
  oldJid?: string | null;

  @Prop({ type: Number })
  lastMsgTimestamp?: number | Long | null;

  @Prop({ type: Number })
  unreadCount?: number | null;

  @Prop({ type: Boolean })
  readOnly?: boolean | null;

  @Prop({ type: Boolean })
  endOfHistoryTransfer?: boolean | null;

  @Prop({ type: Number })
  ephemeralExpiration?: number | null;

  @Prop({ type: Number })
  ephemeralSettingTimestamp?: number | Long | null;

  @Prop({ type: Number })
  endOfHistoryTransferType?: proto.Conversation.EndOfHistoryTransferType | null;

  @Prop({ type: Number })
  conversationTimestamp?: number | Long | null;

  @Prop({ type: String })
  name?: string | null;

  @Prop({ type: String })
  pHash?: string | null;

  @Prop({ type: Boolean })
  notSpam?: boolean | null;

  @Prop({ type: Boolean })
  archived?: boolean | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  disappearingMode?: proto.IDisappearingMode | null;

  @Prop({ type: Number })
  unreadMentionCount?: number | null;

  @Prop({ type: Boolean })
  markedAsUnread?: boolean | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  participant?: proto.IGroupParticipant[] | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  tcToken?: Uint8Array | null;

  @Prop({ type: Number })
  tcTokenTimestamp?: number | Long | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  contactPrimaryIdentityKey?: Uint8Array | null;

  @Prop({ type: Number })
  pinned?: number | null;

  @Prop({ type: Number })
  muteEndTime?: number | Long | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  wallpaper?: proto.IWallpaperSettings | null;

  @Prop({ type: Number })
  mediaVisibility?: proto.MediaVisibility | null;

  @Prop({ type: Number })
  tcTokenSenderTimestamp?: number | Long | null;

  @Prop({ type: Boolean })
  suspended?: boolean | null;

  @Prop({ type: Boolean })
  terminated?: boolean | null;

  @Prop({ type: Number })
  createdAt?: number | Long | null;

  @Prop({ type: String })
  createdBy?: string | null;

  @Prop({ type: String })
  description?: string | null;

  @Prop({ type: Boolean })
  support?: boolean | null;

  @Prop({ type: Boolean })
  isParentGroup?: boolean | null;

  @Prop({ type: String })
  parentGroupId?: string | null;

  @Prop({ type: Boolean })
  isDefaultSubgroup?: boolean | null;

  @Prop({ type: String })
  displayName?: string | null;

  @Prop({ type: String })
  pnJid?: string | null;

  @Prop({ type: Boolean })
  shareOwnPn?: boolean | null;

  @Prop({ type: Boolean })
  pnhDuplicateLidThread?: boolean | null;

  @Prop({ type: String })
  lidJid?: string | null;

  @Prop({ type: Number })
  lastMessageRecvTimestamp?: number;

  @Prop({ default: now() })
  createdAtDefault: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
