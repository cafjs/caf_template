if (typeof window !== 'undefined') {
    // no server-side rendering
    const app = require('./app');
    window.addEventListener('DOMContentLoaded', () => {
        app.main();
    });
};
