import { isCameraPresetId, type CameraPresetId } from "./interaction-config";

const storageKey = "midnight-tech-lab:stable-preset:v1";
const changeEvent = "midnight-studio-preset";
let memory: CameraPresetId = "overview";

export function readStablePreset(): CameraPresetId {
  try {
    const value = sessionStorage.getItem(storageKey);
    return isCameraPresetId(value) ? value : "overview";
  } catch { return memory; }
}
export function saveStablePreset(preset: CameraPresetId) {
  memory = preset;
  try { sessionStorage.setItem(storageKey, preset); } catch { /* Memory remains a safe fallback when storage is denied. */ }
  window.dispatchEvent(new Event(changeEvent));
}
export function subscribeStablePreset(listener: () => void) {
  window.addEventListener(changeEvent, listener);
  return () => window.removeEventListener(changeEvent, listener);
}
export const serverPreset = (): CameraPresetId => "overview";
