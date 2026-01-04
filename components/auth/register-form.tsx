"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import Link from "next/link";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      role: "PLAYER"
    }
  });

  const selectedRole = form.watch("role");

  const onSubmit = (values: RegisterFormData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
    });
  }

  return (
    <CardWrapper
      headerLabel=""
      backButtonLabel="¿Ya tienes cuenta?"
      backButtonHref="/auth/login"
      showSocial={false}
    
    >
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6" 
        >

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Tipo de cuenta</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => field.onChange("PLAYER")}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          field.value === "PLAYER"
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="font-semibold">Jugador</div>
                        <div className="text-xs text-gray-600 mt-1">
                          Perfil individual
                        </div>
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => field.onChange("SCHOOL")}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          field.value === "SCHOOL"
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="font-semibold">Escuela</div>
                        <div className="text-xs text-gray-600 mt-1">
                          Perfil institucional
                        </div>
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {selectedRole === "SCHOOL" ? "Nombre de la escuela" : "Nombre completo"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={selectedRole === "SCHOOL" ? "Academia de Fútbol XYZ" : "Juan Pérez"}
                      className="h-11 border border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isPending}
                      placeholder="tucorreo@ejemplo.com"
                      className="h-11 border border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="••••••••"
                      className="h-11 border border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="••••••••"
                      className="h-11 border border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="text-xs text-gray-600">
            Al registrarte o iniciar sesión, aceptas automáticamente nuestros{' '}
            <Link 
              href="/terms" 
              className="text-primary-500 hover:text-primary-800 underline"
            >
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link 
              href="/policy" 
              className="text-primary-500 hover:text-primary-800 underline"
            >
              Política de Privacidad
            </Link>
            .
          </div>
          
          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-11 bg-primary-500 text-white hover:bg-primary-700 font-medium">
            {isPending ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;