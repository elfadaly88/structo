
## Geographic Data Integrity Rule
Ensure that \latitude\ and \longitude\ are managed as high-precision decimals across the full stack. When updating user profile datasets, the system must retain previously verified map parameters and never wipe geographic metadata or manual address buffers unless explicitly modified via draggable map actions.

## Strict UI Responsiveness Rule
Every layout component must be checked against standard mobile viewports (320px - 480px). Absolutely ban hardcoded pixel widths on outer wrappers. All interactive modals must enforce: max-height: 92vh, flex-col layout, and internal independent scroll boxes (`overflow-y-auto min-h-0`) to prevent modal clipping and device-level screen fragmentation.
