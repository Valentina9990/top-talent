"use server";
import { SchoolFilters, getSchools } from "@/data/school";
export async function searchSchools(filters: SchoolFilters) {
  try {
    const schools = await getSchools(filters);
    return {
      success: true,
      schools,
    };
  } catch (error) {
    console.error("Error searching schools:", error);
    return {
      success: false,
      error: "Error al buscar escuelas",
    };
  }
}
