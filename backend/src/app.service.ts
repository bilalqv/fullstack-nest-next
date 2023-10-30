import { Injectable } from '@nestjs/common';

type Hello = {
  message: string,
  id: number,
}

@Injectable()
export class AppService {
  getHello(): Hello {
    return {
      message: `Hello! ${process.env.NAME}`,
      id: 1,
    };
  }
}
