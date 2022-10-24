import {
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  IsInt,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { Wish } from 'src/wishes/entities/wishes.entities';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @IsNotEmpty()
  itemsId: any[];
}
