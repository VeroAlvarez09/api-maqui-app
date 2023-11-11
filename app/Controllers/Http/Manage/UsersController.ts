import ManageUser from 'App/Models/ManageUser';
import {schema} from "@adonisjs/validator/build/src/Schema";
import {rules} from "@adonisjs/validator/build/src/Rules";
import CompaniesManageUser from "App/Models/CompaniesManageUser";


export default class UsersController {

  async index({response}) {
    const manageUsers = await ManageUser.query();

    response.send(manageUsers)
  }

  async store({request, response}) {
    try {
      //Validar campos obligatorios
      const newPostSchema = schema.create({
        username: schema.string({}, [rules.email()]),
        email: schema.string({}, [rules.email()]),
        name: schema.string(),
        lastName: schema.string(),
        avatarUrl: schema.string.optional(),
        password: schema.string(),
        idCompany: schema.number.optional(),
      });

      const payload = await request.validate({schema: newPostSchema})

      //Validar si existe el usuario con el correo
      const exist = await ManageUser.query().where({username: payload.username}).first();
      if (exist) response.badRequest({message: 'Ya existe un usuario con este correo electrónico.'});

      //Crear el usuario
      const user = await ManageUser.create(payload);
      await CompaniesManageUser.create({idManageUser: user.id, idCompany: payload.idCompany ?? 1});

      response.created(user);
    } catch (error) {
      response.badRequest({message: "No se puede crear el usuario", errors: error.messages.errors})
    }
  }


  async login({request, auth, response}) {
    const email = request.input('email')
    const password = request.input('password')

    //Validar si existe el usuario con el correo
    const user = await ManageUser.query().where({username: email}).first();
    if (!user) response.badRequest({message: 'Usuario no existe.'});

    const token = await auth.use('manage').attempt(email, password);

    return response.send({token, user}, true);
  }

}
