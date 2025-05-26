import { JSX } from "react";

export type Type = "warning" | "success" | "error";


export interface AlertCustom{
    type: Type;
    heading: string;
    message: string;
}

export interface AlertContextType{
    alert:AlertCustom|null;
    showAlert:(type:Type, heading:string, message:string)=>void;
    collapse: ()=>void;
}

export interface SVGComponents {
    success: JSX.Element;
    error: JSX.Element;
    warning: JSX.Element;
  }