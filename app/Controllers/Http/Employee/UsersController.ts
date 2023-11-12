import Employee from "App/Models/Employee";


export default class UsersController {

  async index({response}) {
    const employeeUsers = await Employee.query();

    response.send(employeeUsers)
  }

  async login({request, auth, response}) {
    const email = request.input('email')
    const password = request.input('password')

    //Validar si existe el usuario con el correo
    const user = await Employee.query().where({email: email}).first();
    if (!user) response.badRequest({message: 'Usuario no existe.'});

    const token = await auth.use('employee').attempt(email, password);

    return response.send({token, user}, true);
  }

  async validateSession({ auth, response }) {
    try {
      let userLogin = auth.use('employee').user;
      let id = userLogin.toJSON().id;
      let user = await Employee.find(id);

      response.send(user);
    } catch (e) {
      response.badRequest({message: "No se puede validar el usuario", errors: e.messages.errors})
    }
  }

}
