import { isSceneId, type SceneId } from "./scene-registry";

const key = "midnight-tech-lab:stable-scene:v1";
const event = "midnight-studio-scene";
let memory: SceneId = "hub";
export function readStableScene(): SceneId {
  try { const value = sessionStorage.getItem(key); return isSceneId(value) ? value : "hub"; }
  catch { return memory; }
}
export function saveStableScene(id: SceneId) {
  memory = id;
  try { sessionStorage.setItem(key, id); } catch { /* Memory fallback; no coordinates or pending loads are stored. */ }
  window.dispatchEvent(new Event(event));
}
export function resetStableScene() {
  memory = "hub";
  try { sessionStorage.removeItem(key); } catch { /* Default hub remains available without storage. */ }
  window.dispatchEvent(new Event(event));
}
export function subscribeStableScene(listener: () => void) {
  window.addEventListener(event, listener);
  return () => window.removeEventListener(event, listener);
}
export const serverScene = (): SceneId => "hub";
