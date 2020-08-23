import React, { useState } from 'react';
import {useFlexContext} from "@trains629/flex-core";

function initInputValue(value,type,defaultValue){
  // 没有初始值
  if(type === "number"){
    return typeof defaultValue !== "undefined" ? (value || defaultValue) : (value || 0);
  }
  if(typeof defaultValue === "undefined"){
    return value || "";
  }
  // 有默认值
  return typeof value !== "undefined" ? value : defaultValue; 
}

function getDefaultValue(defaultValue,FlexMode,children){
  if(FlexMode === "edit" && typeof defaultValue==="object"){
    let {kind,value} = defaultValue;
    return kind === "value" ? value : ""
  }
  if(children && typeof children === "object"){
    let {attribute = {}} = children;
    return attribute.hasOwnProperty("defaultValue")?attribute["defaultValue"]:undefined;
  }
  return  defaultValue;
}

function infoObject(FlexMode) {
  return typeof FlexMode === "object" && FlexMode.type === "props" && 
    typeof FlexMode.info === "object"
}

/**
 * 
 * 现在需要在text上增加扩展的支持，在内容加载到text前需要将字符串去掉转换符，而当手动修改text内容的时候
 * ，对属性值进行修改，在将内容进行替换
 * 现在准备先针对\n进行处理，或者使用正则，
 * \a \b \f \n \r \t \v \\ \' \" \? \0 \\ \ddd \xhh
 * 现在应该就只有\n需要单独处理
 * 在加载的时候将特定字符转换为\n,在编辑的时候将\n转换为特殊字符
 * 默认字符 {{<br/>}}
 */

const _M_BR = "{{ br }}";
function replaceM(str = "",m = true){
  return str;
  if(m)return str.replace(/\n/g,_M_BR)
  return str.replace(/\{\{\s+(.*?)\s+\}\}/g,(a1,a2)=>{
    console.log(49,a1,a2);
    return "\n"
  })
}

export default function Text(props){
  let {type,className,checkValue,defaultValue,value:oldValue,children,setV} = props;
  let {FlexMode} = useFlexContext();
  let readOnly = false;
  if(infoObject(FlexMode)){
    let {readOnly:ro} = FlexMode.info;
    if(ro)readOnly = true;
  }

  let defaultValue1 = getDefaultValue(defaultValue,FlexMode,children);
  const [value,setIputValue] = useState(initInputValue(oldValue,type,defaultValue1));
  
  const _setValue = (value)=>{
    if(FlexMode === "edit")return;
    if(typeof checkValue === "function"){
      if(!checkValue(value))return;
    }
    setIputValue(value);
    setV(replaceM(value));
  }

  let attr = {value:replaceM(value,false)};
  if(readOnly)attr["readOnly"]=readOnly;
  return <textarea className={className} {...attr} onChange={(e)=>{
    const {value} = e.target;
    _setValue(value !== "" ? value : defaultValue1);
  }} />;
}