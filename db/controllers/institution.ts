import { client } from '../local'
import { isRowsExist, genDateNow } from '../utils/helpers'
import { SqlSchema } from '../../types/sql'
import { MAX_VAL } from '../utils/constants'

export async function createInstitution(name: string, level: string, region: string, city: string, rankQs?: string, rankUsn?: string, suggestMajor?: Array<any>, programs? : Array<any>, url?: string): Promise<Array<SqlSchema.Institution> | false> {
  const sql = `
    INSERT INTO institution(name, level, region, city, rank_qs, rank_usn, suggest_major, programs, url)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [
      name,
      level,
      region,
      city,
      rankQs ? rankQs : -1,
      rankUsn ? rankUsn : -1,
      suggestMajor ? [...suggestMajor] : [],
      programs ? [...programs] : [],
      url ? url : ''
    ])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] createInstitution Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error('Row insertion failed.')
    }
  } catch(e) {
    console.log('[DB] createInstitution Error: ' + e.message)
    return false
  }
}

export async function getInstitutionAll(): Promise<Array<SqlSchema.Institution> | false> {
  const sql = `
    SELECT id, name, level, region, city, programs, url, memo, rank_qs, rank_usn, rank_local, suggest_major
    FROM institution
  `

  try {
    const { rows } = await client.query(sql)
    if(isRowsExist(rows)) {
      console.log('[DB] getInstitutionAll Success: ')
      console.log(rows)
      return rows
    } else {
      return false
    }
  } catch(e) {
    console.log('[DB] getInstitutionAll Error: ' + e.message)
    return false
  }
}

export async function getInstitution(sortBy: string, id?: number, name?: string, region?: string, city?: string, level?: string, rankQsStart?: string, rankQsEnd?: string, rankUsnStart?: string, rankUsnEnd?: string, rankLocalStart?: string, rankLocalEnd?: string, suggestMajor?: Array<any>): Promise<Array<SqlSchema.Institution> | false> {
  const sql = `
    SELECT id, name, level, region, city, programs, url, memo, rank_qs, rank_usn, rank_local, suggest_major
    FROM institution
    WHERE name LIKE $1
    AND level LIKE $2
    AND region LIKE $3
    AND city LIKE $4
    AND rank_qs BETWEEN $5 AND $6
    AND rank_usn BETWEEN $7 AND $8
    AND rank_local BETWEEN $9 AND $10
    AND id = $11
    ORDER BY $12 ASC
  `

  try {
    const { rows } = await client.query(sql, [
      name ? name : '%',
      level ? level: '%',
      region ? region : '%',
      city ? city : '%',
      rankQsStart ? rankQsStart : -1,
      rankQsEnd ? rankQsEnd : MAX_VAL,
      rankUsnStart ? rankUsnStart : -1,
      rankUsnEnd ? rankUsnEnd : MAX_VAL,
      rankLocalStart ? rankLocalStart : -1,
      rankLocalEnd ? rankLocalEnd : MAX_VAL,
      id ? id : '%',
      // suggestMajor ? suggestMajor : '_',
      sortBy
    ])
    console.log('[DB] getInstitution Success: ')
    console.log(rows)
    if(isRowsExist(rows)) {
      return rows
    } else {
      return false
    }
  } catch(e) {
    console.log('[DB] getInstitution Error: ' + e.message)
    return false
  }
}

export async function updateInstitution(id: number, name?: string, level?: string, region?: string, city?: string, rankQs?: string, rankUsn?: string, rankLocal?: string, suggestMajor?: Array<any>): Promise<Array<SqlSchema.Institution> | false> {
  const target = await getInstitution('name', id)
  if(target) {
    let sql = `
      UPDATE institution
      SET name = $2, level = $3, region = $4, city = $9, rank_qs = $5, rank_usn = $6, rank_local = $10 suggest_major = $7, last_updated = $8
      WHERE id = $1
      RETURNING *
    `
    try {
      const { rows } = await client.query(sql, [
        id,
        name ? name : target[0].name,
        level ? level : target[0].level,
        region ? region : target[0].region,
        rankQs ? rankQs : target[0].rank_qs,
        rankUsn ? rankUsn : target[0].rank_usn,
        suggestMajor ? [...suggestMajor] : target[0].suggest_major,
        genDateNow(),
        city ? city : target[0].city,
        rankLocal ? rankLocal : target[0].rank_local
      ])
      if(isRowsExist(rows)) {
        console.log('[DB] updateInstitution Success: ')
        console.log(rows)
        return rows
      } else {
        return false
      }
    } catch(e) {
      console.log('[DB] updateInstitution Error: ' + e.message)
      return false
    }
  } else {
    return []
  }
}
