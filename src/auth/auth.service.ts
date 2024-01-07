import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupUserDto } from './dto/signup.dto';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(payload: { id: number; name: string }) {
    return await this.jwtService.signAsync(payload);
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password.toString(), 10);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const correctPassword = await bcrypt.compare(
      password.toString(),
      user?.password.toString(),
    );

    if (!correctPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: await this.generateToken(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async signUp(signInDto: SignupUserDto) {
    const user = await this.usersService.findOne({
      where: {
        email: signInDto.email,
      },
    });

    if (user) {
      throw new ConflictException('Email já cadastrado');
    }

    signInDto.password = await this.hashPassword(signInDto.password);

    const newUser = await this.usersService.create(signInDto);

    const payload = {
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
    };

    return {
      access_token: await this.generateToken(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
