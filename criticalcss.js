var critical = require('critical');

critical.generate({
    base: '/git_projects/responsive-oc-menu/',
    src: 'index.html',
    dest: 'styles/main.css',
    width: 320,
    height: 480
});


/*critical.generateInline({
    // Your base directory
    base: 'test/',

    // HTML source
    src: 'index.html',

    // Your CSS Files (optional)
    css: ['css/menu.css'],

    // Viewport width
    width: 320,

    // Viewport height
    height: 480,

    // Target for final HTML output
    htmlTarget: 'index-critical.html',

    // Target for generated critical-path CSS (which we inline)
    styleTarget: 'css/critical/main.css',

    // Minify critical-path CSS when inlining
    minify: true
});*/
