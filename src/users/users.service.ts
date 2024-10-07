import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John',
      email: 'fdsfsd@dff.pl',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'John',
      email: 'fdsfsd@dff.pl',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'John',
      email: 'fdsfsd@dff.pl',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'John',
      email: 'fdsfsd@dff.pl',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'John',
      email: 'fdsfsd@dff.pl',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (roleArray.length === 0)
        throw new NotFoundException(`Users with role ${role} not found`);
      return roleArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
    const highestId = usersByHighestId[0].id;
    const newUser = { id: highestId + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
