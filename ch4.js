console.log("Hello, World!");

var add = function (a, b) {
  return a + b;
}

var f = function () {};

var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment( );
console.log(myObject.value);

myObject.increment(2);
console.log(myObject.value);

myObject.double = function ( ) {
  var that = this;

  var helper = function ( ) {
    that.value = add(that.value, that.value);
  };

  helper( );
};

myObject.double( );

console.log(myObject.value);

var Quo = function (string) {
  this.status = string;
};

Quo.prototype.get_status = function ( ) {
  return this.status;
};

var myQuo = new Quo("confused");

console.log(myQuo.get_status( ));

var array = [3, 4];
var sum = add.apply(null, array);

var statusObject = {
    status: 'A-OK'
};

var status = Quo.prototype.get_status.apply(statusObject);

console.log(status);

var sum = function ( ) {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};

console.log(sum(4, 8, 16, 23, 43));

var add = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    }
  }
  return a + b;
};

var try_it = function ( ) {
  try {
    add("seven");
  } catch (e) {
    console.log(e.name + ': ' + e.message);
  }
}

try_it( );

Function.prototype.method = function (name, func) {
  if(!this.prototype[name]){
    this.prototype[name] = func;
  }
};


Number.method('integer', function ( ) {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

console.log((-10 / 3).integer( )); // -3

String.method('trim', function( ) {
  return this.replace(/^\s+|\s+$/g, '');
});

console.log('"' + "  neat    ".trim() + '"');

var hanoi = function (disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log('Move disc ' + disc + ' from ' + src + ' to ' +dst);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(4, 'src', 'aux', 'dst');

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

var getElementsByAttribute = function (att, value) {
  var results = [];

  walk_the_DOM(document.body, function (node) {
    var actual = node.nodeType === 1 && node.getAttribute (att);
    if (typeof actual === 'string' &&
        (actual === value || typeof value !== 'string')) {
      results.push(node);
    }
  });

  return results;
};

console.log(getElementsByAttribute('src', 'ch4.js'));

// scope

var foo = function () {
  var a = 3, b = 5;

  var bar = function () {
    var b = 7, c = 11;

    console.log(a);
    console.log(b);
    console.log(c);

    a += b + c;

    console.log(a);
    console.log(b);
    console.log(c);

  };

  console.log(a);
  console.log(b);

  bar();

  console.log(a);
  console.log(b);

};

foo();

//Closures
//
var myObject = function () {
  var value = 0;

  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value;
    }
  }
}();

var quo = function(status) {
  return {
    get_status: function () {
      return status;
    }
  };
};

var myQuo = quo("amazed");

console.log(myQuo.get_status());

var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

fade(document.body);

var add_the_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(i) {
      return function (e) {
        console.log(i);
      };
    }(i);
  }
};

//request = prepare_the_request();
//response = send_request_synchronously(request);
//display(request);

//request = prepare_the_request();
//send_request_asynch(request, function(response) {
//  display(response);
//});

String.method('deentityify', function() {
  //the entity table. It maps entity names to chars
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };

  //return the dentityify function

  return function() {
    return this.replace(/&([^&;]+);/g,
                       function(a, b) {
                         var r = entity[b];
                         return typeof r === 'string' ? r : a;
                       }
    );
  };
}());

console.log('&lt;&quot;&gt;'.deentityify()); // <">

var serial_maker = function() {
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
}();

serial_maker.set_prefix('Q');
serial_maker.set_seq(1000);
var unique = serial_maker.gensym();

console.log(unique);

Function.method('curry', function(){
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;
  return function(){
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

var add1 = add.curry(1);
console.log(add1(6));

//var fibonacci = function(n) {
//  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
//};

var fibonacci = function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if (typeof result !== 'number'){
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();

//for(var i = 0; i <= 10; i += 1) {
//  console.log('// ' + i + ': ' + fibonacci(i));
//}

var memoizer = function(memo, fundamental){
  var shell = function(n){
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
};

var fibonacci = memoizer([0, 1], function(shell, n){
  return shell(n - 1) + shell(n - 2);
});

var factorial = memoizer([1, 1], function(shell, n){
  return n * shell(n - 1);
});


