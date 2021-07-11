// Instructions: https://www.youtube.com/watch?v=QE-6dunnWt4

const rootNode = {
    name: "node1",
    children: [
        {
            name: "node2",
            children: [
                {
                    name: "node3",
                    tag: 251,
                },
            ]
        },
        {
            name: "node4",
            children: [
                {
                    name: 'node5',
                    children: [
                        {
                            name: "node7",
                            children: [
                                {
                                    name: 'node8',
                                    children: [
                                        {
                                            name: "node6"
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]
        },
    ]
}

// YOU CAN MODIFY THIS PART ONLY
/**
 * Search a node by name inside a node
 * @param node Any node to start the search in
 * @param nodeName The name to search
 * @returns undefined when no node is found or the founded node
 */

const searchInNodeByName = (node, nodeName) => {
    if (node.name === nodeName) {
        return node
    }

    let found
    
    if(node.children) {
        for (child in node.children) {
            found = searchInNodeByName(node.children[child], nodeName)

            if(found) { 
                return found
            }
        }
    }
}
// HERE ENDS WHAT YOU CAN MODIFY

const valueIsRecord = (value) => value !== null
    && typeof value === 'object'
    && !Array.isArray(value)

const node6 = searchInNodeByName(rootNode, 'node6')

if (
    node6 === undefined
    || !valueIsRecord(node6)
    || node6.name !== 'node6'
) {
    throw new Error('node6 should be found')
}

const node10 = searchInNodeByName(rootNode, 'node10')

if (node10 !== undefined) {
    throw new Error('node10 should not be found')
}

const node3 = searchInNodeByName(rootNode, 'node3')

if (
    node3 === undefined
    || !valueIsRecord(node3)
    || node3.name !== 'node3'
    || node3.tag !== 251
) {
    throw new Error('node3 should be found')
}

console.log('IF YOU SEE THIS ON YOUR CONSOLE, YOU ARE DONE!')
