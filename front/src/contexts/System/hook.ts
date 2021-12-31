import React from "react";
import Source, { SystemType, defaultSystem } from "./source";
import deepEqual from "deep-equal";

type mappingFunction<T> = (data: SystemType) => T;

function useSystem<T = any>(map: mappingFunction<T>): T {
  const [mapped, set] = React.useState<T>(map(defaultSystem));

  React.useEffect(() => {
    return Source.listen(function (newData) {
      const newMapped = map(newData);
      if (!deepEqual(newMapped, mapped)) {
        set(newMapped);
      }
    });
  }, [mapped, set, map]);

  return mapped;
}

export default useSystem