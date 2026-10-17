import { Platform } from "./platform";
import { Workstation } from "./workstation";
import { DisplayZones } from "./display-zones";
import { HubResources } from "./primitives";
import type { ThreeEvent } from "@react-three/fiber";
import { objectHotspot } from "../camera/camera-rig";
import type { HotspotId } from "@/lib/scene/interaction-config";

export function CentralHub({ selected, onSelect }: { selected: HotspotId | null; onSelect: (id: HotspotId) => void }) {
  function select(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const id = objectHotspot(event.object);
    if (id) onSelect(id);
  }
  return <group name="CentralHub" onClick={select}>
    <HubResources>
      <Platform />
      <group userData={{ hotspotId: "workstation" satisfies HotspotId }}><Workstation selected={selected === "workstation"} /></group>
      <DisplayZones selected={selected} />
    </HubResources>
  </group>;
}
