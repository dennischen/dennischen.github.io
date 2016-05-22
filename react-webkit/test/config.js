(function c(){
    var libPath = "jslib/";
    requirejs.config({
        paths: {
            "react": libPath + "react",
            "react-dom": libPath + "react-dom",
            "jquery": libPath + "jquery",
            "react-webkit/widget":"../main/widget/widget",
            "react-webkit/layout":"../main/widget/layout",
            "react-webkit/util":"../main/util/util"
        },
    });
})();