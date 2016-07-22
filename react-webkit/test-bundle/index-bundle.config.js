(function c(){
    var libPath = "../test/jslib/";
    requirejs.config({
        paths: {
            "react": libPath + "react",
            "react-dom": libPath + "react-dom",
            "jquery": libPath + "jquery",
            "moment": libPath + "moment",
            //built by webpack
            "@atticcat/react-webkit":"../dist/react-webkit.min"
        },
    });
})();