import Source from "./source";
import Config from "../../Config.json";
import SystemError from "./errors";

export function openWindow(projectName: string) {}

export function openProject(name: string) {
  const project = Config.projects.find((proj) => proj.name === name);
  if (!project) return;
  const { activeProjects } = Source.history.at(-1)!;
  if (
    !project.multipleWindows &&
    activeProjects.find((proj) => proj === name)
  ) {
    throw new SystemError("alr-opn");
  }
  return openWindow(name);
}

export function closeWindow() {}

export function closeProject() {}
