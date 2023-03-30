
// for:
var a = [], f = function() {};

// the expression:
a.map(f);

// is equivalent to:
Array.prototype.map.call(a, f);



Array.prototype.map.call(document.images, function (i) { console.log('image', i.src); });

