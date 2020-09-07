var __defineProperty = Object.defineProperty;
var __assign = Object.assign;
var __markAsModule = (target) => {
  return __defineProperty(target, "__esModule", {value: true});
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defineProperty(target, name, {get: all[name], enumerable: true});
};

// src/components/Form/InputGroup.js
import React, {Component} from "react";
import classNames from "classnames";
function InputGroupAppend(props) {
  let {className, children, onClick} = props;
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames("input-group-append", className)
  }, /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-outline-secondary dropdown-toggle dropdown-toggle-split",
    onClick,
    type: "button"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "可选")), /* @__PURE__ */ React.createElement("div", {
    className: classNames("dropdown-menu", className)
  }, children));
}
class InputGroup extends Component {
  constructor() {
    super(...arguments);
    this.state = {show: false};
    this.hide = (e) => {
      this.setState({show: false});
      this.removeEventListener();
    };
  }
  addEventListener() {
    document.addEventListener("click", this.hide);
  }
  removeEventListener() {
    document.removeEventListener("click", this.hide);
  }
  selectValue(value, type) {
    this.props.updateValue(value, type);
    this.hide();
  }
  getList(list) {
    return Array.isArray(list) ? list.map((item, index) => {
      if (typeof item === "string")
        item = {caption: item, value: item};
      let {value, caption, type, onClick, className} = item;
      return /* @__PURE__ */ React.createElement("a", {
        className: classNames("dropdown-item", className),
        key: `a_${index}`,
        onClick: (e) => {
          this.selectValue(value, type);
          if (typeof onClick === "function")
            onClick(value);
        }
      }, caption);
    }) : [];
  }
  render() {
    let {list, children, FlexMode} = this.props;
    let {show} = this.state;
    return /* @__PURE__ */ React.createElement("div", {
      className: "input-group"
    }, children, /* @__PURE__ */ React.createElement(InputGroupAppend, {
      className: show ? "show" : "",
      onClick: (e) => {
        if (FlexMode === "edit")
          return;
        this.setState((state) => ({show: !state.show}));
        this.addEventListener();
      }
    }, this.getList(list)));
  }
}
InputGroup.defaultProps = {
  updateValue: () => {
  }
};

// src/components/Form/Input.js
import React2, {useState} from "react";
import {useFlexContext} from "@trains629/flex-core";
function initInputValue(value, type, defaultValue, readOnly) {
  let dfv = typeof defaultValue !== "object" ? {value: defaultValue} : defaultValue;
  if (type === "number") {
    return typeof defaultValue !== "undefined" ? value || defaultValue : value || 0;
  }
  if (typeof defaultValue === "undefined") {
    return value || "";
  }
  if (!value && readOnly) {
    return dfv["value"] || "";
  }
  return typeof value !== "undefined" ? value : defaultValue;
}
function Input(props) {
  let {
    list,
    type,
    className,
    placeholder,
    checkValue,
    defaultValue,
    updateValue: upV,
    value: oldValue,
    children,
    setValue: setV
  } = props;
  let {FlexMode} = useFlexContext();
  let readOnly = false;
  const [value, setIputValue] = useState(() => {
    return initInputValue(oldValue, type, defaultValue, readOnly);
  });
  const _setValue = (value2) => {
    setIputValue(value2);
    setV(value2);
  };
  let attr = type === "checkbox" ? {checked: value} : {value: type === "text" ? value || "" : value};
  attr["className"] = className;
  attr["onChange"] = (e) => {
    const {target} = e;
    const value2 = target.type === "checkbox" ? target.checked : target.value;
    _setValue(value2);
  };
  if (readOnly)
    attr["readOnly"] = readOnly;
  let Input3 = type === "textarea" ? /* @__PURE__ */ React2.createElement("textarea", __assign({}, attr)) : /* @__PURE__ */ React2.createElement("input", __assign({
    type,
    placeholder
  }, attr));
  return list ? /* @__PURE__ */ React2.createElement(InputGroup, {
    list,
    updateValue: (value1, type2) => {
      _setValue(typeof upV === "function" ? upV(value, value1, type2) : value1);
    }
  }, Input3) : Input3;
}

// src/components/InputGroupList.js
import React3, {Component as Component2} from "react";
import classNames2 from "classnames";
function InputGroupAppend2(props) {
  let {className, children, onClick} = props;
  return /* @__PURE__ */ React3.createElement("div", {
    className: classNames2("input-group-append", className)
  }, /* @__PURE__ */ React3.createElement("button", {
    className: "btn btn-outline-secondary dropdown-toggle dropdown-toggle-split",
    onClick,
    type: "button"
  }, /* @__PURE__ */ React3.createElement("span", {
    className: "sr-only"
  }, "可选")), /* @__PURE__ */ React3.createElement("div", {
    className: classNames2("dropdown-menu", className)
  }, children));
}
class InputGroupList extends Component2 {
  constructor(props) {
    super(props);
    this.hide = (e) => {
      this.setState({show: false});
      this.removeEventListener();
    };
    this.onClick = () => {
      let {FlexMode} = this.props;
      if (FlexMode === "edit")
        return;
      this.setState((state) => ({show: !state.show}));
      this.addEventListener();
    };
    this.state = {show: false, value: props.value};
  }
  addEventListener() {
    document.addEventListener("click", this.hide);
  }
  removeEventListener() {
    document.removeEventListener("click", this.hide);
  }
  selectValue(value, item) {
    let {type} = item;
    if (item.hasOwnProperty("selected") && type === "checkbox")
      return;
    this.hide();
  }
  getList(list) {
    return Array.isArray(list) ? list.map((item, index) => {
      let {value, caption, selected, onClick, type} = item;
      let attr = {type, value, style: type !== "checkbox" ? {display: "none"} : {}};
      if (selected)
        attr["checked"] = selected;
      return /* @__PURE__ */ React3.createElement("a", {
        className: "dropdown-item",
        key: `a_${index}_${selected ? 1 : 0}`,
        onClick: (e) => {
          this.selectValue(value, type);
          if (typeof onClick === "function")
            onClick(value);
        }
      }, /* @__PURE__ */ React3.createElement("input", __assign(__assign({}, attr), {
        onChange: (e) => {
        }
      })), caption);
    }) : [];
  }
  render() {
    let {className, list, value} = this.props;
    let {show} = this.state;
    let keys = [];
    let valueStr = "";
    value.forEach((item) => {
      let {caption, selected, type} = item;
      keys.push(selected ? 1 : 0);
      if (!selected)
        return;
      if (type === "radio") {
        valueStr = caption;
      } else if (type === "checkbox") {
        valueStr = (valueStr ? valueStr + "," : "") + caption;
      }
    });
    return /* @__PURE__ */ React3.createElement("div", {
      className: "input-group"
    }, /* @__PURE__ */ React3.createElement("input", {
      className,
      value: valueStr,
      type: "text",
      readOnly: true,
      key: keys.join("")
    }), /* @__PURE__ */ React3.createElement(InputGroupAppend2, {
      className: show ? "show" : "",
      onClick: this.onClick
    }, this.getList(list)));
  }
}
InputGroupList.defaultProps = {
  updateValue: () => {
  }
};

// src/components/Form/Text.js
import React4, {useState as useState2} from "react";
import {useFlexContext as useFlexContext2} from "@trains629/flex-core";
function initInputValue2(value, type, defaultValue) {
  if (type === "number") {
    return typeof defaultValue !== "undefined" ? value || defaultValue : value || 0;
  }
  if (typeof defaultValue === "undefined") {
    return value || "";
  }
  return typeof value !== "undefined" ? value : defaultValue;
}
function getDefaultValue(defaultValue, FlexMode, children) {
  if (FlexMode === "edit" && typeof defaultValue === "object") {
    let {kind, value} = defaultValue;
    return kind === "value" ? value : "";
  }
  if (children && typeof children === "object") {
    let {attribute = {}} = children;
    return attribute.hasOwnProperty("defaultValue") ? attribute["defaultValue"] : void 0;
  }
  return defaultValue;
}
function infoObject(FlexMode) {
  return typeof FlexMode === "object" && FlexMode.type === "props" && typeof FlexMode.info === "object";
}
const _M_BR = "{{ br }}";
function replaceM(str = "", m = true) {
  return str;
  if (m)
    return str.replace(/\n/g, _M_BR);
  return str.replace(/\{\{\s+(.*?)\s+\}\}/g, (a1, a2) => {
    console.log(49, a1, a2);
    return "\n";
  });
}
function Text(props) {
  let {type, className, checkValue, defaultValue, value: oldValue, children, setV} = props;
  let {FlexMode} = useFlexContext2();
  let readOnly = false;
  if (infoObject(FlexMode)) {
    let {readOnly: ro} = FlexMode.info;
    if (ro)
      readOnly = true;
  }
  let defaultValue1 = getDefaultValue(defaultValue, FlexMode, children);
  const [value, setIputValue] = useState2(initInputValue2(oldValue, type, defaultValue1));
  const _setValue = (value2) => {
    if (FlexMode === "edit")
      return;
    if (typeof checkValue === "function") {
      if (!checkValue(value2))
        return;
    }
    setIputValue(value2);
    setV(replaceM(value2));
  };
  let attr = {value: replaceM(value, false)};
  if (readOnly)
    attr["readOnly"] = readOnly;
  return /* @__PURE__ */ React4.createElement("textarea", __assign(__assign({
    className
  }, attr), {
    onChange: (e) => {
      const {value: value2} = e.target;
      _setValue(value2 !== "" ? value2 : defaultValue1);
    }
  }));
}

// src/components/Form/FormGroup.js
import React5 from "react";
import classNames3 from "classnames";
function getInvalidClass(invalidStr) {
  return {"is-danger": invalidStr ? true : false};
}
function Description({children}) {
  if (!children)
    return null;
  function parse(str) {
    let reg = /\{\{\s+(.*?)\s+\}\}/g;
    let count = 2;
    return str.split(reg).map((item, index, arr) => {
      return index % count <= 0 ? item : createElement(item, {key: `br${index}_${arr[index - 1].length}`});
    });
  }
  let list = parse(children);
  return /* @__PURE__ */ React5.createElement("p", {
    className: classNames3("help")
  }, list);
}
function FormCaption(props) {
  let {children, notNull, className = "label"} = props;
  return /* @__PURE__ */ React5.createElement("label", {
    className
  }, children, notNull ? /* @__PURE__ */ React5.createElement("span", {
    className: "has-text-danger"
  }, "*") : null);
}
function FormGroup(props) {
  let {children, className, description, caption, invalid, notNull, captionClass} = props;
  return /* @__PURE__ */ React5.createElement("div", {
    className: classNames3("field", className)
  }, caption ? /* @__PURE__ */ React5.createElement(FormCaption, {
    notNull,
    className: captionClass
  }, caption) : null, /* @__PURE__ */ React5.createElement("div", {
    className: "control"
  }, children), invalid ? /* @__PURE__ */ React5.createElement("p", {
    className: classNames3("help", "is-danger")
  }, invalid) : null, /* @__PURE__ */ React5.createElement(Description, {
    key: "description"
  }, description));
}

// src/components/Form/Form.js
import React6, {useState as useState3} from "react";
import classNames4 from "classnames";
import {Dropdown} from "@trains629/flex-base";
import {useFlexContext as useFlexContext3} from "@trains629/flex-core";
function isEditMode(FlexMode) {
  return FlexMode === "edit";
}
function CheckBox(props) {
  let {caption, description, notNull, invalidStr} = props;
  return /* @__PURE__ */ React6.createElement(FormGroup, {
    description,
    invalid: invalidStr,
    notNull,
    captionClass: "checkbox",
    caption: /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement(Input, __assign(__assign({}, props), {
      type: "checkbox"
    })), caption)
  });
}
function SelectBox(props) {
  let {caption, description, notNull, invalidStr, options, value, setValue: setV} = props;
  const [state, setstate] = useState3(value);
  let list = Array.isArray(options) ? options : typeof options === "function" ? options() : null;
  return /* @__PURE__ */ React6.createElement(FormGroup, {
    description,
    invalid: invalidStr,
    notNull,
    caption
  }, /* @__PURE__ */ React6.createElement("div", {
    className: "select"
  }, /* @__PURE__ */ React6.createElement("select", {
    value: state,
    onChange: (e) => {
      let {value: value2} = e.target;
      setstate(value2);
      setV(value2);
    }
  }, list ? list.map(({caption: caption2, value: value2}, index) => /* @__PURE__ */ React6.createElement("option", {
    key: `${index}`,
    value: value2
  }, caption2)) : null)));
}
function TextBox(props) {
  let {className, caption, description, notNull, invalidStr} = props;
  className = classNames4(className, "textarea", getInvalidClass(invalidStr));
  return /* @__PURE__ */ React6.createElement(FormGroup, {
    description,
    invalid: invalidStr,
    notNull,
    caption
  }, /* @__PURE__ */ React6.createElement(Text, __assign(__assign({}, props), {
    className
  })));
}
function InputBox(props) {
  let {className, caption, description, notNull, invalidStr} = props;
  className = classNames4(className, "input", getInvalidClass(invalidStr));
  return /* @__PURE__ */ React6.createElement(FormGroup, {
    description,
    invalid: invalidStr,
    notNull,
    caption
  }, /* @__PURE__ */ React6.createElement(Input, __assign(__assign({}, props), {
    className
  })));
}
function initListValue(value, list, setValue) {
  let inited = value ? true : false;
  value = value ? value : list;
  if (!inited)
    setValue(value);
  return value;
}
function setElementValue(element, value) {
  element["selected"] = value;
  if (typeof element["value"] === "boolean")
    element["value"] = element["selected"];
}
function DropdownList(props) {
  let {
    className,
    caption,
    description,
    type,
    notNull,
    invalidStr,
    options = {},
    value,
    setValue
  } = props;
  let {FlexMode} = useFlexContext3();
  let {list = [], key = ""} = options["value"] || {};
  if (!isEditMode(FlexMode))
    value = initListValue(value, list, setValue);
  return /* @__PURE__ */ React6.createElement(FormGroup, {
    description,
    invalid: invalidStr,
    notNull,
    caption
  }, /* @__PURE__ */ React6.createElement(InputGroupList, __assign(__assign({}, props), {
    readOnly: true,
    type: options.type,
    className: classNames4(className, getInvalidClass(invalidStr)),
    value: value || list,
    key,
    list: isEditMode(FlexMode) ? list : list.map((item, i) => {
      return __assign(__assign({}, item), {
        onClick: () => {
          if (type === "radio")
            for (let index = 0; index < value.length; index++)
              setElementValue(value[index], false);
          setElementValue(value[i], !value[i]["selected"]);
          if (typeof setValue === "function")
            setValue(value);
        }
      });
    })
  })));
}
function InputList(props) {
  let {
    caption,
    description,
    type,
    notNull,
    invalidStr,
    options = {},
    value,
    setValue
  } = props;
  let {FlexMode} = useFlexContext3();
  let {list = [], key = ""} = options["value"] || {};
  let keys = [key];
  if (!isEditMode(FlexMode)) {
    value = initListValue(value, list, setValue);
    value.forEach((item) => keys.push(item.value ? 1 : 0));
  }
  return /* @__PURE__ */ React6.createElement(FormGroup, {
    description,
    key: value ? keys.join("") : key,
    notNull,
    caption
  }, list.map((item, i) => {
    let {caption: caption2, type: type2, selected} = item;
    let args = {type: type2, className: "form-check-input"};
    let divArgs = {};
    if (isEditMode(FlexMode)) {
      args["readOnly"] = true;
      args["onChange"] = (e) => {
        let {target} = e;
        target.checked = selected;
      };
    } else {
      divArgs["onClick"] = (e) => {
        if (type2 === "radio") {
          for (let index = 0; index < value.length; index++) {
            const element = value[index];
            if (typeof element["value"] === "boolean")
              element["value"] = false;
          }
        }
        value[i]["value"] = !value[i]["value"];
        setValue(value);
      };
      args["onChange"] = (e) => {
      };
    }
    selected = !isEditMode(FlexMode) ? type2 === "radio" || type2 === "checkbox" ? value[i]["value"] : false : selected;
    if (selected)
      args["checked"] = selected;
    return /* @__PURE__ */ React6.createElement("div", __assign({
      className: "form-check",
      key: `${key}_${i}`
    }, divArgs), /* @__PURE__ */ React6.createElement("input", __assign({}, args)), /* @__PURE__ */ React6.createElement(FormCaption, {
      className: "form-check-label"
    }, caption2), invalidStr ? /* @__PURE__ */ React6.createElement("div", {
      className: "invalid-feedback",
      style: {display: "inline"},
      key: "invalid"
    }, invalidStr) : null);
  }));
}
function CheckGroup(props) {
  let {caption, description, type, notNull, invalidStr, value, setValue} = props;
  let list = [];
  let {FlexMode} = useFlexContext3();
  if (FlexMode && typeof FlexMode === "object") {
    let {info = {}} = FlexMode;
    list = info ? info["list"] || [] : list;
  }
  return /* @__PURE__ */ React6.createElement(FormGroup, {
    description,
    invalid: invalidStr,
    notNull,
    caption
  }, list.map((item, i) => {
    let {caption: caption2, type: type2, selected} = item;
    let args = {type: type2, className: "form-check-input", onChange: (e) => {
    }};
    if (!isEditMode(FlexMode))
      selected = value === item["value"];
    if (selected)
      args["checked"] = selected;
    return /* @__PURE__ */ React6.createElement("div", {
      className: "form-check",
      key: `${selected ? "t" : "f"}_${i}`,
      onClick: (e) => {
        setValue(item["value"] || "");
      }
    }, /* @__PURE__ */ React6.createElement("input", __assign({}, args)), /* @__PURE__ */ React6.createElement(FormCaption, {
      className: "form-check-label"
    }, caption2), invalidStr ? /* @__PURE__ */ React6.createElement("div", {
      className: "invalid-feedback",
      style: {display: "inline"},
      key: "invalid"
    }, invalidStr) : null);
  }));
}
function SelectType(props) {
  let {componentValue = {}, setValue} = props;
  let {FlexMode} = useFlexContext3();
  let list = [];
  let {type, name} = componentValue;
  let btnCaption = "";
  if (FlexMode && typeof FlexMode === "object") {
    let {info = {}} = FlexMode;
    (info ? info["list"] || [] : list).forEach((item) => {
      if (type === item["type"]) {
        btnCaption = item["caption"];
      } else {
        list.push(item);
      }
    });
  }
  return /* @__PURE__ */ React6.createElement(Dropdown.Dropdown, {
    className: "dropdown float-right",
    style: {marginBottom: 4},
    caption: btnCaption
  }, list.map(({caption, type: type2, onClick}) => {
    return {
      caption,
      onClick: () => {
        setValue(__assign(__assign({}, typeof onClick === "function" ? onClick() || {} : {}), {name}), true);
      }
    };
  }));
}

// src/components/Form/FormKind.js
const KIND_INT = "int";
const KIND_FLOAT = "float";

// src/utils.js
import React7 from "react";
import {useFormInput} from "@trains629/flex-core";
function getAttribute(props) {
  let {children} = props;
  if (!children)
    return {};
  let {attribute} = children;
  return attribute || {};
}
function getValueByKind(value, kind) {
  if (kind === KIND_INT)
    return parseInt(value);
  if (kind === KIND_FLOAT)
    return parseFloat(value);
  return value;
}
function FormInputComponent(Input3, type, kind) {
  return function(props) {
    let [setValue, eAttr] = useFormInput(props, type);
    let {caption, description, notNull, options, defaultValue} = getAttribute(props);
    let attrs = __assign({caption, description, notNull, type, options, defaultValue}, eAttr);
    return /* @__PURE__ */ React7.createElement(Input3, __assign(__assign(__assign({}, props), attrs), {
      setValue: (value) => {
        if (typeof setValue === "function")
          setValue(getValueByKind(value, kind));
      }
    }));
  };
}
function CantainerComponent(Cantainer3, type) {
  return function(props) {
    let attribute = getAttribute(props);
    let {children} = props;
    return /* @__PURE__ */ React7.createElement(Cantainer3, __assign(__assign(__assign({}, props), {attribute, type}), children));
  };
}

// src/components/Form/index.js
import React8 from "react";
const String = FormInputComponent(InputBox, "text");
const ID = /* @__PURE__ */ React8.createElement(React8.Fragment, null);
const Int = FormInputComponent(InputBox, "number", KIND_INT);
const Float = FormInputComponent(InputBox, "number", KIND_FLOAT);
const Boolean = FormInputComponent(CheckBox, "checkbox");
const Date = FormInputComponent(InputBox, "date");
const DateTime = FormInputComponent(InputBox, "time");
const Text3 = FormInputComponent(TextBox, "textarea");
var Form_default = {
  String,
  ID,
  Int,
  Float,
  Boolean,
  Date,
  DateTime,
  Text: Text3,
  Select: FormInputComponent(SelectBox),
  RadioDropdown: FormInputComponent(DropdownList, "boolean"),
  CheckDropdown: FormInputComponent(DropdownList, "boolean"),
  RadioList: FormInputComponent(InputList, "boolean"),
  CheckList: FormInputComponent(InputList, "boolean"),
  CheckGroup: FormInputComponent(CheckGroup),
  SelectType: FormInputComponent(SelectType)
};

// src/components/Cantainer/Panel.js
import React9 from "react";
import classNames5 from "classnames";
import {Caption} from "@trains629/flex-base";
import {useFlexContext as useFlexContext4} from "@trains629/flex-core";
function Panel(props) {
  let {style, className, children, attribute} = props;
  let {SubCantainer} = useFlexContext4();
  let {caption, row: columns} = attribute || {};
  return /* @__PURE__ */ React9.createElement("div", {
    className: classNames5(className, "message"),
    style
  }, /* @__PURE__ */ React9.createElement(Caption, {
    className: "message-header"
  }, caption), /* @__PURE__ */ React9.createElement(SubCantainer, {
    className: classNames5("message-body", "flex-Sub-cantainer", {columns})
  }, children && children.length > 0 ? children[0] : null));
}

// src/components/Cantainer/Tab.js
import React10 from "react";
import {TabCard} from "@trains629/flex-base";
import {useFlexContext as useFlexContext5} from "@trains629/flex-core";
function Tab(props) {
  let {children, attribute, updateComponentValue} = props;
  let {SubCantainer} = useFlexContext5();
  let {index = 0} = attribute || {};
  return /* @__PURE__ */ React10.createElement(TabCard, {
    index,
    onClick: (e, value) => {
      updateComponentValue({key: "index", value});
    },
    itemdata: (item, id) => /* @__PURE__ */ React10.createElement(SubCantainer, {
      className: "card-body flex-Sub-cantainer"
    }, item)
  }, children || []);
}

// src/components/Cantainer/Table.js
import React11 from "react";
import {useFlexContext as useFlexContext6} from "@trains629/flex-core";
function Table(props) {
  let {children} = props;
  let {SubCantainer} = useFlexContext6();
  return /* @__PURE__ */ React11.createElement("table", {
    className: "table"
  }, /* @__PURE__ */ React11.createElement("tbody", null, Array.isArray(children) ? children.map((item, index) => /* @__PURE__ */ React11.createElement(SubCantainer, {
    key: `tr_${index}`,
    tagName: "tr"
  }, item)) : null));
}

// src/components/Cantainer/Grid.js
import React12 from "react";
import classNames6 from "classnames";
import {useFlexContext as useFlexContext7} from "@trains629/flex-core";
function Grid(props) {
  let {attribute, children} = props;
  let {SubCantainer} = useFlexContext7();
  let {className} = attribute;
  return /* @__PURE__ */ React12.createElement("div", {
    className: classNames6(className, "row", "flex-component-grid", "flex-grid-fixed")
  }, Array.isArray(children) ? children.map((item, index) => {
    let {name, attribute: attribute2, className: className2} = item;
    let {flex = 0} = attribute2 || {};
    if (className2 === "col") {
      if (flex > 0 && flex <= 12)
        className2 = `${className2}-${flex}`;
    }
    return /* @__PURE__ */ React12.createElement(SubCantainer, {
      key: `${index}_${name}`,
      flex,
      className: classNames6(className2, "flex-component-grid")
    }, item);
  }) : null);
}

// src/components/Cantainer/index.js
const Cantainer = {
  Panel: CantainerComponent(Panel, "Panel"),
  Tab: CantainerComponent(Tab, "Tab"),
  Table: CantainerComponent(Table, "Table"),
  Grid: CantainerComponent(Grid, "Grid")
};
var Cantainer_default = Cantainer;

// src/components/Button/index.js
const Button_exports = {};
__export(Button_exports, {
  Button: () => Button,
  Submit: () => Submit
});
import React13 from "react";
import {useFlexContext as useFlexContext8} from "@trains629/flex-core";
import classNames7 from "classnames";
function Button(props) {
  let {onClick} = props;
  let {caption, className: cl} = getAttribute(props);
  const className = classNames7(cl, "button");
  return /* @__PURE__ */ React13.createElement("button", {
    className,
    onClick
  }, caption);
}
function Submit(props) {
  let {onClick} = props;
  let {caption, className: cl} = getAttribute(props);
  const className = classNames7(cl, "button");
  let {onSubmit} = useFlexContext8();
  return /* @__PURE__ */ React13.createElement("button", {
    className,
    onClick: (e) => {
      onSubmit(e);
      if (typeof onClick === "function")
        onClick(e);
    }
  }, caption);
}

// src/index.js
function addComponent(ComponentStore) {
  ComponentStore.addComponent("Form", Form_default);
  ComponentStore.addComponent("Cantainer", Cantainer_default);
  ComponentStore.addComponent("Field", Form_default);
  ComponentStore.addComponent("Button", Button_exports);
}
export {
  Button_exports as Button,
  Cantainer_default as Cantainer,
  Form_default as Form,
  addComponent as default
};
