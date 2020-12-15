import machineDetails from "views/dashboards/MachineDetails.js";
// import Home from "views/Home";
import { keys_dev } from "./config/keys_dev";

var routes = [
  // {
  //   path: "/home",
  //   name: "Home",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Home,
  //   layout: "/admin",
  // },

  {
    path: `/dashboard/${keys_dev.KOLSON}`,
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: machineDetails,
    layout: "/admin",
  },
];
export default routes;
