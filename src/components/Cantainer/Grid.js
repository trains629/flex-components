import React from 'react';
import classNames from "classnames";
import {useFlexContext} from "@trains629/flex-core";

export default function Grid(props) {
  let{attribute,children} = props;
  let {SubCantainer} = useFlexContext();
  let {className} = attribute;
  return <div className={classNames(className,"row","flex-component-grid","flex-grid-fixed")}>
    {Array.isArray(children)? children.map((item,index)=>{
      let {name,attribute,className} = item;
      let {flex = 0} = attribute || {};
      if(className === "col"){
        if(flex > 0 && flex <= 12) className = `${className}-${flex}`;
      }
      return <SubCantainer key={`${index}_${name}`} flex={flex}
        className={classNames(className,"flex-component-grid")}>
        {item}
      </SubCantainer>
      }):null}
  </div>;
}