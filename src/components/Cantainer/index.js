import Panel from "./Panel";
import Tab from "./Tab";
import Table from "./Table";
import Grid from "./Grid";
import {CantainerComponent} from "../../utils";

const Cantainer = {
  Panel : CantainerComponent(Panel,"Panel"),
  Tab : CantainerComponent(Tab,"Tab"),
  Table : CantainerComponent(Table,"Table"),
  Grid : CantainerComponent(Grid,"Grid"),
}

export default Cantainer;