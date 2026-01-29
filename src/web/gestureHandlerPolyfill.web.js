/**
 * Gesture Handler Polyfill - Injected at bundle start
 * Patches UIManager before gesture-handler can access it
 */

(function() {
  'use strict';
  
  function patchUIManager(UIManager) {
    if (!UIManager || UIManager._gestureHandlerPatched) {
      return;
    }
    
    UIManager._gestureHandlerPatched = true;
    
    const originalGetViewManagerConfig = UIManager.getViewManagerConfig;
    
    UIManager.getViewManagerConfig = function(name) {
      // Always return positions for gesture-handler views
      if (name === 'RNGestureHandlerRootView' || name === 'GestureHandlerRootView') {
        return { positions: {} };
      }
      
      // Try original method
      if (originalGetViewManagerConfig) {
        try {
          const result = originalGetViewManagerConfig.call(this, name);
          if (result && typeof result === 'object') {
            if (!result.positions) {
              result.positions = {};
            }
            return result;
          }
        } catch (e) {
          // Ignore
        }
      }
      
      // Default: always return object with positions
      return { positions: {} };
    };
    
    // Patch getConstantsForViewManager
    const originalGetConstants = UIManager.getConstantsForViewManager;
    UIManager.getConstantsForViewManager = function(name) {
      if (name === 'RNGestureHandlerRootView' || name === 'GestureHandlerRootView') {
        return { positions: {} };
      }
      if (originalGetConstants) {
        try {
          const result = originalGetConstants.call(this, name);
          return result && typeof result === 'object' ? result : {};
        } catch (e) {
          return {};
        }
      }
      return {};
    };
  }
  
  // Aggressively patch UIManager - try multiple methods
  function tryPatch() {
    // Method 1: Try require
    if (typeof require !== 'undefined') {
      try {
        const ReactNative = require('react-native');
        if (ReactNative && ReactNative.UIManager) {
          patchUIManager(ReactNative.UIManager);
          return true;
        }
      } catch (e) {
        // Not loaded yet
      }
    }
    
    // Method 2: Try webpack cache
    if (typeof __webpack_require__ !== 'undefined' && __webpack_require__.cache) {
      const cache = __webpack_require__.cache;
      for (const key in cache) {
        const mod = cache[key];
        if (mod && mod.exports) {
          if (mod.exports.UIManager) {
            patchUIManager(mod.exports.UIManager);
            return true;
          }
          // Also check default export
          if (mod.exports.default && mod.exports.default.UIManager) {
            patchUIManager(mod.exports.default.UIManager);
            return true;
          }
        }
      }
    }
    
    return false;
  }
  
  // Try to patch immediately
  if (!tryPatch()) {
    // If not patched, try again after a short delay
    if (typeof setTimeout !== 'undefined') {
      setTimeout(() => {
        tryPatch();
      }, 0);
    }
  }
  
  // Store patch function globally
  if (typeof window !== 'undefined') {
    window.__patchUIManagerForGestureHandler = patchUIManager;
    // Also try patching on next tick
    if (typeof setTimeout !== 'undefined') {
      setTimeout(() => {
        tryPatch();
      }, 10);
    }
  }
})();

