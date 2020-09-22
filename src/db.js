import Knex from 'knex'

export function doTest() {
    const db = Knex({
        client: 'sqlite3',
        connection: ':memory:',
        pool: {
          min: 1,
          max: 1,
          idleTimeoutMillis: 360000 * 1000,
        },
        useNullAsDefault: true,
      })

    console.log(`Knex type is: ${typeof(db)}`)
}
