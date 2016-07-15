

interface Moment {
    (arg: any): any;
}

declare module 'moment'{
    export = moment;
}

declare var moment:Moment;