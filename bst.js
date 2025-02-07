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
        if (!array.includes(element)) {
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
        const { lowerMedianIdx, lowerMedian } = findMedian(lowerArray);
        const lowerNode = node.leftNode;
        lowerNode.data = lowerMedian;
        lowerArray.splice(lowerMedianIdx, 1);
        splitNode(lowerNode, lowerArray);

        // for right child
        const { uppererMedianIdx, upperMedian } = findMedian(upperArray);
        const upperNode = node.rightNode;        
        upperNode.data = upperMedian;
        upperArray.splice(uppererMedianIdx, 1);
        splitNode(upperNode, upperArray);
    }

    else if (array.length === 1) {
        if (array[0] > node.data) {
            node.rightNode.data = array[0];
        }
        else {
            node.leftNode.data = array[0];
        }
        array.splice(0,1);
    }
}

function prettyPrint() {
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}