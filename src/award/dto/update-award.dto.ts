import { PartialType } from '@nestjs/mapped-types';
import { CreateAwardDto } from './create-award.dto';

export class UpdateAwardDto extends PartialType(CreateAwardDto) {
  name?: string;
  type?: string;
  poin?: number;
  profileId?: string;
}
