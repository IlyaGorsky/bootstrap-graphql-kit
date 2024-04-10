import type { OperationDefinitionNode } from "graphql";

export interface TemplateProps {
    node: OperationDefinitionNode,
    query: string,
    operationName: string | 'unknown'
    fnName: string;
    /**
     * @value 'query' | 'mutation' | 'subscription'
     */
    operation: string;
    operationResultType: string,
    variableTypes: string,
    hasRequiredVariables: boolean,
}

type ImportName = string;
type ImportModuleNameOrPath = string;
type Imports = Array<[ImportName, ImportModuleNameOrPath]>

export type TemplateFn = {
    (props: TemplateProps): string
} & {
    /**
     * Additional import for use render template
     * [propName, moduleName]
     * @example [['useQuery, sommeNames', '@tanstack/react-query']]
     */
    imports?: Imports
}