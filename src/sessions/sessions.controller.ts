import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { WaSocketService } from '../wa-socket/wa-socket.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import type { FastifyRequest } from 'fastify';
import type { UserDocument } from '../schemas/users.schema';

@UseGuards(JwtGuard)
@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly waSocketService: WaSocketService,
  ) {}

  @Post()
  async create(@Req() request: FastifyRequest & { user: UserDocument }) {
    await this.waSocketService.init(request.user.id);
    return this.sessionsService.create();
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
