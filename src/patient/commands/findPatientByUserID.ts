export class GetUser {
  constructor(
    private readonly mapper: UserMapper,
    private readonly repository: UserRepository,
  ) {}

  async getUser(loginUserDto: LoginUserDto, role: string) {
    const userRow: IUser = await this.repository.getUser(
      loginUserDto.login,
      role,
    );
    const userEntity: UserEntity = this.mapper.toEntity(userRow);
    if (await userEntity.checkPassword(loginUserDto.password)) {
      return userRow;
    } else {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }
  }
}
