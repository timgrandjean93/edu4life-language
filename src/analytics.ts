// Lightweight GA4 helper for SPA page tracking
// Expects env var VITE_GA_MEASUREMENT_ID
// Only initializes if user has consented to cookies

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

const CONSENT_STORAGE_KEY = 'cookie_consent';

function hasConsented(): boolean {
	const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
	return stored === 'accepted';
}

let analyticsInitialized = false;

export function initAnalytics(measurementId: string | undefined, forceInit: boolean = false): void {
	if (!measurementId) {
		// No GA configured; skip silently
		return;
	}
	
	// Only initialize if user has consented or if forced (for consent changes)
	if (!forceInit && !hasConsented()) {
		return;
	}
	
	if (analyticsInitialized && !forceInit) return;

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
		// GDPR-friendly settings
		anonymize_ip: true,
		allow_google_signals: false,
		allow_ad_personalization_signals: false,
	});

	analyticsInitialized = true;
}

export function revokeAnalytics(): void {
	// Remove all GA cookies
	if (typeof document !== 'undefined') {
		const cookies = document.cookie.split(';');
		cookies.forEach(cookie => {
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
			if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
			}
		});
	}
	// Clear dataLayer
	if (window.dataLayer) {
		window.dataLayer = [];
	}
	analyticsInitialized = false;
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


