function Node() {
    return {
        data: null,
        leftNode: null,
        rightNode: null
    };
}

function Tree(array) {
    return {
        root: buildTree(array)
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
// console.log(testTree)
prettyPrint(testTree.root);