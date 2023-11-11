import Employee from "App/Models/Employee";
import {schema} from "@adonisjs/validator/build/src/Schema";
import {rules} from "@adonisjs/validator/build/src/Rules";

export default class EmployeesController {

  async index({response, params}) {
    const employees = await Employee.query().preload('machine').paginate(params.page ?? 1, params.perPage ?? 20);

    response.send(employees)
  }

  async show({params, response}) {

    const employee = await Employee.find(params.id);

    return response.send(employee);
  }

  async store({request, response}) {
    try {
      //Validar campos obligatorios
      const newPostSchema = schema.create({
        name: schema.string(),
        lastName: schema.string(),
        docType: schema.string(),
        document: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
        idCompany: schema.number(),
        idMachine: schema.number.optional(),
        salary: schema.number(),
        bonusValuePerHour: schema.number(),
      });

      const payload = await request.validate({schema: newPostSchema})

      //Validar si existe el empleado con el número de documento
      const exist = await Employee.query().where({document: payload.document}).first();
      if (exist) response.badRequest({message: 'Ya existe un empleado con este número de documento.'});

      //Crear el usuario
      const employee = await Employee.create(payload);

      response.created(employee);
    } catch (error) {
      response.badRequest({
        message: "Error creando el empleado, por favor intentelo más tarde",
        error
      })
    }
  }

  async update({request, params, response}) {
    const data = request.only(['name', 'document', 'docType', 'idMachine', 'password', 'lastName', 'salary', 'bonusValuePerHour'])

    const employee = await Employee.findOrFail(params.id)

    employee.merge(data)

    await employee.save()

    return response.send(employee);
  }

  async destroy({params, response}) {
    const employee = await Employee.findOrFail(params.id)

    await employee.delete()

    return response.send(true);
  }

}
