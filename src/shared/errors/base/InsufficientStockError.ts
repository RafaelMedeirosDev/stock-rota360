import { ConflictException, HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class InsufficientStockError extends ConflictException {
@ApiProperty({ example: HttpStatus.CONFLICT })
  public statusCode!: number;

  @ApiProperty({ type: () => String })
  public message!: string;

  @ApiProperty({ type: () => String })
  public error!: string;

  constructor(message: string, error: string) {
    super(message, error);
  }
}