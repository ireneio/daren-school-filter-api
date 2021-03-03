import { createInstitution, getInstitutionAll, updateInstitution, getInstitution } from "../controllers/institution"
import { createUser } from "../controllers/user"
import initDb from "../local"
import { createInstitutionTable, dropInstitutionTable } from "../models/institution"
import { createUserTable, dropUserTable } from "../models/user"

async function initializeDb(): Promise<void> {
  try {
    await initDb()
  } catch(e) {
    console.error(e.message)
  }
}

async function initializeItemTable(): Promise<void> {
  try {
    await initDb()
    await dropInstitutionTable()
    await dropUserTable()

  } catch(e) {
    console.error(e.message)
  }

  try {
    await createUserTable()
    // await createUser('test123', 'test123', '123', '456')
    // await createInstitutionTable()
    // await createInstitution('institution', 'college', 'uk', 'london')
    // await getInstitutionAll()
    // await updateInstitution(1, 'hello world - edit', -1)
    // await getInstitutionAll()
    // await getInstitution('name', 1)
  } catch(e) {
    console.error(e.message)
  }
}

await initializeDb()
await initializeItemTable()

process.exit(0)
