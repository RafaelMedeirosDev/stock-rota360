export class TokenDTO{
    public accessToken!: string;
}

export class TokenPayloadDTO {
  public userId!: string;
  public email!: string;
  public role!: string;
}