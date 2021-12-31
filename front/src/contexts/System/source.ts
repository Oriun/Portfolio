export type Window = {
  key: number;
  name: string;
  project: number;
  type: string;
};

export type Executor<T> = (newData: T)=>T

export type SystemType = {
  activeProjects: string[];
  activeWindows: Window[];
};
export const defaultSystem: SystemType = {
  activeProjects: [],
  activeWindows: [],
};

type Unlistener = () => void;
type Listener<T> = (newData: T) => void;

interface SystemInterface<T> {
  queue: Executor<T>[]
  history: SystemType[];
  listeners: Listener<T>[];
  isExecuting: boolean;
  emit: (newData: T) => void;
  listen: (callback: Listener<T>) => Unlistener;
  export: () => string;
  execute: (ex: Executor<T>) => void;
  recover: (backup: string) => void;
}

const System: SystemInterface<SystemType> = {
  listeners: [],
  queue: [],
  isExecuting: false,
  history: [defaultSystem],
  emit(newData) {
    this.history.push(Object.freeze(newData));
    this.listeners.forEach((b) => b(newData));
  },
  listen(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((func) => func !== callback);
    };
  },
  export(){
    return JSON.stringify(this.history.at(-1)) // Provisory
  },
  recover(backup){
    this.history.push(JSON.parse(backup)) // Provisory
  },
  execute(ex){

  }
};

export default System;
