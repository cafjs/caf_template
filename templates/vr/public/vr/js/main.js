if (typeof window !== 'undefined') {
    // no server-side rendering
    var app = require('./app');
    window.addEventListener('DOMContentLoaded', () => {
        app.main();
    });
};
