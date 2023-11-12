import Employee from "App/Models/Employee";
import {DateTime} from "luxon";
import EmployeeHoursWorked from "App/Models/EmployeeHoursWorked";
import MachineHoursWorked from "App/Models/MachineHoursWorked";
import Machine from "App/Models/Machine";


export default class HoursController {

  async index({response}) {
    try {
      const employeeHoursWorked: EmployeeHoursWorked[] = await EmployeeHoursWorked.query().preload('company').preload('machine').preload('employee');

      response.send(employeeHoursWorked)
    } catch (error) {
      response.badRequest({
        message: "Error registrando las horas",
        error
      })
    }
  }

  async store({request, response, auth}) {
    try {
      let userLogin = auth.use('employee').user;
      let id = userLogin.toJSON().id;
      let user = await Employee.findOrFail(id);

      const data = request.only(['workedAt', 'totalHours'])
      let employeeHoursWorked: EmployeeHoursWorked = await this.saveEmployeeHourWorked(user, data.workedAt, data.totalHours);
      let machineHoursWorked: MachineHoursWorked = await this.saveMachineHourWorked(user, data.workedAt, data.totalHours);

      response.send({user, employeeHoursWorked, machineHoursWorked})
    } catch (error) {
      response.badRequest({
        message: "Error registrando las horas",
        error
      })
    }
  }

  private async saveMachineHourWorked(user: Employee, workedAt: DateTime, totalHours: number): Promise<MachineHoursWorked> {
    let machine = await Machine.findOrFail(user.idMachine);
    return await MachineHoursWorked.create({
      idEmployee: user.id,
      idCompany: user.idCompany,
      idMachine: user.idMachine,
      workedAt: workedAt,
      totalHours: totalHours,
      valuePerHour: machine.valuePerHour,
      totalValue: machine.valuePerHour * totalHours,
    })
  }

  private async saveEmployeeHourWorked(user: Employee, workedAt: DateTime, totalHours: number): Promise<EmployeeHoursWorked> {
    return await EmployeeHoursWorked.create({
      idMachine: user.idMachine,
      idCompany: user.idCompany,
      idEmployee: user.id,
      workedAt: workedAt,
      totalHours: totalHours,
      valuePerHour: user.bonusValuePerHour,
      totalValue: user.bonusValuePerHour * totalHours,
    })
  }

}



