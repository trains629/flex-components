import React from 'react';
import classNames from "classnames";
import {Caption} from "@trains629/flex-base";
import {useFlexContext} from "@trains629/flex-core";

export default function Panel(props) {
  let{style,className,children,attribute} = props;
  let {SubCantainer} = useFlexContext();
  let {caption,row:columns} = attribute || {};
  return (<div className={classNames(className,"message")} style={style}>
    <Caption className="message-header">{caption}</Caption>
    <SubCantainer className={classNames("message-body","flex-Sub-cantainer",{columns})}>
      {children && children.length>0?children[0]:null}
    </SubCantainer>
  </div>);
}
