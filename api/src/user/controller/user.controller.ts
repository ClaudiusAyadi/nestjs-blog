import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User> {
    return this.userService.create(user);
  }

  @Get()
  list(): Observable<User[]> {
    return this.userService.list();
  }

  @Get(':id')
  get(@Param('id') id: string): Observable<User> {
    return this.userService.get(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
