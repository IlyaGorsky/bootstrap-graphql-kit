import type { TemplateFn } from './types.js'
import Mustache from 'mustache'

const r = Mustache.render

const required = `
       use{{operationResultType}} =
        (v: {{variableTypes}}, enabled: boolean = true) =>
            useQuery({
                queryFn:
                    () =>
                        {{fnName}}.{{operation}}<{{operationResultType}}>
                            ({{query}}, v),
                queryKey:['{{operationName}}', v],
                enabled
            })
`

const partial = `
    use{{operationResultType}} =
        (v?: {{variableTypes}}, enabled: boolean = true) =>
            useQuery({
                queryFn: () =>
                    {{fnName}}.{{operation}}({{query}}, v ?? {}),
                queryKey:['{{operationName}}', v],
                enabled
            })           
`

const standard = `
    use{{operationResultType}} =
        (enabled: boolean = true) =>
            useQuery({
                queryFn: async () => {{fnName}}.{{operation}}({{query}}),
                queryKey:['{{operationName}}'],
                enabled
            })
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

t.imports = [['useQuery', '@tanstack/react-query']];

export default t
