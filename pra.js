function extend(target, source, deep) {
  for (let key in source) {
    //  是否为深克隆
    if (deep && isPlainObject(source[key]) && isArray(source[key])) {
      //  target
      if(isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {};
      }
      if(isArray(source[key]) && !isArray(target[key])) {
        target[key] = [];
      }
      extend(target[key], source[key], deep);
    } else {
      if(source[key] !== undefined) {
        target[key] = source[key];
      }      
    }
  }
}

$.extend = function(target) {
  let deep, args = slice.call(arguments, 1);
  if(typeof target === 'boolen') {
    deep = target;
    target = args.shift();
  }
  //  每个参数进行copy
  args.forEach((source) => extend(target, source, deep));
  return target;
}

//  dom的contains api
$.contains = document.documentElement.contains ? 
  function (parent, node) {
    return node != parent && parent.contains(node);
  } :
  function (parent, node) {
    while(node && (node = node.parentNode)) {
      if(node === parent) return true;
    }
    return false;
  }