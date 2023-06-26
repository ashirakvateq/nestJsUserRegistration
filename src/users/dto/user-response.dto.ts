export class ResponseUserDto {
    id: number;
    userName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, userName: string, email: string, createdAt: Date, updatedAt: Date) {
      this.id = id;
      this.userName = userName;
      this.email = email;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }