import React,{createElement} from 'react';
import Input from "./Input";
import InputGroupList from "../InputGroupList"
import classNames from "classnames";
import Text from "./Text";
import {Dropdown} from "@trains629/flex-base";
import {useFlexContext} from "@trains629/flex-core";

function isEditMode(FlexMode){
  return FlexMode === "edit";
}

export function Description({children,small}){
  // 将字符串分解
  function parse(str){
    let reg = /\{\{\s+(.*?)\s+\}\}/g
    let count = 2;
    return str.split(reg).map((item,index,arr)=>{
      return index % count <= 0 ? item : 
        createElement(item,{key:`br${index}_${arr[index-1].length}`});
    })
  }
  if(!children)return null;
  let list = parse(children)
  return small ?<small className="form-text text-muted">{list}</small>:<>{list}</>;
}

export function FormCaption(props){
  let {children,notNull,className} = props;
  return <label className={className}>{children}
    {notNull?<span className="label-notnull">*</span>:null}
  </label>;
}

export function FormGroup(props){
  let {children,className,description,caption,invalid} = props;
  return (<div className={classNames("form-group",className)}>
    {caption ? <FormCaption>{caption}</FormCaption>: null}
    {children}
    {invalid ? <div className="invalid-feedback" key="invalid">{invalid}</div>:
      <Description key="description" small={true} >{description}</Description>}
  </div>)
}

function getInvalidClass(invalidStr){
  return invalidStr ? "is-invalid":"";
}

export function CheckBox(props){
  let {className,caption,description,type,notNull,invalidStr} = props;    
  return <FormGroup className="form-check" description={description} invalid={invalidStr}>
    <Input {...props} type="checkbox" 
    className={classNames("form-check-input",className,getInvalidClass(invalidStr))}/>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
  </FormGroup>;
}

export function TextBox(props){
  let {className,caption,description,type,notNull,invalidStr} = props;
  className = classNames("form-control",className,getInvalidClass(invalidStr));
  return <FormGroup description={description} invalid={invalidStr}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    <Text {...props} className={className} />
  </FormGroup>;
}

export function InputBox(props){
  let {className,caption,description,type,notNull,invalidStr} = props;
  className = classNames("form-control",className,getInvalidClass(invalidStr));
  return <FormGroup description={description} invalid={invalidStr}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    <Input {...props} className={className} />
  </FormGroup>;
}

function initListValue(value,list,setValue){
  let inited = value ? true : false;
  value = value ? value : list;
  if(!inited)setValue(value);
  return value;
}

function setElementValue(element,value){
  element["selected"] = value;
  if(typeof element["value"] === "boolean")
    element["value"] = element["selected"]; 
}

export function DropdownList(props){
  let {className,caption,description,type,notNull,invalidStr,options = {},
    value,setValue} = props;
  let {FlexMode} = useFlexContext();
  let {list = [],key = ""} = options["value"] || {}; 
  if(!isEditMode(FlexMode))
    value = initListValue(value,list,setValue);
  
  return <FormGroup description={description} invalid={invalidStr}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    <InputGroupList {...props} readOnly={true} type={options.type}
      className={classNames("form-control",className,getInvalidClass(invalidStr))}
      value={value || list} key={key}
      list={isEditMode(FlexMode)?list:list.map((item,i)=>{
        return {...item,
          onClick:()=>{
            if(type === "radio")
              for (let index = 0; index < value.length; index++)
                setElementValue(value[index],false);
            setElementValue(value[i],!value[i]["selected"]);
            if(typeof setValue === "function")setValue(value);
          }
        };
      })}
    />
  </FormGroup>;
}

export function InputList(props){
  let {caption,description,type,notNull,invalidStr,options = {},
    value,setValue} = props;
  let {FlexMode} = useFlexContext();
  let {list = [],key = ""} = options["value"] || {};  
  let keys = [key]; 
  if(!isEditMode(FlexMode)){
    value = initListValue(value,list,setValue);
    value.forEach((item) =>keys.push(item.value ? 1:0));
  }
  
  return <FormGroup description={description} key={value ? keys.join("") : key}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    {list.map((item,i)=>{
      let {caption,type,selected} = item;
      let args = {type,className:"form-check-input"};
      let divArgs = {};
      if(isEditMode(FlexMode)){
        args["readOnly"] = true;
        args["onChange"] = (e)=>{
          let {target} = e;
          target.checked = selected;
        }
      }else{
        divArgs["onClick"] = (e)=>{
          if(type === "radio"){
            for (let index = 0; index < value.length; index++) {
              const element = value[index];
              if(typeof element["value"] === "boolean")
                element["value"] = false;
            }
          }
          value[i]["value"] = !value[i]["value"];
          setValue(value);  
        };
        args["onChange"] = (e)=>{}
      }
      selected = !isEditMode(FlexMode) ? (type ==="radio" || type ==="checkbox" ? 
        value[i]["value"]:false) : selected;
      if(selected)args["checked"] = selected;
      return <div className="form-check" key={`${key}_${i}`} {...divArgs} >
        <input {...args} />
        <FormCaption className="form-check-label">{caption}</FormCaption>
        {invalidStr ? <div className="invalid-feedback" style={{display:"inline"}} 
          key="invalid">{invalidStr}</div>:null}
      </div>
    })}
  </FormGroup>;
}

export function RangeBox(props){
  let {className,caption,description,type,notNull,invalidStr} = props;
  return <FormGroup description={description} invalid={invalidStr}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    <Input {...props} type="range" className={classNames("form-control-range",
      className,getInvalidClass(invalidStr))} />
  </FormGroup>;
}

export function CheckGroup(props){
  let {caption,description,type,notNull,invalidStr,value,setValue} = props;
  let list = [];
  let {FlexMode} = useFlexContext();
  if(FlexMode && typeof FlexMode === "object"){
    let {info = {}} = FlexMode;
    list = info ? info["list"] || [] : list;
  }
    
  return <FormGroup description={description}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    {list.map((item,i)=>{
      let {caption,type,selected} = item;
      let args = {type,className:"form-check-input","onChange":(e)=>{}};
      if(!isEditMode(FlexMode))selected = value === item["value"];
      if(selected)args["checked"] = selected;
      return <div className="form-check" key={`${selected?"t":"f"}_${i}`} 
        onClick={(e)=>{setValue(item["value"] || "")}}>
        <input {...args} />
        <FormCaption className="form-check-label">{caption}</FormCaption>
        {invalidStr ? <div className="invalid-feedback" style={{display:"inline"}} 
          key="invalid">{invalidStr}</div>:null}
      </div>
    })}
  </FormGroup>;
}

export function SelectType(props) {
  let {componentValue = {},setValue} = props;
  let {FlexMode} = useFlexContext();  
  let list = [];
  let {type,name} = componentValue;
  let btnCaption = "";
  if(FlexMode && typeof FlexMode === "object"){
    let {info = {}} = FlexMode;
    (info ? (info["list"] || []) : list).forEach((item)=>{
      if(type === item["type"]){
        btnCaption = item["caption"];
      }else{
        list.push(item);
      }
    });
  }

  return <Dropdown.Dropdown className="dropdown float-right" style={{"marginBottom":4}}
    caption={btnCaption}>
    {list.map(({caption,type,onClick})=>{
      return {caption,
        onClick:()=>{
          setValue({...(typeof onClick === "function" ? onClick()||{}:{}),name},true);
        }
      }
    })}
  </Dropdown.Dropdown>;
}