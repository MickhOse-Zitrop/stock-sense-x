"use client";

import { useProjectsStore } from "@/store";
import { useEffect } from "react";

export const useProjects = () => {
  const projectsState = useProjectsStore((state) => state);

  useEffect(() => {
    projectsState.fetchProjects().then();
  }, []);

  return projectsState;
};