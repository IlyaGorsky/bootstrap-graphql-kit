import { CodegenPlugin, oldVisit } from '@graphql-codegen/plugin-helpers'
import { BootStrapVisitor } from './visitor.js'
import { concatAST, type DocumentNode, type FragmentDefinitionNode, Kind } from 'graphql';
import type { LoadedFragment } from '@graphql-codegen/visitor-plugin-common';
import type { BootStrapRawConfig } from './types.js';
/**
 * Для того чтобы написать плагин на typescript. Используется 
 * @see https://the-guild.dev/graphql/codegen/docs/getting-started/esm-typescript-usage
 * 
 * Структура плагин и гайд по написанию плагина
 * @see https://the-guild.dev/graphql/codegen/docs/custom-codegen/plugin-structure
 */
export const plugin: CodegenPlugin<BootStrapRawConfig>['plugin'] = (schema, documents, config) => {
    // Находим все документ ноды
    const documentsNode = documents.reduce((nodes: DocumentNode[], documentFile) => {
        if (documentFile.document) {
            return [documentFile.document, ...nodes]
        }
        return nodes
    }, []);
    const allAst = concatAST(documentsNode);
    const fragments = allAst.definitions.reduce((nodes: FragmentDefinitionNode[], definition) => {
        if (definition.kind === Kind.FRAGMENT_DEFINITION) {
            return [definition, ...nodes]
        }
        return nodes
    }, []);
    const allFragments: LoadedFragment[] = fragments.map(
        (fragment) => ({
            node: fragment,
            name: fragment.name.value,
            onType: fragment.typeCondition.name.value,
            isExternal: false,
        }),
        ...(config.externalFragments || [])
    )   
    const visitor = new BootStrapVisitor(schema, allFragments, config, documents);

    const result = oldVisit(allAst, {
        // @ts-expect-error: 'leave' is not a NewVisitor['leave']
        leave: visitor,
        SelectionSet: visitor.addTypenameToDocument(),
    })

    const definitions = result.definitions.filter((t: unknown) => typeof t === 'string').join('\n') as unknown as string;
    const content = [visitor.fragments, definitions].join('\n');

    return {
        prepend: visitor.getImports(),
        content: content,
    }
}

export default {
    plugin
}