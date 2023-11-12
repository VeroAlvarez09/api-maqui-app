import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(
    "/",
    "Employee/UsersController.index"
  ).middleware('auth:employee');

  Route.post(
    "/login",
    "Employee/UsersController.login"
  );

  Route.post(
    "/validate/session",
    "Employee/UsersController.validateSession"
  ).middleware('auth:employee');
}).prefix("api/employee/user");

Route.group(() => {
  Route.get(
    "/",
    "Employee/HoursController.index"
  ).middleware('auth:employee');
  Route.post(
    "/",
    "Employee/HoursController.store"
  ).middleware('auth:employee');
}).prefix("api/employee/hours");
