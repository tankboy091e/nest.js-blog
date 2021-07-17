import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  public hello() {
    return this.service.hello();
  }

  @Get('health')
  public health() {
    return this.service.health();
  }

  @Get('home')
  public async home() {
    const [sum, essais, dev, library] = await Promise.all([
      this.service.getSum(),
      this.service.getEssais(),
      this.service.getDev(),
      this.service.getLibrary(),
    ]);

    return {
      posts: {
        sum,
        essais,
        dev,
      },
      books: library,
    };
  }
}
