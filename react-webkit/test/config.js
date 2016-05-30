(function c(){
    var libPath = "jslib";
    requirejs.config({
        paths: {
            "react": libPath + "/react",
            "react-dom": libPath + "/react-dom",
            "jquery": libPath + "/jquery",
            "syntaxhighlighter": libPath + "/syntaxhighlighter"
        },
    });
})();