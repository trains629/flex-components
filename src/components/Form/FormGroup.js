import React from 'react';
import classNames from "classnames";

/**
 * 现在的输入框一般有两种模式，左右分栏，上下分栏
 */

// 行列模式

function FormGroupRow(props){
  let {caption,children,className} = props;
  return (<div className={classNames("form-group","row",className)}>
    <label className="col-sm-2 col-form-label">{caption}</label>
    <div className="col-sm-10">{children}</div>
  </div>);
}

// 上下模式

function FormGroupUp(props){
  let {caption,children,className} = props;
  return (<div class={classNames("form-group",className)}>
    <label>{caption}</label>
    {children}
  </div>)
}

export default function FormGroup(props){
  let {children,kind} = props;
  let Group = kind ==="row" ? FormGroupRow :FormGroupUp;
  return <Group {...props}>{children}</Group>;
}
