import { IsNotEmpty, IsString } from 'class-validator';

export class LocationSuggestionsDto {
  @IsString()
  @IsNotEmpty()
  locationSuggestions: string;
}
