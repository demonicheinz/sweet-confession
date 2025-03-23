// Audio utility for managing sounds in Sweet Confession app
// This handles browser autoplay policy by only playing sounds after user interaction

interface AudioItem {
  element: HTMLAudioElement;
  volume: number;
  isLoaded: boolean;
}

// Check if code is running in browser or server
const isBrowser = typeof window !== "undefined";

class AudioManager {
  private sounds: Record<string, AudioItem> = {};
  private isMuted = false;
  private hasUserInteracted = false;
  private globalVolume = 0.5; // 50% volume by default

  constructor() {
    // Only initialize Audio if running in browser
    if (isBrowser) {
      // Initialize sounds
      this.preloadSounds();

      // Listen for user interaction to enable audio
      const interactionEvents = ["click", "touchstart", "keydown"];

      const enableAudio = () => {
        this.hasUserInteracted = true;

        // Remove event listeners once user has interacted
        interactionEvents.forEach((event) => {
          document.removeEventListener(event, enableAudio);
        });
      };

      // Add event listeners for user interaction
      interactionEvents.forEach((event) => {
        document.addEventListener(event, enableAudio);
      });
    }
  }

  private preloadSounds(): void {
    // Don't do anything if running on server
    if (!isBrowser) return;

    // Define all sounds used in the application
    const soundFiles = {
      paperRustle: "/sounds/paper-rustle.mp3",
      signingPen: "/sounds/signing-pen.mp3",
      typing: "/sounds/soft-typing-sound.mp3",
      ambientMusic: "/sounds/ambient-piano-music.mp3",
    };

    // Preload each sound
    Object.entries(soundFiles).forEach(([key, path]) => {
      // Use Audio API only in browser
      const audio = new Audio();
      audio.src = path;
      audio.preload = "auto";
      audio.load();

      // Set default volume
      const defaultVolume =
        key === "ambientMusic" ? 0.7 : key === "typing" ? 0.3 : key === "signingPen" ? 0.7 : 0.5;

      this.sounds[key] = {
        element: audio,
        volume: defaultVolume,
        isLoaded: false,
      };

      // Handler function for canplaythrough event
      const handleCanPlayThrough = () => {
        if (this.sounds[key]) {
          this.sounds[key].isLoaded = true;
        }
        // Remove event listener after execution
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      };

      // Set isLoaded status when sound is loaded
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
    });
  }

  /**
   * Play a sound if user has interacted with the page
   * @param soundId The ID of the sound to play
   * @param options Optional playback options
   */
  play(soundId: string, options: { loop?: boolean; volume?: number } = {}): void {
    // Skip if not in browser
    if (!isBrowser) return;

    const sound = this.sounds[soundId];

    if (!sound || this.isMuted || !this.hasUserInteracted) {
      return;
    }

    try {
      // Check if audio is still loading
      if (sound.element.readyState < 2) {
        // HAVE_CURRENT_DATA (2) or higher needed
        // Wait until audio is ready to play
        const playWhenReady = () => {
          this.playSound(sound, soundId, options);
          sound.element.removeEventListener("canplaythrough", playWhenReady);
        };
        sound.element.addEventListener("canplaythrough", playWhenReady);
        return;
      }

      this.playSound(sound, soundId, options);
    } catch (error) {
      // Silent error handling
    }
  }

  /**
   * Internal method to actually play a sound
   * @private
   */
  private playSound(
    sound: AudioItem,
    soundId: string,
    options: { loop?: boolean; volume?: number } = {},
  ): void {
    // Skip if not in browser
    if (!isBrowser) return;

    // Reset audio to beginning if it's already playing
    const wasPlaying = !sound.element.paused;

    // If already playing, pause first to avoid AbortError
    if (wasPlaying) {
      sound.element.pause();
    }

    sound.element.currentTime = 0;

    // Apply volume
    const volume = options.volume !== undefined ? options.volume : sound.volume;
    sound.element.volume = volume * this.globalVolume;

    // Set loop option
    sound.element.loop = options.loop || false;

    // Add small delay before calling play() to prevent AbortError
    setTimeout(() => {
      // Play the sound
      const playPromise = sound.element.play();

      // Handle play promise (required for newer browsers)
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If error occurs, try to play again with longer timeout
          setTimeout(() => {
            sound.element.play().catch(() => {
              // Silent catch - no action needed
            });
          }, 100);
        });
      }
    }, 20);
  }

  /**
   * Stop a sound from playing
   * @param soundId The ID of the sound to stop
   */
  stop(soundId: string): void {
    // Skip if not in browser
    if (!isBrowser) return;

    const sound = this.sounds[soundId];

    if (!sound) {
      return;
    }

    try {
      // First check if audio is playing
      if (!sound.element.paused) {
        // Only pause if it's actually playing
        sound.element.pause();

        // After pausing, wait a bit before resetting currentTime
        setTimeout(() => {
          sound.element.currentTime = 0;
        }, 50);
      } else {
        // If already paused, directly reset currentTime
        sound.element.currentTime = 0;
      }
    } catch (error) {
      // Silent error handling
    }
  }

  /**
   * Fade in a sound gradually
   * @param soundId The ID of the sound to fade in
   * @param duration The duration of the fade in milliseconds
   * @param targetVolume The target volume (0-1)
   */
  fadeIn(soundId: string, duration = 1000, targetVolume?: number): void {
    // Skip if not in browser
    if (!isBrowser) return;

    const sound = this.sounds[soundId];

    if (!sound || this.isMuted || !this.hasUserInteracted) {
      return;
    }

    const finalVolume = targetVolume || sound.volume;
    sound.element.volume = 0;

    // Start playing
    this.play(soundId, { volume: 0 });

    // Gradually increase volume
    let startTime: number | null = null;
    const fadeStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      sound.element.volume = progress * finalVolume * this.globalVolume;

      if (progress < 1) {
        requestAnimationFrame(fadeStep);
      }
    };

    requestAnimationFrame(fadeStep);
  }

  /**
   * Fade out a sound gradually
   * @param soundId The ID of the sound to fade out
   * @param duration The duration of the fade in milliseconds
   */
  fadeOut(soundId: string, duration = 1000): void {
    // Skip if not in browser
    if (!isBrowser) return;

    const sound = this.sounds[soundId];

    if (!sound || !sound.element.paused) {
      const initialVolume = sound.element.volume;

      // Gradually decrease volume
      let startTime: number | null = null;
      const fadeStep = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        sound.element.volume = initialVolume * (1 - progress);

        if (progress < 1) {
          requestAnimationFrame(fadeStep);
        } else {
          this.stop(soundId);
        }
      };

      requestAnimationFrame(fadeStep);
    }
  }

  /**
   * Set the global volume for all sounds
   * @param volume Volume level from 0 to 1
   */
  setVolume(volume: number): void {
    // Skip if not in browser
    if (!isBrowser) return;

    this.globalVolume = Math.max(0, Math.min(1, volume));

    // Apply to all currently playing sounds
    Object.entries(this.sounds).forEach(([_, sound]) => {
      sound.element.volume = sound.volume * this.globalVolume;
    });
  }

  /**
   * Mute or unmute all sounds
   * @param mute Whether to mute (true) or unmute (false)
   */
  mute(mute: boolean): void {
    // Skip if not in browser
    if (!isBrowser) return;

    this.isMuted = mute;

    if (mute) {
      // Pause all sounds
      Object.entries(this.sounds).forEach(([_, sound]) => {
        if (!sound.element.paused) {
          sound.element.pause();
        }
      });
    }
  }

  /**
   * Check if a sound is currently playing
   * @param soundId The ID of the sound to check
   * @returns True if the sound is playing, false otherwise
   */
  isPlaying(soundId: string): boolean {
    // Return false if not in browser
    if (!isBrowser) return false;

    const sound = this.sounds[soundId];
    return sound ? !sound.element.paused : false;
  }
}

// Export singleton instance
const audioManager = new AudioManager();
export default audioManager;
