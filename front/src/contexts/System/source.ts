



export type Window = {
    key: number;
    name: string;
    project: number;
    type: string;
}

export type SystemType = {
    activeProjects: string[];
    activeWindows: Window[];
};
export const defaultSystem: SystemType = {
    activeProjects: [],
    activeWindows: []
};

type Unlistener = () => void;
type Listener<T> = (newData: T) => void;

interface SystemInterface<T> {
  emit: (newData: T) => void;
  listen: (callback: Listener<T>) => Unlistener;
  listeners: Listener<T>[];
  history: SystemType[];
}

const System: SystemInterface<SystemType> = {
  emit(newData) {
    this.history.push(newData)
    this.listeners.forEach((b) => b(newData));
  },
  listen(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((func) => func !== callback);
    };
  },
  listeners: [],
  history: [defaultSystem]
};

export default System;
