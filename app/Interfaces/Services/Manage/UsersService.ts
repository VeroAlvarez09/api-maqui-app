import ManageUser from "App/Models/ManageUser";

export abstract class UsersService {

  abstract store(data: ManageUser) : Promise<ManageUser>;
}
