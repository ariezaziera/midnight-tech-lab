import { Platform } from "./platform";
import { Workstation } from "./workstation";
import { DisplayZones } from "./display-zones";

export function CentralHub() {
  return <group name="CentralHub"><Platform /><Workstation /><DisplayZones /></group>;
}
