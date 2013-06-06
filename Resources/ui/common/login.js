var Cloud = require('ti.cloud');
Cloud.debug = true;

// Create a user
// ACS app must be configured to use 3-legged OAuth
Cloud.Users.secureLogin({
    title: 'Sign Up Here'
}, function (e) {
    if (e.success) {
        alert('Success:\\n' +
            'accessToken: ' + e.accessToken + '\\n' +
            'expiresIn: ' + e.expiresIn);
    } else {
        alert('Error:\\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});