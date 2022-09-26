import { IsString } from 'class-validator';

// import { Match } from '@utils/match.decorator';

export class ConnectDto {
  @IsString()
  public domain: string;

  @IsString()
  public token: string;
}
