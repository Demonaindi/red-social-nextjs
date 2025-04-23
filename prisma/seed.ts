// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash("mose123", 10)

  await prisma.user.upsert({
    where: { email: "demianonaindi919@gmail.com" },
    update: {},
    create: {
      name: "Demian Onaindi",
      email: "demianonaindi919@gmail.com",
      password,
    },
  })

  console.log("✅ Usuario creado: demianonaindi919@gmail.com / mose123")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
