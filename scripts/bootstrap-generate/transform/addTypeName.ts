import { ASTNode, ASTVisitFn, FieldNode, Kind, SelectionSetNode } from 'graphql'

const TYPENAME_FIELD = {
    kind: Kind.FIELD,
    name: {
        kind: Kind.NAME,
        value: '__typename',
    },
}

function isField(value: ASTNode): value is FieldNode {
    return value.kind === 'Field'
}

function addTypenameToDocument() {
    const enter: ASTVisitFn<SelectionSetNode> = (node, _key, parent) => {
        if (!parent) {
            return false
        }
        if (Array.isArray(parent)) {
            return false
        }
        const { selections } = node
        const skip = selections.some(
            (selection) =>
                isField(selection) &&
                (selection.name.value === TYPENAME_FIELD.name.value ||
                    selection.name.value.lastIndexOf('__', 0) === 0)
        )

        if (skip) {
            return
        }

        const field = parent as ASTNode

        if (
            isField(field) &&
            field.directives &&
            field.directives.some((d) => d.name.value === 'export')
        ) {
            return
        }

        return {
            ...node,
            selections: [...selections, TYPENAME_FIELD],
        }
    }

    return {
        enter,
        leave() {},
    }
}

export default addTypenameToDocument
