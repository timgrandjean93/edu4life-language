import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing page routing with URL parameters
 * @param totalPages - Total number of pages (0-indexed, so totalPages = 4 means pages 0-4)
 * @returns [currentPage, setCurrentPage] - Current page state and setter
 */
export const usePageRouting = (totalPages: number): [number, React.Dispatch<React.SetStateAction<number>>] => {
  // Helper function to get page from URL
  const getPageFromURL = useCallback((): number => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (page >= 0 && page <= totalPages) {
        return page;
      }
    }
    return 0; // Default to page 0 (intro)
  }, [totalPages]);

  // Helper function to update URL without reloading
  const updateURL = (page: number) => {
    const expectedURL = page === 0 
      ? window.location.pathname 
      : `${window.location.pathname}?page=${page}`;
    const currentURL = window.location.pathname + window.location.search;
    
    // Only update if URL is different to avoid unnecessary history entries
    if (currentURL !== expectedURL) {
      window.history.pushState({ page }, '', expectedURL);
    }
  };

  const [currentPage, setCurrentPage] = useState(getPageFromURL());
  const pathnameRef = useRef(window.location.pathname);

  // Reset to page 0 when pathname changes (navigating to a new topic)
  useEffect(() => {
    const currentPathname = window.location.pathname;
    if (currentPathname !== pathnameRef.current) {
      pathnameRef.current = currentPathname;
      // Reset to page 0 (intro) when navigating to a new topic
      setCurrentPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }); // Run on every render to check for pathname changes

  // Initialize URL on mount if needed (only if URL doesn't match current page)
  useEffect(() => {
    const currentURLPage = getPageFromURL();
    if (currentPage !== currentURLPage) {
      updateURL(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromURL();
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // getPageFromURL is stable, no need to include

  // Update URL when currentPage changes (but not on initial mount)
  useEffect(() => {
    const currentURLPage = getPageFromURL();
    if (currentPage !== currentURLPage) {
      updateURL(currentPage);
    }
  }, [currentPage, totalPages, getPageFromURL]);

  return [currentPage, setCurrentPage];
};

