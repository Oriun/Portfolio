import Source, { SystemType } from "./source";
import Config from "../../Config.json";
import SystemError from "./errors";
import { Window } from "src/types";

type OpenOptions = {
  [key: string]: any;
};

function getDefaultRect(windows: Window[], name: string) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    top: 32,
    height: height - 32 - 96,
    left: width * 0.2,
    width: width * 0.6,
  };
}

export function openWindow(projectName: string, options?: OpenOptions) {
  console.log("open window");
  const project = Config.projects.find((proj) => proj.name === projectName);
  if (!project) return;
  const data = Source.last();
  if (data.activeProjects.has(projectName)) {
    if (!project.multipleWindows) {
      throw new SystemError("alr-opn");
    }
  } else {
    data.activeProjects.add(projectName);
  }
  const rect = getDefaultRect(data.activeWindows, projectName);
  data.activeWindows.push({
    key: crypto.getRandomValues(new Uint32Array(1))[0],
    name: projectName,
    project: projectName,
    type: project.type,
    rect,
    status: "normal",
    ...options,
  });

  Source.emit(data);
}

export function openProject(name: string, options?: OpenOptions) {
  console.log("open project");
  const project = Config.projects.find((proj) => proj.name === name);
  if (!project) return;
  const { activeProjects } = Source.last();
  if (!project.multipleWindows && activeProjects.has(name)) {
    throw new SystemError("alr-opn");
  }
  return openWindow(name, options);
}

export function closeWindow(windowKey: number) {
  const data = Source.last();
  const index = data.activeWindows.findIndex((win) => win.key === windowKey);
  if (index === -1) {
    throw new SystemError("unk-ress");
  }
  const removedWindow = data.activeWindows.splice(index, 1)[0];
  if (
    !data.activeWindows.find((win) => win.project === removedWindow.project)
  ) {
    data.activeProjects.delete(removedWindow.project);
  }
  Source.emit(data);

  return removedWindow;
}

export function closeProject() {}

export function goFullScreen(windowKey: number) {}

function changeStatus(windowKey: number, status: "normal" | "minimize" | "maximize") {
  const data = Source.last();
  const index = data.activeWindows.findIndex((win) => win.key === windowKey);
  if (index === -1) {
    throw new SystemError("unk-ress");
  }
  data.activeWindows[index].status = status

  Source.emit(data);
}
export function minimize(windowKey: number) {
  return changeStatus(windowKey, "minimize")
}
export function maximise(windowKey: number) {
  return changeStatus(windowKey, "maximize")
}
export function normalSize(windowKey: number) {
  return changeStatus(windowKey, "normal")
}

export function changeBackground(to: string) {
  const availableBg = Config.ui.background.available;
  if (availableBg.includes(to)) {
    const data = Source.last();
    data.background = to;
    Source.emit(data);
  } else {
    throw new SystemError("unk-ress");
  }
}
