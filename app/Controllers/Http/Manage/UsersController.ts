import ManageUser from 'App/Models/ManageUser';
import {schema} from "@adonisjs/validator/build/src/Schema";
import {rules} from "@adonisjs/validator/build/src/Rules";


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
      });

      const payload = await request.validate({schema: newPostSchema})

      //Validar si existe el usuario con el correo
      const exist = await ManageUser.query().where({username: payload.username}).first();
      if (exist) response.badRequest({message: 'Ya existe un usuario con este correo electrónico.'});

      //Crear el usuario
      const user = await ManageUser.create(payload);

      response.created(user);
    } catch (error) {
      response.badRequest({message: "No se puede crear el usuario", errors: error.messages.errors})
    }
  }


  async login({request, auth, response}) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('manage').attempt(email, password);

    return response.send(token, true);
  }

}
