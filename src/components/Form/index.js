import React from 'react';
import * as Form from "./Form";
import {FormInputComponent} from "../../utils";
import * as FormKind from "./FormKind";

const String = FormInputComponent(Form.InputBox,"text");
const ID = <></>;
const Int = FormInputComponent(Form.InputBox,"number",FormKind.KIND_INT);
const Float = FormInputComponent(Form.InputBox,"number",FormKind.KIND_FLOAT);
const Boolean = FormInputComponent(Form.CheckBox,"checkbox");
const Date = FormInputComponent(Form.InputBox,"date");
const DateTime = FormInputComponent(Form.InputBox,"time");
const Text= FormInputComponent(Form.TextBox,"textarea");

export default {
    String,ID,Int,Float,Boolean,Date,DateTime,Text,
    RadioDropdown : FormInputComponent(Form.DropdownList,"boolean"),
    CheckDropdown : FormInputComponent(Form.DropdownList,"boolean"),
    RadioList : FormInputComponent(Form.InputList,"boolean"),
    CheckList : FormInputComponent(Form.InputList,"boolean"),
    CheckGroup:FormInputComponent(Form.CheckGroup),
    SelectType:FormInputComponent(Form.SelectType)
};
