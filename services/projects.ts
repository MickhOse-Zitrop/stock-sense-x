import { axiosInstance } from "@/services/instance";
import {
  CreateProjectData,
  EditProjectData,
  ProjectsDTO,
} from "@/services/dto/projects.dto";

export const getProjects = async (): Promise<ProjectsDTO> => {
  return (await axiosInstance.get<ProjectsDTO>("/projects")).data;
};

export const createProject = async (
  data: CreateProjectData,
): Promise<ProjectsDTO> => {
  return (await axiosInstance.post<ProjectsDTO>("/projects", data)).data;
};

export const updateProject = async (
  data: EditProjectData,
  id: number,
): Promise<ProjectsDTO> => {
  return (await axiosInstance.patch(`/projects/${id}`, { data })).data;
};

export const deleteProject = async (id: number): Promise<ProjectsDTO> => {
  return (await axiosInstance.delete(`/projects/${id}`)).data;
};

export const deleteProjectData = async (id: number): Promise<ProjectsDTO> => {
  return (await axiosInstance.post(`/projects/${id}`)).data;
};

export const getData = async (id: number): Promise<{ text: string }> => {
  return (await axiosInstance.get<{ text: string }>(`/projects/${id}`)).data;
};