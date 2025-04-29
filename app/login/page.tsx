/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator"

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = () => {
      const remembered = localStorage.getItem("rememberMe");
      if (remembered !== "true") {
        signOut({ redirect: false });
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    if (status === "authenticated" && remembered === "true") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }
        router.push("/dashboard");
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

 
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4 overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full">
        <div className=" w-[660px] sm:w-[660px] md:w-[720px] lg:w-[820px] relative aspect-[3/1]">
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
              Iniciar sesión
            </CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm">
              Ingresa tus datos para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4 sm:px-5 pt-2">
            <form onSubmit={handleLogin} className="space-y-2.5">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-8 sm:h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs sm:text-sm">
                    Contraseña
                  </Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs font-normal"
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-8 sm:h-9 text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="h-3.5 w-3.5" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                <Label htmlFor="remember" className="text-xs font-normal">
                  Recordar mi sesión
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full h-8 sm:h-9 text-xs sm:text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>

            {/* <div className="flex items-center py-0.5">
              <Separator className="flex-1" />
              <span className="mx-2 text-xs text-gray-400">O continúa con</span>
              <Separator className="flex-1" />
            </div> */}
            {/* Espacio reservado para futuros botones de redes sociales */}
          </CardContent>
          <CardFooter className="flex justify-center px-4 pb-3 pt-0 sm:px-5 sm:pb-4">
            <p className="text-xs text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Button onClick={() => router.push("/register")} variant="link" className="p-0 h-auto text-xs">
                Regístrate
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
