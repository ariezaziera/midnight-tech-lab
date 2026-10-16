# App Flow

## Main navigation
Home (Central Hub) ↔ Projects Library ↔ Case Study; Home ↔ Services ↔ Contact; Home ↔ About ↔ Contact. All destinations reachable via global nav independently of 3D.

## 3D journey
Entry → optional skippable Studio Awakens → Overview → select module/hotspot → bounded camera focus → preview overlay → full HTML route → Back to Studio (restore last meaningful camera preset if available).

## State model
`sceneStatus`: idle/loading/ready/error; `cameraPreset`: overview/workstation/navigation/cozy/selected-module; `selectedHotspot`: ID|null; `overlay`: none/creator/project/module; `motionPreference`: system/reduced; `qualityTier`: high/medium/low/2d.

## Failure states
- WebGL unavailable or model load error → static visual and full HTML navigation.
- Missing project media → designed placeholder with alt text.
- Navigation remains available during loading and after failure.
