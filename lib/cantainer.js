// src/views/Cantainer.js
const Table = {
  type: "Table",
  property: {
    rows: 2,
    cols: 2
  },
  children: [
    {
      type: "SubCantainer",
      tagName: "tr",
      children: [
        {
          type: "SubCantainer",
          tagName: "td",
          children: []
        },
        {
          type: "SubCantainer",
          tagName: "td",
          children: []
        }
      ]
    },
    {
      type: "SubCantainer",
      tagName: "tr",
      children: [
        {
          type: "SubCantainer",
          tagName: "td",
          children: []
        },
        {
          type: "SubCantainer",
          tagName: "td",
          children: []
        }
      ]
    }
  ]
};
const Tab = {
  type: "Tab",
  attribute: {
    height: "100%"
  },
  children: [
    {
      type: "SubCantainer",
      caption: "tab1",
      children: []
    },
    {
      type: "SubCantainer",
      caption: "tab2",
      children: []
    }
  ]
};
const SubCantainer = {
  type: "CantainerSubCantainer",
  tagName: "div",
  className: "col",
  children: []
};
const Panel = {
  type: "CantainerPanel",
  attribute: {
    caption: "Panel"
  },
  children: [
    {
      type: "SubCantainer",
      children: []
    }
  ]
};
const Grid = {
  type: "CantainerGrid",
  className: "row",
  attribute: {
    height: 100
  },
  children: [
    {
      type: "SubCantainer",
      className: "col",
      attribute: {
        flex: 0
      },
      children: []
    },
    {
      type: "SubCantainer",
      className: "col",
      attribute: {
        flex: 0
      },
      children: []
    },
    {
      type: "SubCantainer",
      className: "col",
      attribute: {
        flex: 0
      },
      children: []
    }
  ]
};
const SubTable = {
  type: "CantainerSubTable",
  attribute: {
    caption: "子表单"
  },
  children: [{
    type: "SubCantainer",
    children: []
  }]
};
const TableAction = {
  type: "CantainerTableAction",
  attribute: {
    caption: "关联数据",
    table: {
      fields: []
    },
    fields: [],
    filter: []
  }
};
const TableQuery = {
  type: "CantainerTableQuery",
  attribute: {
    caption: "关联查询",
    table: {
      fields: []
    },
    fields: [],
    filter: [],
    count: 1
  }
};
const Cantainer = {
  Table,
  Tab,
  Panel,
  Grid,
  SubCantainer,
  SubTable,
  TableAction,
  TableQuery
};
const list = {
  Panel: [
    {
      caption: "标题",
      type: "String",
      name: "caption",
      defaultValue: ""
    },
    {
      caption: "行显示",
      type: "Boolean",
      name: "row",
      defaultValue: false
    },
    {
      caption: "权重",
      type: "Int",
      name: "flex",
      defaultValue: 0
    }
  ],
  Tab: [{
    caption: "标题",
    type: "TabEdit",
    name: "caption",
    defaultValue: ""
  }],
  Grid: [
    {
      caption: "列数量",
      type: "GridCol"
    },
    {
      caption: "权重",
      type: "GridFlex"
    },
    {
      caption: "布局",
      type: "String",
      name: "layout",
      defaultValue: "Div",
      info: {
        readOnly: true,
        list: [
          {
            caption: "栅格布局",
            value: "Div"
          },
          {
            caption: "表格布局",
            value: "Table"
          }
        ]
      }
    }
  ],
  SubTable: [
    {
      caption: "标题",
      type: "String",
      name: "caption",
      defaultValue: ""
    },
    {
      caption: "描述信息",
      type: "Text",
      name: "description",
      defaultValue: ""
    },
    {
      caption: "字段",
      type: "SubTableFields"
    }
  ],
  TableAction: [
    {
      caption: "标题",
      type: "String",
      name: "caption",
      defaultValue: ""
    },
    {
      caption: "描述信息",
      type: "Text",
      name: "description",
      defaultValue: ""
    },
    {
      caption: "关联表",
      type: "FormSelect",
      name: "table",
      defaultValue: {}
    },
    {
      caption: "显示字段",
      type: "FormFields",
      name: "fields",
      defaultValue: []
    },
    {
      caption: "数据过滤",
      type: "FormFilter",
      name: "filter",
      defaultValue: []
    }
  ],
  TableQuery: [
    {
      caption: "标题",
      type: "String",
      name: "caption",
      defaultValue: ""
    },
    {
      caption: "描述信息",
      type: "Text",
      name: "description",
      defaultValue: ""
    },
    {
      caption: "关联表",
      type: "FormSelect",
      name: "table",
      defaultValue: {}
    },
    {
      caption: "显示字段",
      type: "FormFields",
      name: "fields",
      defaultValue: []
    },
    {
      caption: "数据过滤",
      type: "FormFilter",
      name: "filter",
      defaultValue: []
    },
    {
      caption: "显示数据条数",
      type: "CheckGroup",
      name: "count",
      info: {
        type: "radio",
        list: [
          {caption: "单条", value: 1, type: "radio", selected: false},
          {caption: "多条", value: 2, type: "radio", selected: false}
        ]
      },
      defaultValue: 1
    }
  ]
};
var Cantainer_default = {
  list: Cantainer,
  props: {
    list
  }
};
export {
  Cantainer_default as default
};
