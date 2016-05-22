declare module "react-webkit/util" {
    // this behaves like a relative path, but tsc eats it as 'not relative'.
    import imp = require('util');
    export = imp;
}