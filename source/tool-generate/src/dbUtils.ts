// src/dbUtils.ts
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'my_database',
})

export async function getTables(): Promise<string[]> {
  const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `

  const result = await pool.query(query)
  return result.rows.map((row) => row.table_name)
}

export async function getColumns(
  tableName: string
): Promise<{ column_name: string; data_type: string; [key: string]: any }[]> {
  const query = `
    SELECT *
    FROM information_schema.columns
    WHERE table_name = $1
  `
  const result = await pool.query(query, [tableName])
  return result.rows
}
