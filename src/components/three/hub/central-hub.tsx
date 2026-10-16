import { Platform } from "./platform";
import { Workstation } from "./workstation";
import { DisplayZones } from "./display-zones";
import type { ThreeEvent } from "@react-three/fiber";
import { objectHotspot } from "../camera/camera-rig";
import { hotspots, type HotspotId } from "@/lib/scene/interaction-config";

export function CentralHub({ selected, onSelect }: { selected: HotspotId | null; onSelect: (id: HotspotId) => void }) {
  function select(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const id = objectHotspot(event.object);
    if (id) onSelect(id);
  }
  const bounds = selected ? hotspots[selected].bounds : null;
  return <group name="CentralHub" onClick={select}>
    <Platform />
    <group userData={{ hotspotId: "workstation" satisfies HotspotId }}><Workstation /></group>
    <DisplayZones />
    {bounds && <mesh position={bounds.center} userData={{ skipDiagnostics: true }} raycast={() => undefined}><boxGeometry args={bounds.size} /><meshBasicMaterial color="#fbbf24" wireframe /></mesh>}
  </group>;
}
