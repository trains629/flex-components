import React, { useState } from 'react';
import InputGroup from "./InputGroup";
import {useFlexContext} from "@trains629/flex-core";

function initInputValue(value,type,defaultValue,readOnly){
  let dfv = typeof defaultValue !== "object" ? {value:defaultValue}:defaultValue;
  
  if(type === "number"){
    return typeof defaultValue !== "undefined" ? (value || defaultValue) : (value || 0);
  }

  if(typeof defaultValue === "undefined"){
    return value || "";
  }
  
  if(!value && readOnly){
    return dfv["value"] || "";
  }

  // 有默认值
  return typeof value !== "undefined" ? value : defaultValue; 
}

export default function Input(props){
  let {list,type,className,placeholder,checkValue,defaultValue,updateValue:upV,
    value:oldValue,children,setValue:setV} = props;
  let {FlexMode} = useFlexContext();
  let readOnly = false;
  const [value,setIputValue] = useState(()=>{
    return initInputValue(oldValue,type,defaultValue,readOnly);
  });
  
  const _setValue = (value)=>{
    setIputValue(value);
    setV(value);
  }
  
  let attr = type === 'checkbox' ? {checked:value}:
    {value:(type === "text")? (value||""):value};
  attr["className"] = className;
  attr["onChange"] = (e)=>{
    const {target} = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    _setValue(value);
  }
  if(readOnly)attr["readOnly"]=readOnly;
  let Input = type === "textarea" ? <textarea {...attr} />: <input type={type} 
    placeholder={placeholder} {...attr} />;
  return list ? <InputGroup list={list} updateValue={(value1,type)=>{
      _setValue(typeof upV === "function" ? upV(value,value1,type):value1);
    }}>{Input}</InputGroup> :Input;
}