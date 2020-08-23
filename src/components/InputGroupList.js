import React, { Component} from 'react';
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

export default class InputGroupList extends Component {

  static defaultProps = {
    updateValue : ()=>{}
  }

  constructor(props){
    super(props);
    this.state = {show:false,value:props.value};
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

  selectValue(value,item){
    let {type} = item;
    if(item.hasOwnProperty("selected") && type === "checkbox")return;
    this.hide();
  }

  getList(list){
    return Array.isArray(list)? list.map((item,index)=>{
      let {value,caption,selected,onClick,type} = item;
      let attr = {type,value,style :type !== "checkbox" ?{"display":"none"}:{}};
      if(selected)attr["checked"] = selected;
      return <a className="dropdown-item" key={`a_${index}_${selected ? 1:0}`}
        onClick={(e)=>{
          this.selectValue(value,type);
          if(typeof onClick === "function")onClick(value);
        }}><input {...attr} onChange={(e)=>{}} />{caption}</a>;
    }):[];
  }

  onClick = ()=> {
    let {FlexMode} = this.props;
    if(FlexMode === "edit")return;
    this.setState(state=>({show:!state.show}));
    this.addEventListener();
  };

  render(){
    let {className,list,value} = this.props;
    let {show} = this.state;
    let keys = [];
    let valueStr = "";
    value.forEach((item)=>{
      let {caption,selected,type} = item;
      keys.push(selected ? 1:0);
      if(!selected)return;
      if(type === "radio"){
        valueStr = caption;
      }else if (type === "checkbox") {
        valueStr = (valueStr ? valueStr + ",":"") + caption;
      }
    });

    return (<div className="input-group">
      <input className={className} value={valueStr} type={"text"} readOnly={true} 
        key={keys.join("")}/>
      <InputGroupAppend className={show ? "show" : ""} onClick={this.onClick}>
        {this.getList(list)}
      </InputGroupAppend>
    </div>);
  }
}
