import Form from "./components/Form/index";
import Cantainer from "./components/Cantainer/index";
import * as Button from "./components/Button/index";

function addComponent(ComponentStore) {
  ComponentStore.addComponent("Form",Form);
  ComponentStore.addComponent("Cantainer",Cantainer);
  ComponentStore.addComponent("Field",Form);
  ComponentStore.addComponent("Button",Button);
}

export {
  Form,Cantainer,Button, addComponent as default
}