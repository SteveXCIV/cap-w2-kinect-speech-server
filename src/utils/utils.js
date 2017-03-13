let clone = obj => Object.assign({}, obj);

let strip = (obj, keys) => {
    for (let k of keys) {
        if (obj.hasOwnProperty(k)) delete obj[k];
    }
}

let stripClone = (obj, keys) => {
    let c = clone(obj);
    strip(c, keys);
    return c;
}

export default {
    clone: clone,
    strip: strip,
    stripClone: stripClone
};
