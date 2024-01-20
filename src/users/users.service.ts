import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new UnprocessableEntityException('Email already exists');
    }

    createUserDto.password = await hash(createUserDto.password, 10);
    return this.userModel.create(createUserDto);
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }

    return this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
    );
  }

  async remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
