import prisma from "@/lib/prisma";

export interface SchoolFilters {
  name?: string;
  department?: string;
  city?: string;
  category?: string;
}

export async function getSchools(filters?: SchoolFilters) {
  try {
    const schoolProfileWhere: any = {};

    if (filters?.department) {
      schoolProfileWhere.department = {
        contains: filters.department,
        mode: "insensitive",
      };
    }

    if (filters?.city) {
      schoolProfileWhere.city = {
        contains: filters.city,
        mode: "insensitive",
      };
    }

    const whereClause: any = {
      schoolProfile: {
        isNot: null,
        ...(Object.keys(schoolProfileWhere).length > 0 && { is: schoolProfileWhere }),
      },
      role: "SCHOOL",
    };

    if (filters?.name) {
      whereClause.name = {
        contains: filters.name,
        mode: "insensitive",
      };
    }

    let filteredSchools = await prisma.user.findMany({
      where: whereClause,
      include: {
        schoolProfile: {
          include: {
            categories: true,
            _count: {
              select: {
                players: true,
                posts: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (filters?.category && filters.category !== "") {
      filteredSchools = filteredSchools.filter((school) =>
        school.schoolProfile?.categories.some(
          (cat) => cat.name === filters.category
        )
      );
    }

    return filteredSchools;
  } catch (error) {
    console.error("Error fetching schools:", error);
    return [];
  }
}

export async function getDepartments() {
  try {
    const schools = await prisma.schoolProfile.findMany({
      where: {
        department: {
          not: null,
        },
      },
      select: {
        department: true,
      },
      distinct: ["department"],
      orderBy: {
        department: "asc",
      },
    });
    return schools
      .map((s) => s.department)
      .filter((d): d is string => d !== null);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}
