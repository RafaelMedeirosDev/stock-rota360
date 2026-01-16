import { IsNotEmpty, IsUUID } from "class-validator";

export class CurrentUserDTO {
    @IsUUID()
    @IsNotEmpty()
    public userId!: string;
}