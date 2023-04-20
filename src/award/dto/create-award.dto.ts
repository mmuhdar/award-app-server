import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { AwardType } from '../enum/type.enum';

export class CreateAwardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(AwardType)
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  poin: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsString()
  profileId: string;
}
