import Source from "./source";
import Config from "../../Config.json";
import SystemError from "./errors";
import { ActionOptions, Rect, Window, WindowStatus } from "src/types";

function getDefaultRect(windows: Window[], name: string) {
  const width = window.innerWidth;
  // const height = window.innerHeight;
  return {
    top: 32,
    bottom: 96,
    left: width * 0.2,
    right: width * 0.2,
  };
}

export function openWindow(projectName: string, options?: ActionOptions) {
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
  const key = crypto.getRandomValues(new Uint32Array(1))[0];
  data.activeWindows.push({
    key,
    name: projectName,
    project: projectName,
    type: project.type,
    rect,
    status: "normal",
    ...options,
  });

  Source.emit(data);

  return key;
}

export function openProject(name: string, options?: ActionOptions) {
  const project = Config.projects.find((proj) => proj.name === name);
  if (!project) return;
  const { activeProjects, activeWindows } = Source.last();
  if (activeProjects.has(name)) {
    // if (!project.multipleWindows) {
      // throw new SystemError("alr-opn");
      return sendWinfowToFront(
        activeWindows.filter((win) => win.project === name).at(-1)!.key
      );
    // }
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

function changeStatus(
  windowKey: number,
  status: Exclude<WindowStatus, "full-screen">
) {
  const data = Source.last();
  const index = data.activeWindows.findIndex((win) => win.key === windowKey);
  if (index === -1) {
    throw new SystemError("unk-ress");
  }
  data.activeWindows[index].status = status;
  Source.emit(data);
}
export function minimize(windowKey: number) {
  return changeStatus(windowKey, "minimize");
}
export function maximise(windowKey: number) {
  return changeStatus(windowKey, "maximize");
}
export function normalSize(windowKey: number) {
  return changeStatus(windowKey, "normal");
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

export function parseAction(
  actionString: string,
  options?: ActionOptions | Array<ActionOptions | null>
) {
  if (!actionString.length) return;
  const actions = actionString.split(";");
  return actions.map((action, index) => {
    const [func, project] = action.split(":");
    const opt = options instanceof Array ? options[index] : options;
    switch (func) {
      case "open":
        return openProject(project, opt || {});
      default:
        return null;
    }
  });
}

export function updateWindow(windowKey: number, options: Partial<Window>) {
  const data = Source.last();
  const index = data.activeWindows.findIndex((win) => win.key === windowKey);
  if (index === -1) {
    throw new SystemError("unk-ress");
  }
  for (const opt in options) {
    data.activeWindows[index][opt] = options[opt];
  }
  Source.emit(data);
}

export function resizeWindow(windowKey: number, newRect: Rect) {
  updateWindow(windowKey, { rect: newRect });
}

export function sendWinfowToFront(windowKey: number) {
  const data = Source.last();
  const index = data.activeWindows.findIndex((win) => win.key === windowKey);
  if (index === -1) {
    throw new SystemError("unk-ress");
  }
  if (index !== data.activeWindows.length - 1) {
    data.activeWindows.push(data.activeWindows.splice(index, 1)[0]);
    Source.emit(data);
  }
  if (data.activeWindows[index].status === "minimize") {
    normalSize(windowKey);
  }
}
