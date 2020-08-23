import React, { Component } from 'react';

export default function Button(props){
  let {caption,className="btn btn-primary",onClick} = props;
  return <Button className={className} onClick={(e)=>{onClick(e);}}>
    {caption}
  </Button>;
}