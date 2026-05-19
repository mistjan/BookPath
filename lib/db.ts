export function assertDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
