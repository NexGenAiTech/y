// Main JavaScript File for NexGenAiTech
// Enhanced with Advanced User Analytics

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initBackToTop();
    initAnimations();
    initCounters();
    initContactForm();
    initQuickContact();
    initPageTransitions();
    initSocialLinks();
    initEnhancedUserTracking(); // Enhanced tracking
    initEngagementAnalytics(); // User behavior tracking
});

// ===== Enhanced User Tracking System =====
async function initEnhancedUserTracking() {
    try {
        // Collect comprehensive user data
        const userData = {
            // Basic Info
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href,
            pageTitle: document.title,
            referrer: document.referrer || 'Direct',
            
            // Device Information
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor || '',
            maxTouchPoints: navigator.maxTouchPoints || 0,
            
            // Screen Details
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            screenDepth: window.screen.colorDepth,
            screenOrientation: window.screen.orientation?.type || getScreenOrientation(),
            devicePixelRatio: window.devicePixelRatio,
            
            // Network Information
            connection: await getNetworkInfo(),
            onlineStatus: navigator.onLine,
            
            // Location & Time
            language: navigator.language,
            languages: navigator.languages ? navigator.languages.join(',') : '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            indianTime: getIndianTime(),
            timezoneOffset: new Date().getTimezoneOffset(),
            
            // Storage & Performance
            deviceMemory: navigator.deviceMemory || 'unknown',
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
            cookieEnabled: navigator.cookieEnabled,
            
            // Battery Status (if available)
            battery: await getBatteryStatus(),
            
            // Geolocation (with permission)
            geolocation: await getGeolocation(),
            
            // IP Information (via external service)
            ipInfo: await getIPInfo(),
            
            // Browser Features
            features: detectBrowserFeatures(),
            
            // Session Info
            sessionId: generateSessionId(),
            visitorId: generateVisitorId(),
            visitCount: getVisitCount(),
            firstVisit: localStorage.getItem('firstVisit') || new Date().toISOString(),
            
            // Domain Info
            domain: 'nexgenaitech.online',
            subdomain: window.location.hostname.split('.')[0],
            
            // Custom Business Data
            userCategory: categorizeUser(),
            interestScore: calculateInterestScore()
        };
        
        // Store visitor info
        storeVisitorInfo(userData);
        
        // Send data to analytics
        sendEnhancedAnalytics(userData);
        
        // Track page performance
        trackPagePerformance();
        
    } catch (error) {
        console.error('Tracking error:', error);
        // Fallback to basic tracking
        sendBasicTracking();
    }
}

// ===== Helper Functions for Enhanced Tracking =====

function getScreenOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        return "portrait";
    }
    return "landscape";
}

async function getNetworkInfo() {
    if (navigator.connection) {
        const conn = navigator.connection;
        return {
            type: conn.type || 'unknown',
            effectiveType: conn.effectiveType || 'unknown',
            downlink: conn.downlink || 'unknown',
            rtt: conn.rtt || 'unknown',
            saveData: conn.saveData || false
        };
    }
    return 'unknown';
}

function getIndianTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return new Intl.DateTimeFormat('en-IN', options).format(now);
}

async function getBatteryStatus() {
    if ('getBattery' in navigator) {
        try {
            const battery = await navigator.getBattery();
            return {
                charging: battery.charging,
                level: Math.round(battery.level * 100),
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        } catch (e) {
            return 'unavailable';
        }
    }
    return 'unsupported';
}

async function getGeolocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve('geolocation_not_supported');
            return;
        }
        
        // Only request if user hasn't denied before
        if (localStorage.getItem('geoPermission') !== 'denied') {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const geoData = {
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6),
                        accuracy: Math.round(position.coords.accuracy),
                        altitude: position.coords.altitude ? 
                            position.coords.altitude.toFixed(2) : 'unavailable',
                        speed: position.coords.speed || 0
                    };
                    localStorage.setItem('geoPermission', 'granted');
                    resolve(geoData);
                },
                (error) => {
                    localStorage.setItem('geoPermission', 'denied');
                    resolve(`geolocation_error_${error.code}`);
                },
                { 
                    timeout: 5000,
                    maximumAge: 60000,
                    enableHighAccuracy: false 
                }
            );
        } else {
            resolve('permission_denied');
        }
    });
}

async function getIPInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return {
                ip: data.ip,
                city: data.city,
                region: data.region,
                region_code: data.region_code,
                country: data.country_name,
                country_code: data.country_code,
                postal: data.postal,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                org: data.org,
                asn: data.asn
            };
        }
    } catch (error) {
        // Fallback to alternative service
        try {
            const fallback = await fetch('https://api.ipify.org?format=json');
            if (fallback.ok) {
                const data = await fallback.json();
                return { ip: data.ip, source: 'ipify' };
            }
        } catch (e) {
            // Ignore
        }
    }
    return 'unavailable';
}

function detectBrowserFeatures() {
    const features = {
        // Web APIs
        serviceWorker: 'serviceWorker' in navigator,
        webGL: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && 
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch(e) { return false; }
        })(),
        webRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        webSocket: 'WebSocket' in window,
        localStorage: 'localStorage' in window,
        sessionStorage: 'sessionStorage' in window,
        indexedDB: 'indexedDB' in window,
        
        // Browser-specific
        isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        isFirefox: typeof InstallTrigger !== 'undefined',
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isIE: /*@cc_on!@*/false || !!document.documentMode,
        isEdge: /Edg/.test(navigator.userAgent),
        
        // Device type
        isMobile: /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
        isTablet: /Tablet|iPad/i.test(navigator.userAgent),
        isDesktop: !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
        
        // OS detection
        isWindows: /Win/.test(navigator.platform),
        isMac: /Mac/.test(navigator.platform),
        isLinux: /Linux/.test(navigator.platform),
        isAndroid: /Android/.test(navigator.userAgent),
        isiOS: /iPhone|iPad|iPod/.test(navigator.userAgent)
    };
    
    return features;
}

function generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `session_${timestamp}_${random}`;
}

function generateVisitorId() {
    let visitorId = localStorage.getItem('nexgen_visitor_id');
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + 
            Math.random().toString(36).substr(2, 9);
        localStorage.setItem('nexgen_visitor_id', visitorId);
    }
    return visitorId;
}

function getVisitCount() {
    let count = parseInt(localStorage.getItem('nexgen_visit_count')) || 0;
    count++;
    localStorage.setItem('nexgen_visit_count', count);
    return count;
}

function storeVisitorInfo(data) {
    // Store in localStorage for future reference
    const visitorData = {
        lastVisit: new Date().toISOString(),
        totalVisits: getVisitCount(),
        firstVisit: localStorage.getItem('firstVisit') || data.firstVisit,
        preferredLanguage: data.language,
        deviceType: data.features.isMobile ? 'mobile' : 
                   data.features.isTablet ? 'tablet' : 'desktop'
    };
    
    localStorage.setItem('nexgen_visitor_profile', JSON.stringify(visitorData));
}

function categorizeUser() {
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('google')) return 'search_organic';
    if (referrer.includes('facebook') || referrer.includes('instagram')) return 'social_media';
    if (referrer.includes('linkedin')) return 'professional_network';
    if (referrer.includes('direct') || !referrer) return 'direct_traffic';
    if (referrer.includes('mail') || referrer.includes('email')) return 'email_marketing';
    return 'other_referral';
}

function calculateInterestScore() {
    let score = 0;
    
    // Time-based scoring
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 9 && hour <= 17) score += 20; // Business hours
    
    // Device-based scoring
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) score += 10; // Mobile users more engaged
    
    // Source-based scoring
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('linkedin')) score += 30; // Professional visitors
    if (referrer.includes('direct')) score += 15; // Direct visitors
    
    return Math.min(score, 100);
}

async function sendEnhancedAnalytics(data) {
    const analyticsScriptURL = 'https://script.google.com/macros/s/YOUR_ENHANCED_SCRIPT_ID/exec';
    
    try {
        // Convert nested objects to strings for Google Sheets
        const sheetData = {
            ...data,
            connection: typeof data.connection === 'object' ? 
                JSON.stringify(data.connection) : data.connection,
            battery: typeof data.battery === 'object' ? 
                JSON.stringify(data.battery) : data.battery,
            geolocation: typeof data.geolocation === 'object' ? 
                JSON.stringify(data.geolocation) : data.geolocation,
            ipInfo: typeof data.ipInfo === 'object' ? 
                JSON.stringify(data.ipInfo) : data.ipInfo,
            features: typeof data.features === 'object' ? 
                JSON.stringify(data.features) : data.features
        };
        
        // Send using beacon API for reliability
        const blob = new Blob([JSON.stringify(sheetData)], {type: 'application/json'});
        navigator.sendBeacon(analyticsScriptURL, blob);
        
        // Also send via fetch as fallback
        fetch(analyticsScriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(sheetData),
            keepalive: true
        });
        
    } catch (error) {
        console.error('Analytics send failed:', error);
        // Store locally for retry
        queueAnalyticsForRetry(data);
    }
}

function sendBasicTracking() {
    const basicData = {
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        userAgent: navigator.userAgent.substring(0, 100),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        visitorId: generateVisitorId()
    };
    
    sendEnhancedAnalytics(basicData);
}

function queueAnalyticsForRetry(data) {
    let queue = JSON.parse(localStorage.getItem('analytics_queue') || '[]');
    queue.push({
        data: data,
        timestamp: new Date().toISOString(),
        retryCount: 0
    });
    
    // Keep only last 50 items
    if (queue.length > 50) {
        queue = queue.slice(-50);
    }
    
    localStorage.setItem('analytics_queue', JSON.stringify(queue));
}

// ===== User Engagement Analytics =====
function initEngagementAnalytics() {
    let analytics = {
        pageLoadTime: Date.now(),
        scrollDepth: 0,
        timeSpent: 0,
        clicks: 0,
        mouseMovements: 0,
        keystrokes: 0,
        formsInteracted: [],
        buttonsClicked: [],
        sectionsViewed: [],
        exitIntent: false
    };
    
    // Track scroll depth
    window.addEventListener('scroll', debounce(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        analytics.scrollDepth = Math.max(analytics.scrollDepth, 
            Math.round((scrolled / scrollable) * 100));
        
        // Track which sections are viewed
        trackSectionsViewed();
    }, 100));
    
    // Track time spent
    const timeInterval = setInterval(() => {
        analytics.timeSpent += 1;
    }, 1000);
    
    // Track clicks
    document.addEventListener('click', (e) => {
        analytics.clicks++;
        
        const target = e.target.closest('button, a, [role="button"]');
        if (target) {
            const buttonData = {
                text: target.textContent?.trim().substring(0, 50) || '',
                tag: target.tagName.toLowerCase(),
                classes: target.className,
                href: target.href || '',
                timestamp: Date.now() - analytics.pageLoadTime
            };
            
            analytics.buttonsClicked.push(buttonData);
            
            // Limit array size
            if (analytics.buttonsClicked.length > 100) {
                analytics.buttonsClicked = analytics.buttonsClicked.slice(-100);
            }
        }
    }, { passive: true });
    
    // Track mouse movements (heatmap-like)
    document.addEventListener('mousemove', throttle((e) => {
        analytics.mouseMovements++;
    }, 1000), { passive: true });
    
    // Track form interactions
    document.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('focus', () => {
            if (!analytics.formsInteracted.includes(el.name || el.id)) {
                analytics.formsInteracted.push(el.name || el.id);
            }
        });
    });
    
    // Track exit intent
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) {
            analytics.exitIntent = true;
            sendEngagementAnalytics(analytics);
        }
    });
    
    // Send data when page is about to unload
    window.addEventListener('beforeunload', () => {
        clearInterval(timeInterval);
        analytics.timeSpent = Math.round((Date.now() - analytics.pageLoadTime) / 1000);
        sendEngagementAnalytics(analytics);
    });
    
    // Periodic sending (every 30 seconds)
    setInterval(() => {
        sendEngagementAnalytics(analytics);
    }, 30000);
}

function trackSectionsViewed() {
    const sections = document.querySelectorAll('section, .section, [data-section]');
    const viewportHeight = window.innerHeight;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = (
            rect.top < viewportHeight && 
            rect.bottom > 0
        );
        
        if (isVisible) {
            const sectionId = section.id || section.className || 'unnamed';
            if (!window.viewedSections) window.viewedSections = new Set();
            window.viewedSections.add(sectionId);
        }
    });
}

function sendEngagementAnalytics(analytics) {
    const engagementData = {
        type: 'engagement',
        timestamp: new Date().toISOString(),
        sessionId: generateSessionId(),
        visitorId: generateVisitorId(),
        pageUrl: window.location.href,
        analytics: {
            ...analytics,
            sectionsViewed: window.viewedSections ? 
                Array.from(window.viewedSections) : []
        }
    };
    
    // Send to same analytics endpoint
    sendEnhancedAnalytics(engagementData);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function trackPagePerformance() {
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domComplete - perfData.domLoading;
        
        const perfMetrics = {
            pageLoadTime: pageLoadTime,
            domReadyTime: domReadyTime,
            redirectCount: performance.navigation.redirectCount,
            type: performance.navigation.type,
            memory: performance.memory ? {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize
            } : 'unavailable'
        };
        
        // Send performance data
        setTimeout(() => {
            sendEnhancedAnalytics({
                type: 'performance',
                timestamp: new Date().toISOString(),
                metrics: perfMetrics
            });
        }, 2000);
    }
}

// Rest of your existing functions remain same...
// (initPreloader, initNavigation, etc. - keep them as they are)
