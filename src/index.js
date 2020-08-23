import Form1 from "./components/Form/index";
import Cantainer1 from "./components/Cantainer/index";

export const Form = Form1;
export const Cantainer = Cantainer1;

export default function (ComponentStore) {
  ComponentStore.addComponent("Form",Form1);
  ComponentStore.addComponent("Cantainer",Cantainer1);
  ComponentStore.addComponent("Field",Form1);
}