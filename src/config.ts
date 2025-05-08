import { config } from 'dotenv'
import { z } from 'zod'

config({ path: '.env' })

const schema = z.object({
  CONNECTION_STRING: z.string(),
  PORT: z.coerce.number()
})

const parseData = schema.safeParse(process.env)

if (!parseData.success) throw new Error('Invalid env vars')

export const { PORT, CONNECTION_STRING } = parseData.data