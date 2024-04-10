import type { TemplateFn } from './types.js';
import Mustache from 'mustache';

const r = Mustache.render;

const required = `
    mock{{operationResultType}} =
        (resolve: (v: {{variableTypes}}) => {{operationResultType}}) => resolve;

    mock{{operationResultType}}.operationName = '{{operationName}}' as const;
`;

const partial = `
    mock{{operationResultType}} =
        (resolve: (v?: {{variableTypes}}) => {{operationResultType}}) => resolve;

    mock{{operationResultType}}.operationName = '{{operationName}}' as const;
`;

const standard = `
    mock{{operationResultType}} =
        (resolve: () => {{operationResultType}}) => resolve;

    mock{{operationResultType}}.operationName = '{{operationName}}' as const;
`;


const t: TemplateFn = (props) => {
    if (props.hasRequiredVariables) {
        return r(`export const ${required}`, props);    
    }
    
    if (props.variableTypes && props.node.variableDefinitions?.length) {
        return r(`export const ${partial}`, props);    
    }
    
    return r(`export const ${standard}`, props);  
} 

export default t;
