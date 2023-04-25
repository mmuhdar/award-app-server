import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto';
import { User } from 'src/decorator';
import { TokenPayload } from 'src/profile/interface';
import { AwardQuery } from './interface';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardService.create(createAwardDto);
  }

  @Get()
  findAll(@User() user: TokenPayload, @Query() query: AwardQuery) {
    return this.awardService.findAll(user, query);
  }
}
