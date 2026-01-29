/**
 * Web polyfills for React Native Web
 * This file must be imported first to set up polyfills before other modules load
 * 
 * IMPORTANT: This must run synchronously before any gesture-handler code executes
 */

// Function to patch UIManager
function patchUIManager(UIManager) {
  if (!UIManager) return;
  
  const originalGetViewManagerConfig = UIManager.getViewManagerConfig;
  
  UIManager.getViewManagerConfig = function(name) {
    // Handle gesture-handler root view - always return positions
    if (name === 'RNGestureHandlerRootView' || name === 'GestureHandlerRootView') {
      return {
        positions: {},
      };
    }
    
    // Try original method first
    if (originalGetViewManagerConfig) {
      try {
        const result = originalGetViewManagerConfig.call(this, name);
        if (result && typeof result === 'object') {
          // Ensure positions exists
          if (!result.positions) {
            result.positions = {};
          }
          return result;
        }
      } catch (e) {
        // Fall through to default
      }
    }
    
    // Fallback to getConstantsForViewManager
    if (UIManager.getConstantsForViewManager) {
      try {
        const constants = UIManager.getConstantsForViewManager(name);
        if (constants && typeof constants === 'object') {
          if (!constants.positions) {
            constants.positions = {};
          }
          return constants;
        }
      } catch (e) {
        // Fall through to default
      }
    }
    
    // Default fallback - always return an object with positions
    return { positions: {} };
  };
  
  // Ensure getConstantsForViewManager also handles gesture-handler
  if (!UIManager.getConstantsForViewManager) {
    UIManager.getConstantsForViewManager = function(name) {
      if (name === 'RNGestureHandlerRootView' || name === 'GestureHandlerRootView') {
        return { positions: {} };
      }
      return {};
    };
  } else {
    const originalGetConstants = UIManager.getConstantsForViewManager;
    UIManager.getConstantsForViewManager = function(name) {
      if (name === 'RNGestureHandlerRootView' || name === 'GestureHandlerRootView') {
        return { positions: {} };
      }
      try {
        const result = originalGetConstants.call(this, name);
        if (result && typeof result === 'object') {
          if (!result.positions) {
            result.positions = {};
          }
          return result;
        }
      } catch (e) {
        // Fall through
      }
      return {};
    };
  }
}

// Import react-native and patch UIManager
import { UIManager } from 'react-native';

// Patch UIManager when react-native is imported
if (typeof UIManager !== 'undefined') {
  patchUIManager(UIManager);
}

// Also use global patch function if available (from banner plugin)
if (typeof window !== 'undefined' && window.__patchUIManagerForGestureHandler) {
  patchUIManager(UIManager);
}

