/* eslint-disable react/jsx-no-undef */
"use client";

import type React from "react";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
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
import { Separator } from "@/components/ui/separator";
// import { Facebook, Twitter } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error(`Error al iniciar sesión con ${provider}:`, error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div>
        <Image
          className="dark:invert"
          src="/assets/images/logo.png"
          alt="Atypik logo"
          width={300}
          height={300}
          priority
        />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tus datos para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
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
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                Recordar mi sesión
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <div className="flex items-center">
            <Separator className="flex-1" />
            <span className="mx-2 text-xs text-gray-400">O continúa con</span>
            <Separator className="flex-1" />
          </div>

          {/* <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
            >
              <Facebook size={16} />
              <span>Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleSocialLogin("twitter")}
              disabled={isLoading}
            >
              <Twitter size={16} />
              <span>Twitter</span>
            </Button>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            ¿No tienes una cuenta?{" "}
            <Button variant="link" className="p-0 h-auto text-sm">
              Regístrate
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
