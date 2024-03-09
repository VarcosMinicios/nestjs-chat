import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import type { FastifyRequest } from 'fastify';
import type { UserDocument } from '../schemas/users.schema';

@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':whatsappId/:id')
  async findChatMessages(
    @Param('whatsappId') whatsappId: string,
    @Param('id') chatId: string,
    @Req() request: FastifyRequest & { user: UserDocument },
  ) {
    return this.messagesService.findChatMessages(
      chatId,
      request.user.id,
      whatsappId,
      (request.query as any).lastIndex,
      (request.query as any).limit,
    );
  }
}
