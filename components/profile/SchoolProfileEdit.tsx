"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolProfileSchema } from "@/schemas";
import * as z from "zod";
import { updateSchoolProfile, getCategories } from "@/actions/school-profile";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { FormSection } from "./school/FormSection";
import { FormInput } from "./school/FormInput";
import { FormTextArea } from "./school/FormTextArea";
import { CategoryMultiSelect } from "./school/CategoryMultiSelect";

interface SchoolProfileEditProps {
    initialData: any;
}

export const SchoolProfileEdit = ({ initialData }: SchoolProfileEditProps) => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof SchoolProfileSchema>>({
        resolver: zodResolver(SchoolProfileSchema),
        defaultValues: {
            officialName: initialData?.officialName || "",
            nit: initialData?.nit || "",
            description: initialData?.description || "",
            mission: initialData?.mission || "",
            vision: initialData?.vision || "",
            logoUrl: initialData?.logoUrl || "",
            department: initialData?.department || "",
            city: initialData?.city || "",
            address: initialData?.address || "",
            phone: initialData?.phone || "",
            contactEmail: initialData?.contactEmail || "",
            facebookUrl: initialData?.facebookUrl || "",
            instagramUrl: initialData?.instagramUrl || "",
            websiteUrl: initialData?.websiteUrl || "",
            categoryIds: initialData?.categories?.map((c: any) => c.id) || [],
            approximatePlayers: initialData?.approximatePlayers || 0,
            headCoachName: initialData?.headCoachName || "",
            achievements: initialData?.achievements || "",
        },
    });
    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            const cats = await getCategories();
            setCategories(cats);
        };
        fetchCategories();
    }, []);


    const onSubmit = async (values: z.infer<typeof SchoolProfileSchema>) => {
        setError("");
        setSuccess("");
        setIsPending(true);

        try {
            const result = await updateSchoolProfile(values);
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(result.success);
                setTimeout(() => {
                    router.push("/perfil");
                    router.refresh();
                }, 1000);
            }
        } catch (err) {
            setError("Error al actualizar el perfil");
        } finally {
            setIsPending(false);
        }
    };

    const handleCancel = () => {
        router.push("/perfil");
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <FormSection title="Información Básica">
                <FormInput
                    id="officialName"
                    label="Nombre oficial de la escuela *"
                    placeholder="Academia de Fútbol Elite"
                    disabled={isPending}
                    register={form.register("officialName")}
                    error={form.formState.errors.officialName?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        id="nit"
                        label="NIT (opcional)"
                        placeholder="123456789-0"
                        disabled={isPending}
                        register={form.register("nit")}
                    />

                    <FormInput
                        id="logoUrl"
                        label="URL del Logo"
                        placeholder="https://ejemplo.com/logo.png"
                        disabled={isPending}
                        register={form.register("logoUrl")}
                    />
                </div>

                <FormTextArea
                    id="description"
                    label="Descripción"
                    placeholder="Describe tu escuela..."
                    disabled={isPending}
                    register={form.register("description")}
                    rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormTextArea
                        id="mission"
                        label="Misión"
                        placeholder="Nuestra misión es..."
                        disabled={isPending}
                        register={form.register("mission")}
                        rows={3}
                    />

                    <FormTextArea
                        id="vision"
                        label="Visión"
                        placeholder="Nuestra visión es..."
                        disabled={isPending}
                        register={form.register("vision")}
                        rows={3}
                    />
                </div>
            </FormSection>

            {/* Ubicación */}
            <FormSection title="Ubicación">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        id="department"
                        label="Departamento"
                        placeholder="Antioquia"
                        disabled={isPending}
                        register={form.register("department")}
                    />

                    <FormInput
                        id="city"
                        label="Ciudad"
                        placeholder="Medellín"
                        disabled={isPending}
                        register={form.register("city")}
                    />
                </div>

                <FormInput
                    id="address"
                    label="Dirección específica"
                    placeholder="Calle 123 #45-67"
                    disabled={isPending}
                    register={form.register("address")}
                />
            </FormSection>

            {/* Contacto */}
            <FormSection title="Contacto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        id="phone"
                        label="Teléfono"
                        placeholder="+57 300 123 4567"
                        disabled={isPending}
                        register={form.register("phone")}
                    />

                    <FormInput
                        id="contactEmail"
                        label="Correo de contacto"
                        type="email"
                        placeholder="contacto@escuela.com"
                        disabled={isPending}
                        register={form.register("contactEmail")}
                    />
                </div>

                <FormInput
                    id="facebookUrl"
                    label="Facebook"
                    placeholder="https://facebook.com/tuescuela"
                    disabled={isPending}
                    register={form.register("facebookUrl")}
                />

                <FormInput
                    id="instagramUrl"
                    label="Instagram"
                    placeholder="https://instagram.com/tuescuela"
                    disabled={isPending}
                    register={form.register("instagramUrl")}
                />

                <FormInput
                    id="websiteUrl"
                    label="Sitio Web"
                    placeholder="https://tuescuela.com"
                    disabled={isPending}
                    register={form.register("websiteUrl")}
                />
            </FormSection>

            {/* Datos Deportivos */}
            <FormSection title="Datos Deportivos">
                <CategoryMultiSelect
                    id="categoryIds"
                    label="Categorías disponibles"
                    categories={categories}
                    selectedIds={form.watch("categoryIds") || []}
                    onChange={(selectedIds) => form.setValue("categoryIds", selectedIds)}
                    disabled={isPending}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        id="approximatePlayers"
                        label="Número aproximado de jugadores"
                        type="number"
                        placeholder="150"
                        disabled={isPending}
                        register={form.register("approximatePlayers", { valueAsNumber: true })}
                    />

                    <FormInput
                        id="headCoachName"
                        label="Director técnico principal"
                        placeholder="Carlos Rodríguez"
                        disabled={isPending}
                        register={form.register("headCoachName")}
                    />
                </div>

                <FormTextArea
                    id="achievements"
                    label="Logros destacados"
                    placeholder="Campeones regionales 2024, Formadores de 5 jugadores profesionales..."
                    disabled={isPending}
                    register={form.register("achievements")}
                    rows={4}
                />
            </FormSection>

            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isPending}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-300"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition duration-300"
                >
                    {isPending ? "Guardando..." : "Guardar Cambios"}
                </button>
            </div>
        </form>
    );
};

