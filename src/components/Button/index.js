import React from 'react';
import {useFlexContext} from "@trains629/flex-core";
import {getAttribute} from "../../utils";
import classNames from "classnames";

export function Button(props){
  let {onClick} = props;
  let {caption,className:cl} = getAttribute(props);
  const className = classNames(cl,"button");
  return <button className={className} onClick={onClick}>
    {caption}
  </button>;
}

export function Submit(props) {
  let {onClick} = props;
  let {caption,className:cl} = getAttribute(props);
  const className = classNames(cl,"button");
  let {onSubmit} = useFlexContext();
  return <button className={className} onClick={(e)=>{
    onSubmit(e);
    if(typeof onClick === "function")onClick(e);
  }}>{caption}</button>
}


