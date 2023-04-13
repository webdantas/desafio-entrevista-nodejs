import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = { sub: user.id, username: user.username };

    return this.jwtService.signAsync(payload);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      return Boolean(payload);
    } catch (err) {
      return false;
    }
  }

  async authenticate(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    // Verifique se as credenciais são válidas
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Gere um token JWT
    const payload = { username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
