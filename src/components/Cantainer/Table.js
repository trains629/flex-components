import React from 'react';
import {useFlexContext} from "@trains629/flex-core";

export default function Table(props) {
  let {children} = props;
  let {SubCantainer} = useFlexContext();
  return (<table className="table">
    <tbody>
      {Array.isArray(children) ? children.map((item,index)=><SubCantainer
        key={`tr_${index}`} tagName="tr">{item}</SubCantainer>):null}
    </tbody>
  </table>);
}
