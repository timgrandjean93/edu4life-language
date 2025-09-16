# Components Folder

This folder contains clickable component images for the wetlands education game.

## Required Files

### Floodplain.png
- **Purpose**: Clickable button for "Floodplains living environment"
- **Design**: 
  - White circle at the top (anchor point)
  - Dashed line connecting to main content
  - Rounded rectangle with image and text
- **Usage**: Positioned on the river using the white circle as anchor point

## File Structure
```
public/assets/components/
├── README.md
└── Floodplain.png (to be added)
```

## Usage in Code
The components are referenced in `src/data/clickableComponents.ts` and rendered by `src/components/ClickableButton.tsx`.
