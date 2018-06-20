// See http://brunch.io for documentation.
exports.files = {
    javascripts: {
        joinTo: {
            'js/vendor.js': /^(?!app)/,
            'js/app.js': /^app/
        }
    },
    stylesheets: { joinTo: 'css/app.css' },
};

exports.plugins = {
    babel: {
        presets: ['latest', 'react'],
    },
    pug: {
        prety: true
    },
};