import { useEffect } from 'react';

// ============================================================================
// EXPERIMENT 2 (PART G): Custom Hook Implementation (useDocumentTitle)
// ----------------------------------------------------------------------------
// A Custom Hook is a JavaScript function whose name starts with "use" and 
// can call other React hooks (like useEffect).
// It allows us to extract and reuse component logic across the application.
// ============================================================================

export function useDocumentTitle(title) {
  // useEffect runs after the component renders.
  // The dependency array [title] means this effect re-runs only when 'title' changes.
  useEffect(() => {
    document.title = title;
  }, [title]);
}
