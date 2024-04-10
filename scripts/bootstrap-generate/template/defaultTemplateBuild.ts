import type { TemplateFn } from './types.js'
import Mustache from 'mustache'

const r = Mustache.render

const required = `
    fetch{{operationResultType}} =
        (v: {{variableTypes}}) =>
            {{fnName}}.{{operation}}<{{operationResultType}}>
                ({{query}}, v);
`

const partial = `
    fetch{{operationResultType}} =
        (v?: {{variableTypes}}) =>
            {{fnName}}.{{operation}}<{{operationResultType}}>
                ({{query}}, v ?? {});
`

const standard = `
    fetch{{operationResultType}} =
        () =>
            {{fnName}}.{{operation}}<{{operationResultType}}>({{query}});
`

const t: TemplateFn = (props) => {
    if (props.hasRequiredVariables) {
        return r(`export const ${required}`, props)
    }

    if (props.variableTypes && props.node.variableDefinitions?.length) {
        return r(`export const ${partial}`, props)
    }

    return r(`export const ${standard}`, props)
}

export default t
