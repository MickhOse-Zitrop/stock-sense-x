import { create } from "zustand/react";
import { Api } from "@/services/api-client";
import { Project } from "@/app/generated/prisma/client";
import {
  CreateProjectData,
  EditProjectData,
} from "@/services/dto/projects.dto";
import { toast } from "sonner";
import { csvToArray } from "@/lib/csv-to-array";

export interface ProjectsState {
  projects: Project[];
  lastProject?: Project;
  projectData?: { [k: string]: string }[];

  loading: boolean;
  error: boolean;

  createProject: (
    data: CreateProjectData,
    callback: (href: string) => void,
  ) => Promise<void>;
  editProject: (data: EditProjectData) => Promise<void>;
  deleteProject: (
    id: number,
    callback: (href: string) => void,
  ) => Promise<void>;
  deleteProjectData: (id: number) => Promise<void>;
  fetchProjects: () => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  lastProject: undefined,
  loading: true,
  error: false,
  projectData: [],

  createProject: async (values: CreateProjectData, callback) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.projects.createProject(values);
      set({ ...data });
      toast.success("Проект успешно создан!");
      callback(`/${get().lastProject!.id}`);
    } catch (error) {
      console.log(error);
      set({ error: true });
      toast.error("Ошибка при создании. Попробуйте еще раз");
    } finally {
      set({ loading: false });
    }
  },

  editProject: async (values: EditProjectData) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.projects.updateProject(
        values,
        get().lastProject!.id,
      );
      set({ ...data });
      toast.success("Проект успешно изменен!");
    } catch (error) {
      console.log(error);
      set({ error: true });
      toast.error("Ошибка при изменении. Попробуйте еще раз");
    } finally {
      set({ loading: false });
    }
  },

  deleteProject: async (id: number, callback) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.projects.deleteProject(id);
      set({ ...data });
      toast.success("Проект успешно удален!");
      callback(`/undefiend`);
    } catch (error) {
      console.log(error);
      set({ error: true });
      toast.error("Ошибка при удалении. Попробуйте еще раз");
    } finally {
      set({ loading: false });
    }
  },

  deleteProjectData: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.projects.deleteProjectData(id);
      set({ ...data });
      toast.success("Данные успешно удалены!");
    } catch (error) {
      console.log(error);
      set({ error: true });
      toast.error("Ошибка при удалении. Попробуйте еще раз");
    } finally {
      set({ loading: false });
    }
  },

  fetchProjects: async () => {
    try {
      set({ loading: true, error: false });
      const projects = await Api.projects.getProjects();
      set({ ...projects });
      const data = await Api.projects.getData(get().lastProject!.id);
      set({ projectData: csvToArray(data.text) });
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));