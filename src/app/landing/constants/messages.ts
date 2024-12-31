/**
 * messages.ts
 * Centralized storage for all landing page messages
 */

// View 1: Initial greeting
export const INTRO_SEQUENCE = [
  "Hi! I'm Dexter -\nyour Crypto Safety Companion."
];

// View 2: Waiting for interaction
export const SLEEP_MESSAGE = [
  "Turn me on..."
];

// View 3: Boot sequence
export const BOOT_SEQUENCE = [
  "Booting up...\nReady to..."
];

// View 4: Menu options
export const MENU_SEQUENCE = [
  "Scan Address.\nSend Test Transfer.\nRequest Test Refund."
];

// Timing constants (in milliseconds)
export const TIMING = {
  TYPING_SPEED: 70,
  MESSAGE_DELAY: 800,
  CURSOR_BLINK: 530,
  WAKE_ANIMATION: 2000,
} as const; 