import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { LoginDto } from './dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }
}

@Controller('/')
export class AuthController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/register')
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.register(createProfileDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.profileService.login(loginDto);
  }
}
