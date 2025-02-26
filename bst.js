function Node() {
    return {
        data: null,
        leftNode: null,
        rightNode: null
    };
}

function Tree(array) {
    return {
        root: buildTree(array),

        insert(value) {
            const newNode = new Node();
            newNode.data = value;
            let current = this.root;
            // traverse tree until an empty slot (null) where value is inserted
            while (current) {
                if (value > current.data) {
                    if (!current.rightNode) {
                        current.rightNode = newNode;
                        break;
                    }
                    current = current.rightNode;
                }
                else if (value < current.data) {
                    if (!current.leftNode) {
                        current.leftNode = newNode;
                        break;
                    }
                    current = current.leftNode;
                }
                else {
                    return "Duplicate or invalid values cannot be inserted";
                }
            }
        },

        deleteItem(value) {
            let current = this.root;
            if (value !== current.data) {
                while (current) {
                    if (value > current.data && current.rightNode) {
                        if (value === current.rightNode.data) {
                            // no children
                            if (!current.rightNode.leftNode && !current.rightNode.rightNode) {
                                current.rightNode = null;
                            }
                            // one child
                            else if (!current.rightNode.leftNode) {
                                current.rightNode = current.rightNode.rightNode;
                            }
                            else if (!current.rightNode.rightNode) {
                                current.rightNode = current.rightNode.leftNode;
                            }
                            // two children
                            // find smallest in right side
                            else if (current.rightNode.leftNode && current.rightNode.rightNode) {
                                const deleteValue = current.rightNode;
                                current = current.rightNode.rightNode;
                                while (current.leftNode) {
                                    current = current.leftNode;
                                }
                                // remove smallest
                                this.deleteItem(current.data)
                                // smallest takes the deleted item's place
                                deleteValue.data = current.data;
                            }
                            break;
                        }
                        current = current.rightNode;
                    }
                    else if (value < current.data && current.leftNode) {
                        if (value === current.leftNode.data) {
                            // no children
                            if (!current.leftNode.leftNode && !current.leftNode.rightNode) {
                                current.leftNode = null;
                            }
                            // one child
                            else if (!current.leftNode.leftNode) {
                                current.leftNode = current.leftNode.rightNode;
                            }
                            else if (!current.leftNode.rightNode) {
                                current.leftNode = current.leftNode.leftNode;
                            }
                            // two children
                            else if (current.leftNode.leftNode && current.leftNode.rightNode) {
                                const deleteValue = current.leftNode;
                                current = current.leftNode.rightNode;
                                while (current.leftNode) {
                                    current = current.leftNode;
                                }
                                // remove smallest
                                this.deleteItem(current.data)
                                // smallest takes the deleted item's place
                                deleteValue.data = current.data;
                            }
                            break;
                        }
                        current = current.leftNode;
                    }
                    // value does not exist in tree
                    else {
                        current = null;
                        console.log("Value does not exist in tree");
                    }
                }
            }
            else {
                // if deleted value is root
                // no children
                if (!current.leftNode && !current.rightNode) {
                    this.root = null;
                }
                // one child
                else if (!current.leftNode) {
                    this.root = current.rightNode;
                }
                else if (!current.rightNode) {
                    this.root = current.leftNode;
                }
                // two children
                // find smallest in right side
                else if (current.leftNode && current.rightNode) {
                    current = current.rightNode;
                    while (current.leftNode) {
                        current = current.leftNode;
                    }
                    // remove smallest
                    this.deleteItem(current.data);
                    // smallest takes the deleted item's place
                    this.root.data = current.data;
                }
            }
        },
        find(value) {
            let current = this.root;
            if (current.data === value) {
                return current;
            }
            while (current) {
                if (value > current.data) {
                    if (current.rightNode) {
                        current = current.rightNode;
                    }
                    else {
                        current = null;
                    }
                    if (current && current.data === value) {
                        return current;
                    }
                }
                else if (value < current.data) {
                    if (current.leftNode) {
                        current = current.leftNode;
                    }
                    else {
                        current = null;
                    }
                    if (current && current.data === value) {
                        return current;
                    }
                }
            }
            return "Value not found in tree";
        }
    };
}

function buildTree(array) {
    // create new array without duplicates and then sort it in ascending order
    const uniqueArray = [];
    array.forEach(element => {
        if (!uniqueArray.includes(element)) {
            uniqueArray.push(element);
        }
    });
    uniqueArray.join();
    uniqueArray.sort((a, b) => a - b);

    // create root
    const treeRoot = new Node();
    const { medianIdx, median } = findMedian(uniqueArray);
    treeRoot.data = median;
    uniqueArray.splice(medianIdx, 1);

    // create branches recursively
    splitNode(treeRoot, uniqueArray);
    return treeRoot;
}

function findMedian(array) {
    const mid = Math.floor(array.length / 2);
    if (array.length % 2 === 0) {
        // for even length arrays, return the lower value
        return { medianIdx: mid - 1, median: array[mid - 1] };
    }
    return { medianIdx: mid, median: array[mid] };
}

function splitNode(node, array) {
    if (array.length > 1) {
        // split array
        const mid = Math.floor(array.length / 2);
        [lowerArray, upperArray] = [array.slice(0, mid), array.slice(mid)];

        // for left child
        // use aliasing to rename to lower and upper
        const { medianIdx: lowerMedianIdx, median: lowerMedian } = findMedian(lowerArray);
        const newLowerNode = new Node();
        newLowerNode.data = lowerMedian;
        node.leftNode = newLowerNode;
        // create a new array that can be spliced and then used for next split
        const newLowerArray = lowerArray;
        newLowerArray.splice(lowerMedianIdx, 1);

        // for right child
        const { medianIdx: upperMedianIdx, median: upperMedian } = findMedian(upperArray);
        const newUpperNode = new Node();
        newUpperNode.data = upperMedian;
        node.rightNode = newUpperNode;
        const newUpperArray = upperArray;
        newUpperArray.splice(upperMedianIdx, 1);

        splitNode(newLowerNode, newLowerArray);
        splitNode(newUpperNode, newUpperArray);
    }

    else if (array.length === 1) {
        if (array[0] > node.data) {
            const newUpperNode = new Node();
            newUpperNode.data = array[0];
            node.rightNode = newUpperNode;
        }
        else {
            const newLowerNode = new Node();
            newLowerNode.data = array[0];
            node.leftNode = newLowerNode;
        }
        array.splice(0, 1);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.rightNode !== null) {
        prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftNode !== null) {
        prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testTree = Tree(testArray);
testTree.insert(9000);
testTree.deleteItem(8);
console.log(testTree.find(67));
prettyPrint(testTree.root);

// todo
// levelOrder(callback), inOrder(callback), preOrder(callback), postOrder(callback)
// height(node), depth(node)
// isBalanced(), rebalance()