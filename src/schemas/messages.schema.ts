import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, now, Schema as MongooseSchema } from 'mongoose';
import type { proto } from '@whiskeysockets/baileys/WAProto';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true, collection: 'messages' })
export class Message {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  whatsappId?: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  key: proto.IMessageKey;

  @Prop({ type: MongooseSchema.Types.Mixed })
  message?: proto.IMessage | null;

  @Prop({ type: Number })
  messageTimestamp?: number | null;

  @Prop({ type: Number })
  status?: proto.WebMessageInfo.Status | null;

  @Prop({ type: String })
  participant?: string | null;

  @Prop({ type: Number })
  messageC2STimestamp?: number | null;

  @Prop({ type: Boolean })
  ignore?: boolean | null;

  @Prop({ type: Boolean })
  starred?: boolean | null;

  @Prop({ type: Boolean })
  broadcast?: boolean | null;

  @Prop({ type: String })
  pushName?: string | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  mediaCiphertextSha256?: Uint8Array | null;

  @Prop({ type: Boolean })
  multicast?: boolean | null;

  @Prop({ type: Boolean })
  urlText?: boolean | null;

  @Prop({ type: Boolean })
  urlNumber?: boolean | null;

  @Prop({ type: Number })
  messageStubType?: proto.WebMessageInfo.StubType | null;

  @Prop({ type: Boolean })
  clearMedia?: boolean | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  messageStubParameters?: string[] | null;

  @Prop({ type: Number })
  duration?: number | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  labels?: string[] | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  paymentInfo?: proto.IPaymentInfo | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  finalLiveLocation?: proto.Message.ILiveLocationMessage | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  quotedPaymentInfo?: proto.IPaymentInfo | null;

  @Prop({ type: Number })
  ephemeralStartTimestamp?: number | Long | null;

  @Prop({ type: Number })
  ephemeralDuration?: number | null;

  @Prop({ type: Boolean })
  ephemeralOffToOn?: boolean | null;

  @Prop({ type: Boolean })
  ephemeralOutOfSync?: boolean | null;

  @Prop({ type: Number })
  bizPrivacyStatus?: proto.WebMessageInfo.BizPrivacyStatus | null;

  @Prop({ type: String })
  verifiedBizName?: string | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  mediaData?: proto.IMediaData | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  photoChange?: proto.IPhotoChange | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  userReceipt?: proto.IUserReceipt[] | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  reactions?: proto.IReaction[] | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  quotedStickerData?: proto.IMediaData | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  futureproofData?: Uint8Array | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  statusPsa?: proto.IStatusPSA | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  pollUpdates?: proto.IPollUpdate[] | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  pollAdditionalMetadata?: proto.IPollAdditionalMetadata | null;

  @Prop({ type: String })
  agentId?: string | null;

  @Prop({ type: Boolean })
  statusAlreadyViewed?: boolean | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  messageSecret?: Uint8Array | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  keepInChat?: proto.IKeepInChat | null;

  @Prop({ type: String })
  originalSelfAuthorUserJidString?: string | null;

  @Prop({ type: Number })
  revokeMessageTimestamp?: number | Long | null;

  @Prop({ type: MongooseSchema.Types.Mixed })
  pinInChat?: proto.IPinInChat | null;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
