declare module '*.less' {
    const resource: {[key: string]: string};
    export = resource;
}

declare type ObjectType = {
    [key: string]: any;
}

declare type TemplateProps = {
    data: ObjectType;
    pageContext: ObjectType;
}
