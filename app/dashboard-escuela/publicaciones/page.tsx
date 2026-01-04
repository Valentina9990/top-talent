import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSchoolPosts } from "@/actions/school-posts";
import { getSchoolProfile } from "@/actions/school-profile";
import { CreatePostForm, PostList } from "@/components/school-posts";
import { FileText } from "lucide-react";

export default async function PublicacionesPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "SCHOOL") {
    redirect("/");
  }

  const schoolProfile = await getSchoolProfile(session.user.id);

  if (!schoolProfile) {
    return <div>Error: No se pudo cargar el perfil de la escuela</div>;
  }

  const postsResult = await getSchoolPosts(schoolProfile.id);
  const posts = postsResult.success && postsResult.posts ? postsResult.posts : [];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-500 to-primary-500 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <FileText className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Publicaciones</h1>
            <p className="text-white/90 text-lg">
              Comparte noticias, logros y actualizaciones con la comunidad
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <CreatePostForm schoolId={schoolProfile.id} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
