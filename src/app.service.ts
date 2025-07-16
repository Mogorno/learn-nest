import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProfile(userAgent: string) {
    return `Auth success. With user agent: ${userAgent}`;
  }

  createProfile(dto: { name: string }) {
    const { name } = dto;
    return `New user with name: ${name} created`;
  }
}
