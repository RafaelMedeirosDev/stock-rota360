import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenDTO } from "../dtos/auth/TokenDTO";


export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): TokenDTO => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});