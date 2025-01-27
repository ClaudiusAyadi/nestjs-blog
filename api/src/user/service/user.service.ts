import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(user: User): Observable<User> {
    return from(this.userRepository.save(user));
  }

  list(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  get(id: number): Observable<User> {
    return from(
      this.userRepository.findOneBy({ id }).then((user) => {
        if (!user) throw new NotFoundException('User not found');
        return user;
      }),
    );
  }

  update(id: number, user: User): Observable<any> {
    return from(this.userRepository.update(id, user));
  }

  remove(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }
}
