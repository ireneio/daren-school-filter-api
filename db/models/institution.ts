import { client } from '../local'

export async function createInstitutionTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS institution (
      id serial PRIMARY KEY,
      name text NOT NULL,
      level text NOT NULL,
      region text NOT NULL,
      city text NOT NULL,
      programs JSONB NOT NULL,
      url text NOT NULL,
      memo text,
      rank_qs text DEFAULT 0,
      rank_usn text DEFAULT 0,
      rank_local text DEFAULT 0,
      suggest_major JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await client.query(sql)
    console.log('[DB] createInstitutionTable Success.')
  } catch(e) {
    console.log('[DB] createInstitutionTable Error: ' + e.message)
    return false
  }
}

export async function dropInstitutionTable(): Promise<void | false> {
  const sql: string = `
    DROP TABLE institution
  `

  try {
    await client.query(sql)
    console.log('[DB] dropInstitutionTable Success.')
  } catch(e) {
    console.log('[DB] dropInstitutionTable Error: ' + e.message)
    return false
  }
}
