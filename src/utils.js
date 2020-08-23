import React from 'react';
import * as FormKind from "./components/Form/FormKind";
import {useFormInput} from "@trains629/flex-core";

function getAttribute(props){
  let {children} = props;
  if(!children)return {};
  let {attribute} = children;
  return attribute || {};
}

function getValueByKind(value,kind){
  if(kind === FormKind.KIND_INT)return parseInt(value);
  if(kind === FormKind.KIND_FLOAT)return parseFloat(value);
  return value;
}

export function FormInputComponent(Input,type,kind){
  return function(props){
    let [setValue,eAttr] = useFormInput(props,type);
    let {caption,description,notNull,options,defaultValue} = getAttribute(props);
    let attrs = {caption,description,notNull,type,options,defaultValue,...eAttr};
    return <Input {...props} {...attrs} setValue={(value)=>{
      if(typeof setValue === "function")
        setValue(getValueByKind(value,kind));
      }}
    />;
  }
}

export function CantainerComponent(Cantainer,type){
  return function(props){
    let attribute = getAttribute(props);
    let {children} = props;
    return <Cantainer {...props} {...{attribute,type}} {...children}/>;
  }
}
