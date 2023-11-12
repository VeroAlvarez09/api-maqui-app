import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {hello: 'world'}
})

Route.group(() => {
  Route.post(
    "/",
    "Manage/UsersController.store"
  );

  Route.get(
    "/",
    "Manage/UsersController.index"
  ).middleware('auth:manage');

  Route.post(
    "/login",
    "Manage/UsersController.login"
  );
}).prefix("api/manage/user");

Route.group(() => {
  Route.get(
    "/",
    "Manage/EmployeesController.index"
  ).middleware('auth:manage');
  Route.get(
    "/:id",
    "Manage/EmployeesController.show"
  ).middleware('auth:manage');
  Route.post(
    "/",
    "Manage/EmployeesController.store"
  ).middleware('auth:manage');
  Route.put(
    "/:id",
    "Manage/EmployeesController.update"
  ).middleware('auth:manage');
  Route.delete(
    "/:id",
    "Manage/EmployeesController.destroy"
  ).middleware('auth:manage');
}).prefix("api/manage/employee");

Route.group(() => {
  Route.get(
    "/",
    "Manage/MachinesController.index"
  ).middleware('auth:manage');
  Route.get(
    "/:id",
    "Manage/MachinesController.show"
  ).middleware('auth:manage');
  Route.post(
    "/",
    "Manage/MachinesController.store"
  ).middleware('auth:manage');
  Route.put(
    "/:id",
    "Manage/MachinesController.update"
  ).middleware('auth:manage');
  Route.delete(
    "/:id",
    "Manage/MachinesController.destroy"
  ).middleware('auth:manage');
}).prefix("api/manage/machine");
