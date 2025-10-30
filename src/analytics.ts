// Lightweight GA4 helper for SPA page tracking
// Expects env var VITE_GA_MEASUREMENT_ID

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

let analyticsInitialized = false;

export function initAnalytics(measurementId: string | undefined): void {
	if (!measurementId) {
		// No GA configured; skip silently
		return;
	}
	if (analyticsInitialized) return;

	// Create dataLayer and gtag function
	window.dataLayer = window.dataLayer || [];
	window.gtag = function () {
		// eslint-disable-next-line prefer-rest-params
		(window.dataLayer as unknown[]).push(arguments);
	} as unknown as typeof window.gtag;

	// Inject the gtag script
	const gtagScript = document.createElement('script');
	gtagScript.async = true;
	gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
	document.head.appendChild(gtagScript);

	// Initialize
	const gtag = window.gtag as (...args: unknown[]) => void;
	gtag('js', new Date());
	gtag('config', measurementId, {
		// Let us control page_view manually for SPA
		send_page_view: false,
	});

	analyticsInitialized = true;
}

export function trackPageView(pagePath: string, pageTitle?: string): void {
	if (!window.gtag) return;
	const locationHref = `${window.location.origin}${pagePath.startsWith('/') ? '' : '/'}${pagePath}`;
	window.gtag('event', 'page_view', {
		page_title: pageTitle || document.title,
		page_location: locationHref,
		page_path: pagePath,
	});
}


