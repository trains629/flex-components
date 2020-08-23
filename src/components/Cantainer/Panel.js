import React from 'react';
import classNames from "classnames";
import {Caption} from "@trains629/flex-base";
import {useFlexContext} from "@trains629/flex-core";

export default function Panel(props) {
  let{style,className,children,attribute} = props;
  let {SubCantainer} = useFlexContext();
  let {caption,row} = attribute || {};
  return (<div className={classNames("card",className)} style={style}>
    <Caption className="card-header">{caption}</Caption>
    <SubCantainer className={classNames("card-body","flex-Sub-cantainer",{row})}>
      {children && children.length>0?Object.assign(children[0],{root:true}):null}
    </SubCantainer>
  </div>);
}
