import React from 'react';
import {TabCard} from "@trains629/flex-base";
import {useFlexContext} from "@trains629/flex-core";

export default function Tab(props) {
  let {children,attribute,updateComponentValue} = props;
  let {SubCantainer} = useFlexContext();
  let {index=0} = attribute || {};
  // TODO 需要处理updateComponentValue，这个函数是用来更新当前组件的属性，现在需要处理这个问题。
  return <TabCard index={index} 
    onClick={(e,value)=>{updateComponentValue({key:"index",value});}}
    itemdata={(item,id)=><SubCantainer className="card-body flex-Sub-cantainer">
      {item}</SubCantainer>}>
    {children || []}
  </TabCard>;
}
