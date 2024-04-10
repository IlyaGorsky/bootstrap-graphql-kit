import path from 'node:path'
import type { Types } from '@graphql-codegen/plugin-helpers'
import {
    LoadedFragment,
    ClientSideBaseVisitor,
    ClientSideBasePluginConfig,
} from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema } from 'graphql'
import type { TemplateProps } from './template/types.js'
import type { BootStrapRawConfig } from './types.js'
import defaultTemplateBuild from './template/defaultTemplateBuild.js'
import defaultTemplateMockBuild from './template/defaultTemplateMockBuild.js'
import defaultTemplateReactQueryHook from './template/defaultTemplateReactQueryHook.js'
import addTypenameToDocument from './transform/addTypeName.js'

type BaseVisitor = InstanceType<typeof ClientSideBaseVisitor>
type GetImports = BaseVisitor['getImports']
type BuildOperation = BaseVisitor['buildOperation']

interface BootStrapPluginConfig extends ClientSideBasePluginConfig {
    fetcherImport: ClientSideBasePluginConfig['gqlImport']
}

export class BootStrapVisitor extends ClientSideBaseVisitor<
    BootStrapRawConfig,
    BootStrapPluginConfig
> {
    private fetcherFnName = 'fetcher'
    private templates = [
        defaultTemplateBuild,
        defaultTemplateMockBuild,
        defaultTemplateReactQueryHook,
    ]

    constructor(
        schema: GraphQLSchema,
        fragments: LoadedFragment[],
        config: BootStrapRawConfig,
        documents: Types.DocumentFile[]
    ) {
        super(
            schema,
            fragments,
            config,
            { fetcherImport: config.fetcherImport },
            documents
        )
    }

    protected resolvePathImportInDocumentOperation(p: string) {
        const form = this._documents[0].location!
        const to = path.resolve(process.cwd(), p)
        const fetcherPath = path.relative(form, to)
        return fetcherPath.replace(path.extname(fetcherPath), '');
    }

    protected generateFetchImport(importString: string): string {
        const fetcherImport = this._parseImport(importString)
        if (fetcherImport.moduleName) {
            if (path.extname(fetcherImport.moduleName)) {
                fetcherImport.moduleName = this.resolvePathImportInDocumentOperation(fetcherImport.moduleName)
            }
            if (fetcherImport.propName) {
                return `import { ${this.fetcherFnName} as ${fetcherImport.propName}} from '${fetcherImport.moduleName}'`
            }
            return `import ${this.fetcherFnName} from '${fetcherImport.moduleName}'`
        } 
        return '';
    }


    protected renderTemplate(props: TemplateProps) {
        return this.templates
            .map((template) => template(props))
            .join('\n \n \n')
    }

    /**
     * На каждую операцию вызываем рендер темплейта
     */
    protected buildOperation: BuildOperation = (
        _node,
        _documentVariableName,
        _operation,
        _operationResultType,
        _operationVariablesTypes,
        _hasRequiredVariables
    ) => {
        if (_operation === 'Query' || _operation === 'Mutation') {
            return this.renderTemplate({
                node: _node,
                query: _documentVariableName,
                operationName: _node.name?.value || 'unknown',
                fnName: this.fetcherFnName,
                operation: _operation.toLowerCase(),
                operationResultType: _operationResultType,
                variableTypes: _operationVariablesTypes,
                hasRequiredVariables: _hasRequiredVariables,
            })
        }
        return ''
    }

    addTypenameToDocument = addTypenameToDocument

    getImports: GetImports = (options) => {
        if (!this._collectedOperations.length) {
            const baseImports = super.getImports(options)
            baseImports.push('\n')
            return baseImports
        }
        
        const imports = [];

        imports.push(this.generateFetchImport(this.config.fetcherImport))
        
        this.templates.forEach((template) => {
            if (template.imports) {
                template.imports.forEach(([importName, importModule]) => {
                    imports.push(`import { ${importName} } from '${importModule}'`)
                })
            }
        })

        imports.push('\n')
    
        return [...super.getImports(options), ...imports]
    }
}
