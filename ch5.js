if (typeof Object.beget !== 'function') {
    Object.beget = function (o) {
      var Func = function () {};
      Func.prototype = o;
      return new Func();
  };
}

Function.prototype.method = function (name, func) {
  if(!this.prototype[name]){
    this.prototype[name] = func;
  }
};

Function.method('new', function() {
    var that = Object.beget(this.prototype);
    var other = this.apply(that, arguments);
    return (typeof other === 'object' && other) || that;
});

var Mammal = function(name){
    this.name = name;
};

Mammal.prototype.get_name = function() {
    return this.name;
}

Mammal.prototype.says = function() {
    return this.saying || '';
};

var myMammal = new Mammal('Herb the mammal');
var name = myMammal.get_name(); //'Herb the mammal'

var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
};

Cat.prototype = new Mammal();

Cat.prototype.purr = function(n){
    var i, s = '';
    for (i = 0; i < n; i += 1){
        if (s) {
            s += '-';
        }
        s+= 'r';
    }
    return s;
};

Cat.prototype.get_name = function(){
    return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();

Function.method('inherits', function(Parent) {
    this.prototype = new Parent();
    return this;
});

var Cat = function(name){
    this.name = name;
    this.saying = 'meow';
}.
    inherits(Mammal).
    method('purr', function(n){
      var i, s = '';
      for(i = 0; i < n; i += 1){
          if(s){
              s += '-';
          }
          s += 'r';
      }
      return s;
    }).
    method('get_name', function(){
        return this.says() + ' ' + this.name + ' ' + this.says();
    });

//object specifiers
var myObject = maker(f, l, m, c, s);

var myObject = maker({
    first: f,
    last: l,
    state: s,
    city: c
});

//prototypal
var myMammal = {
    name: 'Herb the Mammal',
    get_name: function() {
        return this.name;
    },
    says: function() {
        return this.saying || '';
    }
};

var myCat = Object.beget(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n){
    var i, s = '';
    for(i = 0; i < n; i += 1){
        if(s){
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function(){
    return this.says + ' ' + this.name + ' ' + this.says;
};

var block = function(){
    var oldScope = scope;
    scope = Object.beget(scope);
    advance('{');
    parse(scope);
    advance('}');
    scope = oldScope;
};

var constructor = function(spec, my){
    var that; //, more private instance variables;
    my = my || {};

    //add shared variables and function to my
    //my.member = value;

    //that = //new object somehow;
    //add privileged methods to that

    return that;
};

//pg 116
