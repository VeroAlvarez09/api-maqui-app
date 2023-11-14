import machine from "App/Models/machine";
import {schema} from "@adonisjs/validator/build/src/Schema";
import Machine from "App/Models/machine";
import Database from "@ioc:Adonis/Lucid/Database";
import MachineHoursWorked from "App/Models/MachineHoursWorked";

export default class MachinesController {

  async index({params, response}) {
    const machines = await machine.query().preload('company').paginate(params.page ?? 1, params.perPage ?? 20);

    response.send(machines)
  }

  async show({params, response}) {

    const machine = await Machine.find(params.id);

    return response.send(machine);
  }

  async store({request, response}) {
    try {
      //Validar campos obligatorios
      const newPostSchema = schema.create({
        name: schema.string(),
        brand: schema.string(),
        model: schema.number(),
        location: schema.string.optional(),
        serial: schema.string(),
        color: schema.string(),
        idCompany: schema.number(),
        valuePerHour: schema.number(),
      });

      const payload = await request.validate({schema: newPostSchema})

      //Validar si existe el empleado con el número de documento
      const exist = await Machine.query().where({serial: payload.serial}).first();
      if (exist) response.badRequest({message: 'Ya existe una maquina con este número de serial.'});

      //Crear el usuario
      const machine = await Machine.create(payload);

      response.created(machine);
    } catch (error) {
      response.badRequest({
        message: "Error creando la maquina, por favor intentelo más tarde",
        errors: error.messages.errors
      })
    }
  }

  async update({request, params, response}) {
    const data = request.only(['name', 'brand', 'location', 'color', 'idCompany', 'valuePerHour'])

    const machine = await Machine.findOrFail(params.id)

    machine.merge(data)

    await machine.save()

    return response.send(machine);
  }

  async destroy({params, response}) {
    const machine = await Machine.findOrFail(params.id)

    await machine.delete()

    return response.send(true);
  }

  async indexReportsHours({request, response}) {
    try {
      const {month, year, page, perPage} = request.all();
      const startOfMonth = `${Number(year)}-${Number(month)}-01 00:00:00`;
      const endOfMonth = `${Number(year)}-${Number(month) + 1}-01 00:00:00`;

      let hoursByMachines = await MachineHoursWorked.query()
        .select('*', Database.raw('SUM(total_hours) as totalHours'), Database.raw('SUM(total_value) as totalValue'))
        .whereBetween('workedAt', [startOfMonth, endOfMonth])
        .groupBy('idMachine')
        .preload('machine')
        .paginate(page ?? 1, perPage ?? 20);

      let data: object[] = [];
      hoursByMachines.map(row => {
        data.push({
            idMachine: row.idMachine,
            totalHours: row.$extras.totalHours,
            totalValue: row.$extras.totalValue,
            brand: row.machine.brand,
            model: row.machine.model,
            serial: row.machine.serial,
            color: row.machine.color,
            valuePerHour: row.machine.valuePerHour,
          }
        )
      });

      return response.send({meta: hoursByMachines.getMeta(), data});
    } catch (error) {
      response.badRequest({
        message: "Error consultando las horas",
        error
      })
    }
  }

  async detailHoursByMachine({request, response, params}) {
    try {
      const {month, year} = request.all();
      const startOfMonth = `${Number(year)}-${Number(month)}-01 00:00:00`;
      const endOfMonth = `${Number(year)}-${Number(month) + 1}-01 00:00:00`;
      let hoursByMachine = await MachineHoursWorked.query()
        .preload("machine")
        .preload('company')
        .preload('employee')
        .whereBetween('workedAt', [startOfMonth, endOfMonth])
        .where('idMachine', '=', params.id)
        .orderBy('workedAt', "asc")
      ;

      return response.send(hoursByMachine);
    } catch (error) {
      response.badRequest({
        message: "Error consultando las horas",
        error
      })
    }

  }

}
