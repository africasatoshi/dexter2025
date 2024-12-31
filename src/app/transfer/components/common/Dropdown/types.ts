/**
 * Types for the dropdown component
 * Used for both asset and chain selection
 */

export interface DropdownOption<T = string> {
  value: T;
  label: string;
  description?: string;
  isPopular?: boolean;
  isRecent?: boolean;
  icon?: string;
  // For assets
  chains?: string[];
  // For chains
  isCompatible?: boolean;
  networkColor?: string;
}

export interface DropdownProps<T = string> {
  options: DropdownOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  // For chain dropdown
  parentAsset?: string;
  showCompatibleOnly?: boolean;
  // For styling
  variant?: 'asset' | 'chain';
} 