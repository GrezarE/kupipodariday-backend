import {
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  IsInt,
  IsNotEmpty,
  IsArray,
} from 'class-validator';

export class UpdateWislistDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  itemsId: any[];
}
