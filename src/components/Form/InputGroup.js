import React, { Component } from 'react';
import classNames from "classnames";

function InputGroupAppend(props) {
  let {className,children,onClick} = props;
  return <div className={classNames("input-group-append",className)}>
    <button className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
      onClick={onClick}
      type="button"><span className="sr-only">可选</span></button>
    <div className={classNames("dropdown-menu",className)}>
      {children}
    </div>
  </div>;
}

export default class InputGroup extends Component {
  state = {show:false};

  static defaultProps = {
    updateValue : ()=>{}
  }

  addEventListener(){
    document.addEventListener("click",this.hide);
  }

  removeEventListener(){
    document.removeEventListener("click",this.hide);
  }

  hide = (e)=>{
    this.setState({show:false});
    this.removeEventListener();
  };

  selectValue(value,type){
    this.props.updateValue(value,type);// 这个是上层组件的函数
    this.hide();
  }

  getList(list){
    return Array.isArray(list)? list.map((item,index)=>{
      if(typeof item === "string")item = {caption:item,value:item};
      let {value,caption,type,onClick,className} = item;
      return <a className={classNames("dropdown-item",className)} key={`a_${index}`}
        onClick={(e)=>{
          this.selectValue(value,type);
          if(typeof onClick === "function")
            onClick(value);
        }}>{caption}</a>;
    }):[];
  }

  render(){
    let {list,children,FlexMode} = this.props;
    let {show} = this.state;
    return (<div className="input-group">
      {children}
      <InputGroupAppend className={show ? "show" : ""}
        onClick={(e)=>{
          if(FlexMode === "edit")return;
          this.setState(state=>({show:!state.show}));
          this.addEventListener();
        }}>{this.getList(list)}</InputGroupAppend>
    </div>);
  }
}
