// Utility functions for responsive design
export const getBreakpoint = () => {
    if (typeof window === 'undefined') return 'sm';

    const width = window.innerWidth;
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
};

export const isMobile = () => {
    return window.innerWidth < 640;
};