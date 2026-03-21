import prisma from "@/lib/prisma";

export interface SchoolFilters {
  name?: string;
  department?: string;
  city?: string;
  category?: string;
}

export async function getSchools(filters?: SchoolFilters) {
  try {
    const whereClause: any = {
      schoolProfile: {
        isNot: null,
      },
      role: "SCHOOL",
    };

    if (filters?.department) {
      whereClause.schoolProfile.department = {
        is: {
          name: {
            contains: filters.department,
            mode: "insensitive",
          },
        },
      };
    }

    if (filters?.city) {
      whereClause.schoolProfile.city = {
        is: {
          name: {
            contains: filters.city,
            mode: "insensitive",
          },
        },
      };
    }

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
            department: true,
            city: true,
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
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" },
    });
    return departments.map((d) => d.name);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}
