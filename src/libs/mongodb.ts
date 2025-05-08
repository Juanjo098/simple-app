import { MongoClient } from 'mongodb'
import { CONNECTION_STRING } from '../config'

const client = new MongoClient(CONNECTION_STRING)

export async function mongodbClient(callback: (c: MongoClient) => Promise<any>) {
  await client.connect()

  const result = await callback(client)

  await client.close()

  return result
}
