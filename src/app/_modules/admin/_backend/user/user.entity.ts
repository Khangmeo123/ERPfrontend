
export class UserEntity {
  Name: string = null;
  Display: string = null;
  
  constructor(User: any = null) {
    if (User != undefined && User != null) {
      Object.assign(this, User);
    }
  }
}
