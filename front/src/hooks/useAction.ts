import { ActionOptions } from "src/types"
import React from 'react';
import System from "src/contexts/System";

type UseAction = (action: string, options: ActionOptions | ActionOptions[]) => ()=>void

export const useAction : UseAction = (action, options) =>{
    const lastClick = React.useRef<number>(0)
    return function doAction(){
        if((Date.now() - lastClick.current) >= 1_000){
          lastClick.current = Date.now()
          System.parseAction(action, options)
        }
      }
}