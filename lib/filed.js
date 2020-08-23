// src/views/Filed.js
const inputProps = [
  {caption: "标题", type: "group"},
  {caption: "标题", type: "String", name: "caption", defaultValue: ""},
  {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
  {caption: "不为空", type: "Boolean", name: "notNull", defaultValue: false},
  {type: "split"},
  {caption: "数据唯一", type: "Boolean", name: "unique", defaultValue: false},
  {caption: "不可见", type: "Boolean", name: "hide", defaultValue: false},
  {caption: "不可编辑", type: "Boolean", name: "disabled", defaultValue: false},
  {
    caption: "选项",
    type: "InputOptions",
    name: "options",
    defaultValue: {kind: "sort", value: {list: []}}
  }
];
function selectStringType() {
  return {
    caption: "类型",
    type: "SelectType",
    name: ".type",
    info: {
      list: [
        {caption: "文本", type: "FieldString", onClick: () => {
          return {type: "FieldString", attribute: {caption: "文本"}};
        }},
        {caption: "下拉框", type: "FieldRadioDropdown", onClick: () => {
          return inputInitValue("下拉框", "RadioDropdown", "radio");
        }},
        {caption: "单选按钮组", type: "FieldRadioList", onClick: () => {
          return inputInitValue("单选按钮组", "RadioList", "radio");
        }}
      ]
    }
  };
}
const selectStringProps = [
  {caption: "标题", type: "group"},
  selectStringType(),
  {caption: "标题", type: "String", name: "caption", defaultValue: ""},
  {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
  {caption: "不为空", type: "Boolean", name: "notNull", defaultValue: false},
  {type: "split"},
  {caption: "数据唯一", type: "Boolean", name: "unique", defaultValue: false},
  {caption: "不可见", type: "Boolean", name: "hide", defaultValue: false},
  {caption: "不可编辑", type: "Boolean", name: "disabled", defaultValue: false},
  {
    caption: "选项",
    type: "InputOptions",
    name: "options",
    defaultValue: {kind: "sort", value: {list: []}}
  }
];
function initOptions(type = "radio") {
  const selected = false, value = false;
  return {kind: "sort", value: {
    type,
    list: [
      {caption: "选项A", value, type, selected},
      {caption: "选项B", value, type, selected},
      {caption: "选项C", value, type, selected}
    ]
  }};
}
function inputInitValue(caption, type, optionType = "radio") {
  return {
    type: `Field${type}`,
    attribute: {
      caption,
      options: initOptions(optionType)
    }
  };
}
const BASE_PROPS = [
  {caption: "不为空", type: "Boolean", name: "notNull", defaultValue: false},
  {type: "split"},
  {caption: "数据唯一", type: "Boolean", name: "unique", defaultValue: false},
  {caption: "不可见", type: "Boolean", name: "hide", defaultValue: false},
  {caption: "不可编辑", type: "Boolean", name: "disabled", defaultValue: false}
];
const list = {
  String: [
    {caption: "标题", type: "group"},
    selectStringType(),
    {caption: "标题", type: "String", name: "caption", defaultValue: ""},
    {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
    {caption: "默认值", type: "DefaultValue", name: "defaultValue", defaultValue: {}},
    ...BASE_PROPS
  ],
  Text: [
    {caption: "标题", type: "group"},
    {caption: "标题", type: "String", name: "caption", defaultValue: ""},
    {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
    {caption: "行数", type: "Int", name: "rows"},
    ...BASE_PROPS
  ],
  Float: [
    {caption: "标题", type: "String", name: "caption", defaultValue: ""},
    {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
    {caption: "默认值", type: "DefaultValue", name: "defaultValue", defaultValue: {}},
    ...BASE_PROPS,
    {caption: "位数", type: "Int", name: "modeEdit", defaultValue: 0}
  ],
  Date: [
    {caption: "标题", type: "String", name: "caption", defaultValue: ""},
    {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
    {
      caption: "默认值",
      type: "String",
      name: "defaultValue",
      info: {
        readOnly: true,
        list: [
          {caption: "无", value: ""},
          {caption: "当前日期", value: "now"}
        ]
      }
    },
    ...BASE_PROPS
  ],
  DateTime: [
    {caption: "标题", type: "String", name: "caption", defaultValue: ""},
    {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
    {
      caption: "默认值",
      type: "String",
      name: "defaultValue",
      info: {
        readOnly: true,
        list: [
          {caption: "无", value: ""},
          {caption: "当前时间", value: "now"}
        ]
      }
    },
    ...BASE_PROPS
  ],
  RadioDropdown: selectStringProps,
  CheckDropdown: inputProps,
  RadioList: selectStringProps,
  CheckList: inputProps
};
const Field = {
  String: {type: "FieldString", attribute: {caption: "文本"}},
  Text: {type: "FieldText", attribute: {caption: "多行文本"}},
  Float: {type: "FieldFloat", attribute: {caption: "数字"}},
  Boolean: {type: "FieldBoolean", attribute: {caption: "单选"}},
  Date: {type: "FieldDate", attribute: {caption: "日期"}},
  DateTime: {type: "FieldDateTime", attribute: {caption: "时间"}},
  RadioDropdown: inputInitValue("下拉框", "RadioDropdown", "radio"),
  CheckDropdown: inputInitValue("下拉复选框", "CheckDropdown", "radio"),
  RadioList: inputInitValue("单选按钮组", "RadioList", "radio"),
  CheckList: inputInitValue("复选框组", "CheckList", "checkbox")
};
const defaultValue = [
  {caption: "标题", type: "group"},
  {caption: "标题", type: "String", name: "caption", defaultValue: ""},
  {caption: "描述信息", type: "Text", name: "description", defaultValue: ""},
  {caption: "不为空", type: "Boolean", name: "notNull", defaultValue: false},
  {type: "split"},
  {caption: "数据唯一", type: "Boolean", name: "unique", defaultValue: false},
  {caption: "不可见", type: "Boolean", name: "hide", defaultValue: false},
  {caption: "不可编辑", type: "Boolean", name: "disabled", defaultValue: false}
];
var Filed_default = {props: {list, defaultValue}, list: Field};
export {
  Filed_default as default
};
