import { client } from '../local'

export async function createProgramTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS program (
      id serial PRIMARY KEY,
      name text NOT NULL,
      tuition text NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      memo text,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await client.query(sql)
    console.log('[DB] createProgramTable Success.')
  } catch(e) {
    console.log('[DB] createProgramTable Error: ' + e.message)
    return false
  }
}

export async function dropProgramTable(): Promise<void | false> {
  const sql: string = `
    DROP TABLE program
  `

  try {
    await client.query(sql)
    console.log('[DB] dropProgramTable Success.')
  } catch(e) {
    console.log('[DB] dropProgramTable Error: ' + e.message)
    return false
  }
}

