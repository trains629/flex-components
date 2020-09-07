import React from 'react';
import classNames from "classnames";

export function getInvalidClass(invalidStr){
  return {"is-danger":invalidStr?true:false};
}

export function Description({children}){
  if(!children)return null;
  // 将字符串分解
  function parse(str){
    let reg = /\{\{\s+(.*?)\s+\}\}/g
    let count = 2;
    return str.split(reg).map((item,index,arr)=>{
      return index % count <= 0 ? item : 
        createElement(item,{key:`br${index}_${arr[index-1].length}`});
    })
  }
  
  let list = parse(children)
  return <p className={classNames("help")}>{list}</p>;
}

export function FormCaption(props){
  let {children,notNull,className="label"} = props;
  return <label className={className}>{children}
    {notNull?<span className="has-text-danger">*</span>:null}
  </label>;
}

export function FormGroup(props){
  let {children,className,description,caption,invalid,notNull,captionClass} = props;
  return (<div className={classNames("field",className)}>
    {caption ? <FormCaption notNull={notNull} className={captionClass}>
      {caption}</FormCaption>: null}
    <div className="control">{children}</div>
    {invalid ? <p className={classNames("help","is-danger")}>{invalid}</p>:null}
    <Description key="description">{description}</Description>
  </div>)
}
