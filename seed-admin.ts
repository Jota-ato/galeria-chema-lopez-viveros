import "dotenv/config";
import { auth } from "@/lib/auth";

async function seed() {
  const newUser = await auth.api.createUser({
    body: {
      email: "juliozavala@julio-zavala.me",
      password: "Ml_kowalski15@",
      name: "Julio Zavala",
    },
  });

  console.log("Usuario creado:", newUser);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error al sembrar el usuario:", err);
    process.exit(1);
  });
