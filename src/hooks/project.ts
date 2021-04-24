import api from "../services/api";

interface Project {
  name: string;
  description: string;
  viability: number;
  start_date: Date;
  end_date: Date;
  status: string;
  value: number;
  name_responsible: string;
}

export async function useGetProjects() {
  const response = await api.get("api/v1/projects");

  return response.data;
}

export async function useCreateProject(
  name: string,
  description: string,
  viability: number,
  start_date: Date,
  end_date: Date,
  status: string,
  value: number,
  name_responsible: string
) {
  const response = await api.post("api/v1/projects/create", {
    name,
    description,
    viability,
    start_date,
    end_date,
    status,
    value,
    name_responsible,
  });

  return response;
}

export async function useDeleteProject(slug: string) {
  try {
    const response = await api.delete(`api/v1/project/${slug}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function useUpdateProject(
  description: string,
  viability: number,
  status: string,
  slug: string
) {
  const response = await api.put(`api/v1/project/${slug}`, {
    description,
    viability,
    status,
  });

  return response;
}
