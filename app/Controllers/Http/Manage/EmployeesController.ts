import Employee from "App/Models/Employee";
import {schema} from "@adonisjs/validator/build/src/Schema";
import {rules} from "@adonisjs/validator/build/src/Rules";
import EmployeeHoursWorked from "App/Models/EmployeeHoursWorked";
import Database from '@ioc:Adonis/Lucid/Database'

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

  async indexReportsHours({request, response}) {
    try {
      const {month, year, page, perPage} = request.all();
      const startOfMonth = `${Number(year)}-${Number(month)}-01 00:00:00`;
      const endOfMonth = `${Number(year)}-${Number(month) + 1}-01 00:00:00`;

      let hoursByEmployees = await EmployeeHoursWorked.query()
        .select('idEmployee', Database.raw('SUM(total_hours) as totalHours'), Database.raw('SUM(total_value) as totalValue'))
        .whereBetween('workedAt', [startOfMonth, endOfMonth])
        .groupBy('idEmployee')
        .preload('employee')
        .paginate(page ?? 1, perPage ?? 20);

      let data: object[] = [];
      hoursByEmployees.map(row => {
        data.push({
            idEmployee: row.idEmployee,
            totalHours: row.$extras.totalHours,
            totalValue: row.$extras.totalValue,
            name: row.employee.name,
            lastName: row.employee.lastName,
            docType: row.employee.docType,
            document: row.employee.document,
            salary: row.employee.salary,
            email: row.employee.email
          }
        )
      });

      return response.send({meta: hoursByEmployees.getMeta(), data});
    } catch (error) {
      response.badRequest({
        message: "Error consultando las horas",
        error
      })
    }
  }

  async detailHoursByEmployee({request, response, params}) {
    try {
      const {month, year} = request.all();
      const startOfMonth = `${Number(year)}-${Number(month)}-01 00:00:00`;
      const endOfMonth = `${Number(year)}-${Number(month) + 1}-01 00:00:00`;
      let hoursByEmployee = await EmployeeHoursWorked.query()
        .preload("machine")
        .preload('company')
        .preload('employee')
        .whereBetween('workedAt', [startOfMonth, endOfMonth])
        .where('idEmployee', '=', params.id)
        .orderBy('workedAt',"asc")
      ;

      return response.send(hoursByEmployee);
    } catch (error) {
      response.badRequest({
        message: "Error consultando las horas",
        error
      })
    }

  }

}
