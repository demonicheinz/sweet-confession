# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

### Changed

### Fixed


## [1.0.0] - 2025-03-24

### Added
- Interactive envelope with attractive opening animations
- Letter with automatic typing effect
- "Dancing Script" font for content and signature
- Reply button integrated with WhatsApp
- Heart effect with SVG shape and animations
- Message personalization through {recipient} and {sender} placeholders
- Pause effects on punctuation for natural typing experience
- Smooth transitions between components
- Audio features for immersive experience:
  - Paper rustle sound effect when opening the envelope
  - Typing sound effect during letter content animation
  - Pen signing sound effect for signature
  - Calm piano background music
  - Easy-to-access sound control buttons (mute/unmute)

### Changed
- English language implementation for code and UI
- Enhanced envelope visuals with 3D effects and modern gradients
- Letter text alignment from center to left for a more natural feel
- More natural animation sequence (content → signature → reply button)
- Letter appearance with elegant borders and styling
- Mobile-first design optimization with adjusted fonts, padding, and spacing
- Improved reply button UX with WhatsApp icon and responsive design
- Consistent audio volume (0.7) for balanced sound experience

### Fixed
- Removed duplicate font definitions by eliminating @font-face rules in globals.css
- Simplified font usage across components by using Next.js font system consistently
- Removed hardcoded fontFamily styles from components
- Removed duplicate font files from public/fonts directory
- Color compatibility by replacing OKLCH format with RGB
- Component placement for consistency across different screen sizes
- Typing animation issues with character queue system
- Error handling and memory leaks with timer cleanup
- Font display issues with inline styling
- Browser audio issues:
  - AbortError during sound playback in various browsers
  - Audio playback in server-side rendering (SSR) environment
  - Duplicate event listeners causing memory leaks
- Sound control button positioning for better mobile experience
- Browser autoplay policy compatibility issues

### Performance
- Optimization with useCallback and useMemo
- Efficient timer management using useRef
- Reduced re-renders with value memoization
- Reduced delay time between animations
- Smoother sequencing system
- Lazy loading of audio for initial performance optimization

---

*Sweet Confession App © 2025*