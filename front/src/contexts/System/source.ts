import { Window } from 'src/types';
import Config from 'src/Config.json'
import Clone from 'clone'


export type Executor<T> = (newData: T)=>T

export type SystemType = {
  activeProjects: Set<string>;
  activeWindows: Window[];
  background: string;
};
export const defaultSystem: SystemType = {
  activeProjects: new Set(),
  activeWindows: [],
  background: Config.ui.background.default
};

type Unlistener = () => void;
type Listener<T> = (newData: T) => void;

interface SystemInterface<T> {
  queue: Executor<T>[]
  history: SystemType[];
  listeners: Listener<T>[];
  isExecuting: boolean;
  last: ()=> T
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
    this.history.push(newData);
    this.listeners.forEach((b) => b(newData));
  },
  last(){
    return Clone(this.history.at(-1)!)
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
