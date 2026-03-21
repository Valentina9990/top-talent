"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ScoutProfileSchema } from "@/schemas";
import { updateScoutProfile } from "@/actions/scout-profile";
import { getDepartments, getCitiesByDepartment } from "@/actions/player-profile";
import { Department, City } from "@/types/player-profile";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { FormInput } from "@/components/profile/school/FormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScoutProfileEditProps {
  initialData: {
    primaryPhone?: string | null;
    secondaryPhone?: string | null;
    yearsExperience?: number | null;
    departmentId?: string | null;
    cityId?: string | null;
  } | null;
}

export const ScoutProfileEdit = ({ initialData }: ScoutProfileEditProps) => {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ScoutProfileSchema>>({
    resolver: zodResolver(ScoutProfileSchema),
    defaultValues: {
      primaryPhone: initialData?.primaryPhone || "",
      secondaryPhone: initialData?.secondaryPhone || "",
      yearsExperience: initialData?.yearsExperience ?? undefined,
      departmentId: initialData?.departmentId || "",
      cityId: initialData?.cityId || "",
    },
  });

  // Load departments on mount
  useEffect(() => {
    const load = async () => {
      const result = await getDepartments();
      if (result.departments) {
        setDepartments(result.departments);
      }
    };
    load();
  }, []);

  // Load cities when department changes (including initial)
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "departmentId") {
        const departmentId = value.departmentId as string | undefined;

        if (!departmentId) {
          setCities([]);
          return;
        }

        setLoadingCities(true);
        getCitiesByDepartment(departmentId).then((res) => {
          if (res.cities) setCities(res.cities);
          setLoadingCities(false);
        });
      }
    });

    // Trigger load for initial department
    const currentDept = form.getValues("departmentId");
    if (currentDept) {
      setLoadingCities(true);
      getCitiesByDepartment(currentDept).then((res) => {
        if (res.cities) setCities(res.cities);
        setLoadingCities(false);
      });
    }

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (values: z.infer<typeof ScoutProfileSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await updateScoutProfile(values);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        setTimeout(() => {
          router.push("/perfil");
          router.refresh();
        }, 1000);
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar perfil de scout</h1>
        <button
          type="button"
          onClick={() => router.push("/perfil")}
          className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300"
        >
          Cancelar
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="primaryPhone"
            label="Teléfono principal"
            placeholder="Ej: +57 300 123 4567"
            disabled={isPending}
            register={form.register("primaryPhone")}
            error={form.formState.errors.primaryPhone?.message}
          />

          <FormInput
            id="secondaryPhone"
            label="Teléfono secundario"
            placeholder="Opcional"
            disabled={isPending}
            register={form.register("secondaryPhone")}
            error={form.formState.errors.secondaryPhone?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento
            </label>
            <Select
              value={form.watch("departmentId") || ""}
              onValueChange={(value) => {
                form.setValue("departmentId", value);
                form.setValue("cityId", "");
              }}
              disabled={isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar departamento" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <Select
              value={form.watch("cityId") || ""}
              onValueChange={(value) => form.setValue("cityId", value)}
              disabled={isPending || !form.watch("departmentId") || loadingCities}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !form.watch("departmentId")
                      ? "Selecciona un departamento primero"
                      : loadingCities
                      ? "Cargando..."
                      : "Seleccionar ciudad"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="yearsExperience"
            label="Años de experiencia"
            type="number"
            placeholder="Ej: 5"
            min={0}
            disabled={isPending}
            register={form.register("yearsExperience", { valueAsNumber: true })}
            error={form.formState.errors.yearsExperience?.message}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};
