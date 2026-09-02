/* ══════════════════════════════════════════════
   SESSION-MANAGER.JS — Absolute Session Timeout System
   ══════════════════════════════════════════════ */
'use strict';

class SessionManager {
    constructor() {
        this.SESSION_KEY = 'sessionData';
        this.USER_CODE_KEY = 'usercode';
        // This should point to your NAVBAR INFO SCRIPT (with getSetting and getProfileContext)
        this.GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwxb3qFF-Zg-cU2fPWrIsYL_VPrfZj-pQ_4iodtffBfkw8u52qEWpX1CMP9H_l_mn7Ahw/exec";
        this.SESSION_DURATION_HOURS = 12;
        this.SESSION_DURATION_MS = 12 * 60 * 60 * 1000;
        this.isInitialized = false;
        this.sessionCheckInterval = null;
        this.isLoginPage = false;
        this.redirectInProgress = false;

        // TEST MODE: Set to true for 5-minute testing, false for production
        this.TEST_MODE = false;
        this.TEST_DURATION_MINUTES = 5;
    }

    async fetchSessionDuration() {
        try {
            const url = `${this.GAS_WEB_APP_URL}?action=getSetting&category=General&key=SESSION_DURATION`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.success && data.settingValue) {
                const hours = parseInt(data.settingValue);
                if (!isNaN(hours) && hours > 0) {
                    this.SESSION_DURATION_HOURS = hours;
                    this.SESSION_DURATION_MS = hours * 60 * 60 * 1000;
                    console.log(`Session duration set to ${hours} hours`);
                    return hours;
                }
            }
            console.log('Using default session duration: 12 hours');
            return this.SESSION_DURATION_HOURS;
        } catch (error) {
            console.error('Error fetching session duration:', error);
            return this.SESSION_DURATION_HOURS;
        }
    }

    getSessionData() {
        try {
            const sessionData = localStorage.getItem(this.SESSION_KEY);
            if (!sessionData) return null;
            return JSON.parse(sessionData);
        } catch (error) {
            console.error('Error parsing session data:', error);
            return null;
        }
    }

    createSession(userCode, username) {
        let expiresAt;
        
        // TEST MODE: Use 5 minutes
        if (this.TEST_MODE) {
            expiresAt = Date.now() + (this.TEST_DURATION_MINUTES * 60 * 1000);
            console.log(`⚠️ TEST MODE: Session will expire in ${this.TEST_DURATION_MINUTES} minutes`);
        } else {
            // Use the session duration from sheet
            expiresAt = Date.now() + this.SESSION_DURATION_MS;
        }
        
        const sessionData = {
            userCode: userCode,
            username: username,
            loginTime: Date.now(),
            expiresAt: expiresAt,
            sessionId: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        };
        
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
        localStorage.setItem(this.USER_CODE_KEY, userCode);
        // Store username in session-specific key, NOT the main 'username' key
        localStorage.setItem('session_username', username);
        console.log('Session created, expires at:', new Date(sessionData.expiresAt));
        if (this.TEST_MODE) {
            console.log(`⚠️ TEST MODE: ${this.TEST_DURATION_MINUTES} minute expiry`);
        } else {
            console.log('Session duration:', this.SESSION_DURATION_HOURS, 'hours');
        }
        return sessionData;
    }

    validateSession() {
        const sessionData = this.getSessionData();
        
        if (!sessionData) {
            console.log('No session data found');
            return { valid: false, reason: 'no_session' };
        }

        const now = Date.now();
        
        // Check if session is expired
        if (now > sessionData.expiresAt) {
            console.log('Session expired at:', new Date(sessionData.expiresAt));
            console.log('Current time:', new Date(now));
            console.log('Session duration was:', this.SESSION_DURATION_HOURS, 'hours');
            this.clearSession();
            return { valid: false, reason: 'expired' };
        }

        // Verify user code exists
        const userCode = localStorage.getItem(this.USER_CODE_KEY);
        if (!userCode || userCode !== sessionData.userCode) {
            console.log('User code mismatch or missing');
            this.clearSession();
            return { valid: false, reason: 'invalid_user' };
        }

        // Session is valid
        const timeRemaining = sessionData.expiresAt - now;
        const hoursRemaining = timeRemaining / (60 * 60 * 1000);
        console.log(`Session valid. ${hoursRemaining.toFixed(2)} hours remaining`);
        console.log('Expires at:', new Date(sessionData.expiresAt));
        
        return { 
            valid: true, 
            sessionData: sessionData,
            timeRemaining: timeRemaining,
            hoursRemaining: hoursRemaining
        };
    }

    clearSession() {
        // ONLY clear session data - KEEP the saved credentials
        localStorage.removeItem(this.SESSION_KEY);
        localStorage.removeItem(this.USER_CODE_KEY);
        localStorage.removeItem('session_username');
        // DO NOT remove 'username' and 'password' - these are for "Remember Me"
        console.log('Session cleared (credentials preserved for Remember Me)');
    }

    // This method is for COMPLETE logout - clears everything
    clearAll() {
        localStorage.removeItem(this.SESSION_KEY);
        localStorage.removeItem(this.USER_CODE_KEY);
        localStorage.removeItem('session_username');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        console.log('All session data and credentials cleared');
    }

    getTimeRemaining() {
        const sessionData = this.getSessionData();
        if (!sessionData) return null;
        
        const now = Date.now();
        const remaining = sessionData.expiresAt - now;
        
        if (remaining <= 0) return null;
        
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
        
        return {
            hours,
            minutes,
            seconds,
            totalMilliseconds: remaining,
            formatted: `${hours}h ${minutes}m ${seconds}s`
        };
    }

    async init() {
        if (this.isInitialized) return this;
        
        const currentPage = window.location.pathname.split('/').pop() || '';
        this.isLoginPage = currentPage === 'signin.html' || currentPage === '';
        
        if (this.isLoginPage) {
            console.log('On login page, skipping session validation');
            this.isInitialized = true;
            return this;
        }
        
        // Only fetch session duration if not in test mode
        if (!this.TEST_MODE) {
            await this.fetchSessionDuration();
        } else {
            console.log('⚠️ TEST MODE: Using 5 minute session duration');
        }
        
        const validation = this.validateSession();
        
        if (!validation.valid && !this.redirectInProgress) {
            console.log('Session invalid, redirecting to login...');
            this.redirectInProgress = true;
            // Clear session but keep credentials
            this.clearSession();
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 100);
            return this;
        } else if (validation.valid) {
            console.log(`Session valid. Expires at:`, new Date(validation.sessionData.expiresAt));
            this.isInitialized = true;
            this.startSessionCheck();
        }
        
        return this;
    }

    startSessionCheck() {
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
        }
        
        // Check every 10 seconds for test mode, 60 seconds for production
        const checkInterval = this.TEST_MODE ? 10000 : 60000;
        
        this.sessionCheckInterval = setInterval(() => {
            if (this.isLoginPage) return;
            
            const validation = this.validateSession();
            
            if (!validation.valid && !this.redirectInProgress) {
                console.log('Session expired during periodic check');
                this.redirectInProgress = true;
                // Clear session but keep credentials
                this.clearSession();
                
                if (window.showToast) {
                    window.showToast('Your session has expired. Please log in again.', 'warning');
                }
                
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 2000);
                return;
            }
            
            // Check if session is about to expire (30 seconds or less)
            if (validation.sessionData) {
                const timeRemaining = validation.sessionData.expiresAt - Date.now();
                if (timeRemaining <= 30000 && timeRemaining > 0) {
                    const seconds = Math.floor(timeRemaining / 1000);
                    console.log(`Session expiring in ${seconds} seconds`);
                    
                    if (window.showToast && timeRemaining <= 10000) {
                        window.showToast(`Session expires in ${seconds} seconds`, 'warning');
                    }
                }
            }
        }, checkInterval);
    }

    stopSessionCheck() {
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
            this.sessionCheckInterval = null;
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        if (this.isLoginPage) return true;
        const validation = this.validateSession();
        return validation.valid;
    }
}

// Create singleton instance
const sessionManager = new SessionManager();

// Make it available globally
if (typeof window !== 'undefined') {
    window.sessionManager = sessionManager;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sessionManager;
}