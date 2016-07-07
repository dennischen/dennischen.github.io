(function c() {
    var getUrlParameter = function (sParam) {
        var url = decodeURIComponent(window.location.search.substring(1)),
            urlparms = url.split('&'),
            parmpair, i;

        for (i = 0; i < urlparms.length; i++) {
            parmpair = urlparms[i].split('=');

            if (parmpair[0] === sParam) {
                return parmpair[1] === undefined ? true : parmpair[1];
            }
        }
    };
    var testcase = getUrlParameter('testcase');
    if (testcase) {
       require([testcase], function (app) {

    	    if(ga){
                ga('set', 'page', 'test/cases/'+testcase);
                ga('send', 'pageview');
            }

            app.render(document.getElementById('content'));
       });
    }else{
        require(['jquery'],function(jq){
            jq('#loading').html('No testcase found, set testcase by add parameter ?testcase=a_testcase');
        });
    }
})();