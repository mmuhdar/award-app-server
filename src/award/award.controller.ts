import { Controller, Get, Post, Body } from '@nestjs/common';
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto';
import { User } from 'src/decorator';
import { TokenPayload } from 'src/profile/interface';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardService.create(createAwardDto);
  }

  @Get()
  findAll(@User() user: TokenPayload) {
    return this.awardService.findAll(user);
  }
}
