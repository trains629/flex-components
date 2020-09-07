import React,{createElement,useState} from 'react';
import Input from "./Input";
import InputGroupList from "../InputGroupList"
import classNames from "classnames";
import Text from "./Text";
import {Dropdown} from "@trains629/flex-base";
import {useFlexContext} from "@trains629/flex-core";

function isEditMode(FlexMode){
  return FlexMode === "edit";
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
  let {children,className,description,caption,invalid} = props;
  return (<div className={classNames("field",className)}>
    {caption ? <FormCaption>{caption}</FormCaption>: null}
    <div className="control">{children}</div>
    {invalid ? <p className={classNames("help","is-danger")} key={"invalid"}>{invalid}</p>:null}
    <Description key="description">{description}</Description>
  </div>)
}

function getInvalidClass(invalidStr){
  return {"is-danger":invalidStr?true:false};
}

export function CheckBox(props){
  let {className,caption,description,type,notNull,invalidStr} = props;    
  return <FormGroup description={description} invalid={invalidStr}>
    <FormCaption key={type} className={classNames("checkbox",getInvalidClass(invalidStr))} 
      notNull={notNull}>
      <Input {...props} type="checkbox" className={className} />
      {caption}
    </FormCaption>
  </FormGroup>;
}

// 为什么就没加这个组件呢？ options 是数组或者是函数返回列表
// 如果是字符串，应该执行已不函数去读取列表
export function SelectBox(props) {
  let {className,caption,description,type,notNull,invalidStr,options,
    value,setValue:setV} = props;
  className = classNames(className,"input",getInvalidClass(invalidStr));
  const [state, setstate] = useState(value);
  let list = Array.isArray(options)?options : (typeof options === "function"?
   options():null);
  return <FormGroup description={description} invalid={invalidStr}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    <div className="select">
      <select value={state} onChange={(e)=>{
        let {value} = e.target;
        setstate(value);
        setV(value);
      }}>
        { list ? list.map(({caption,value},index)=><option key={`${index}`} 
          value={value}>{caption}</option>):null }
      </select>
    </div>
  </FormGroup>;
}

export function TextBox(props){
  let {className,caption,description,type,notNull,invalidStr} = props;
  className = classNames(className,"textarea",getInvalidClass(invalidStr));
  return <FormGroup description={description} invalid={invalidStr}>
    <FormCaption key={type} notNull={notNull}>{caption}</FormCaption>
    <Text {...props} className={className} />
  </FormGroup>;
}

export function InputBox(props){
  let {className,caption,description,type,notNull,invalidStr} = props;
  className = classNames(className,"input",getInvalidClass(invalidStr));
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
      className={classNames(className,getInvalidClass(invalidStr))}
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
    <Input {...props} type="range" className={classNames(className,
      getInvalidClass(invalidStr))} />
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