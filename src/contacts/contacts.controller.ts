import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import type { FastifyRequest } from 'fastify';
import type { UserDocument } from '../schemas/users.schema';

@UseGuards(JwtGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':whatsappId')
  async findUserChats(
    @Param('whatsappId') whatsappId: string,
    @Req() request: FastifyRequest & { user: UserDocument },
  ) {
    return this.contactsService.findUserContacts(
      whatsappId,
      request.user.id,
      (request.query as any).lastIndex,
      (request.query as any).limit,
      (request.query as any).search,
    );
  }
}
