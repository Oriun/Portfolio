import React from "react";
import * as ai from "react-icons/ai";
import * as bi from "react-icons/bi";
import * as bs from "react-icons/bs";
import * as cg from "react-icons/cg";
import * as di from "react-icons/di";
import * as fa from "react-icons/fa";
import * as fc from "react-icons/fc";
import * as fi from "react-icons/fi";
import * as gi from "react-icons/gi";
import * as go from "react-icons/go";
import * as gr from "react-icons/gr";
import * as hi from "react-icons/hi";
import * as im from "react-icons/im";
import * as io from "react-icons/io";
import * as io5 from "react-icons/io5";
import * as md from "react-icons/md";
import * as ri from "react-icons/ri";
import * as si from "react-icons/si";
import * as ti from "react-icons/ti";
import * as vsc from "react-icons/vsc";
import * as wi from "react-icons/wi";

const ReactIcons = {
  ai,
  bi,
  bs,
  cg,
  di,
  fa,
  fc,
  fi,
  gi,
  go,
  gr,
  hi,
  im,
  io,
  io5,
  md,
  ri,
  si,
  ti,
  vsc,
  wi,
};

export const useIcones = (url: string): React.FC<any> => {
  return React.useMemo(() => {
    if (url.startsWith("icone:")) {
      const [iconPackage, iconName] = url.split(":")[1].split("/")
      if (iconPackage in ReactIcons) {
        // @ts-ignore
        const Icon = ReactIcons[iconPackage][iconName];
        if (Icon) return Icon;
      }
      return () => <></>;
    }
    return (props: any) => <img src={url} alt="" {...props} />;
  }, [url]);
};
