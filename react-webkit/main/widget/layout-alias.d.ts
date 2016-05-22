declare module "react-webkit/layout" {
    // this behaves like a relative path, but tsc eats it as 'not relative'.
    import imp = require('layout');
    export = imp;
}