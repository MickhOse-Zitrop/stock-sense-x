import { Project } from "@/app/generated/prisma/client";

export interface ProjectsDTO {
  projects: Project[];
  lastProject?: Project;
}

export interface CreateProjectData {
  name: string;
}

export interface EditProjectData {
  name: string;
  description: string;
}