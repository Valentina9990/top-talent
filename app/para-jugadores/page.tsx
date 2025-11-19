import { getSchools, getDepartments } from "@/data/school";
import { getCategories } from "@/actions/school-profile";
import FeedClient from "./FeedClient";

export default async function ParaJugadoresPage() {
  const [schools, departments, categories] = await Promise.all([
    getSchools(),
    getDepartments(),
    getCategories(),
  ]);

  return <FeedClient initialSchools={schools} departments={departments} categories={categories} />;
}