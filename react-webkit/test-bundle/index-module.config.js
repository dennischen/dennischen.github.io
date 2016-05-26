var libPath = "../test/jslib/";
requirejs.config({
    paths: {
        "react": libPath + "react",
        "react-dom": libPath + "react-dom",
        "jquery": libPath + "jquery",
        //built by webpack
        "react-webkit/util":"../main/util",
        "react-webkit/widget":"../main/widget",
        "react-webkit/layout":"../main/layout"
    },
});