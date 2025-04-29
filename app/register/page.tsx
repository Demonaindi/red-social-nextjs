"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Error al registrar");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4 overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-[660px] sm:w-[660px] md:w-[720px] lg:w-[820px] relative aspect-[3/1]">
          <Image
            src="/assets/images/logo.png"
            alt="Atypik logo"
            fill
            className="dark:invert object-contain"
            priority
          />
        </div>

        <Card className="w-full max-w-[360px] sm:max-w-[400px] md:max-w-[420px] shadow-lg">
          <CardHeader className="space-y-0.5 px-4 pt-3 pb-1 sm:px-5 sm:pt-4">
            <CardTitle className="text-lg sm:text-xl font-bold text-center">
              Registrarse
            </CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm space-x-1">
              <span>Ingresa tus datos para</span>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 ">
                salir
              </span>
              <span>de lo tipico</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4 sm:px-5 pt-2">
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs sm:text-sm">
                  Nombre
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-8 sm:h-9 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  Email
                </Label>
                <Input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-8 sm:h-9 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="password" className="text-xs sm:text-sm">
                  Contraseña
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-8 sm:h-9 text-sm"
                />
              </div>
              <Button className="w-full" disabled={isLoading}>
                {isLoading ? "Creando..." : "Registrarme"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center px-4 pb-3 pt-0 sm:px-5 sm :pb-4">
            <p className="text-xs text-gray-500">
              ¿Ya tenés cuenta?{" "}
              <Button
                variant="link"
                onClick={() => router.push("/login")}
                className="p-0 h-auto text-xs"
              >
                Iniciar sesión
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
