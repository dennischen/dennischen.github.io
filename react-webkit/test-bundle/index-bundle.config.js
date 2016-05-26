var libPath = "../test/jslib/";
requirejs.config({
    paths: {
        "react": libPath + "react",
        "react-dom": libPath + "react-dom",
        "jquery": libPath + "jquery",
        //built by webpack
        "react-webkit":"../main/react-webkit.min"
    },
});