/**
 * Contract source: https://git.io/JOdz5
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import ManageUser from 'App/Models/ManageUser'

declare module '@ioc:Adonis/Addons/Auth' {
  /*
  |--------------------------------------------------------------------------
  | Providers
  |--------------------------------------------------------------------------
  |
  | The providers are used to fetch users. The Auth module comes pre-bundled
  | with two providers that are `Lucid` and `Database`. Both uses database
  | to fetch user details.
  |
  | You can also create and register your own custom providers.
  |
  */
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof ManageUser>
      config: LucidProviderConfig<typeof ManageUser>
    },
    user_dashboard: {
      implementation: LucidProviderContract<typeof ManageUser>
      config: LucidProviderConfig<typeof ManageUser>
    }
  }
  interface GuardsList {
    manage: {
      implementation: OATGuardContract<'user', 'manage'>
      config: OATGuardConfig<'user'>
      client: OATClientContract<'user'>
    },
    dashboard: {
      implementation: OATGuardContract<'user_dashboard', 'dashboard'>
      config: OATGuardConfig<'user_dashboard'>
      client: OATClientContract<'user_dashboard'>
    }
  }
}
