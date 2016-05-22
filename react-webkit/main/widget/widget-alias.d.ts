declare module "react-webkit/widget" {
    // this behaves like a relative path, but tsc eats it as 'not relative'.
    import imp = require('widget');
    export = imp;
}