---
title: unit test来说明typeof和instanceof的区别
tags:
  - javascript
  - typeof
  - instanceof 
date: '2015-08-29T00:00:00.000Z'
---

```js

var should = require('should');

describe('typeof & instanceof', function(){
	describe('# typeof', function(){

		it('typeof的结果是个字符串', function(){
			should(typeof any).be.String()
		})

		it('typeof <identifier>无法获取引用的值的时候不会导致报错,返回undefined', function(){

			(function(){
				var a = x;
			}).should.throw()

			should(typeof x).eql('undefined')
		})

		it('typeof primitive value', function(){
			(typeof undefined).should.be.exactly('undefined');
			(typeof null).should.be.exactly('object');
			(typeof 'this is a string').should.be.exactly('string');
			(typeof false).should.be.exactly('boolean');
			// Not-a-Number is a number
			(typeof 1).should.be.exactly('number');
			(typeof NaN).should.be.exactly('number');
		});

		it('typeof object', function(){
			(typeof function(){}).should.be.exactly('function');
			(typeof {}).should.be.exactly('object');
			(typeof []).should.be.exactly('object');
		});

		it('typeof Symbol', function(){
			//...
		})

		it('Primitive Wrapper is object', function(){
			(typeof new Boolean(true)).should.be.exactly('object');
			(typeof new String('this is a string')).should.be.exactly('object');
			(typeof new Number(0)).should.be.exactly('object');
		});
	});

    describe('# <left-value> instanceof <right-value> ', function(){

		it('<right-value> 必须是Object，否则抛异常', function(){

			var obj = {};

			(function(){
				obj instanceof 1
			}).should.throw(TypeError);

			(function(){
				obj instanceof null
			}).should.throw(TypeError);

			(function(){
				obj instanceof ''
			}).should.throw(TypeError);

			(function(){
				obj instanceof undefined
			}).should.throw(TypeError);

		});

		it('更严格的说，对于Built-in对象来说，其实只有Function Object可以作为<right-value>', function(){

			// 因为要求作为right-value的Object必须要有[[HasInstance]]这个内部方法。
			// 内置对象只有Funtion Object有这个内部方法。

			var obj = {};

			(function(){
				obj instanceof []
			}).should.throw(TypeError);

			(function(){
				obj instanceof (new Date())
			}).should.throw(TypeError);

			(function(){
				obj instanceof ({})
			}).should.throw(TypeError);

			(function(){
				obj instanceof (function(){})
			}).should.not.throw();

		})

		describe('实际上就是调用<right-value>的[[HasInstance]]，将<left-value>作为参数传入', function(){

			describe('对于Function来说', function(){

				it('如果<left-value>不是对象，返回false', function(){

					//看起来是不会自动装箱
					should(1 instanceof Number).be.false()
					should(new Number(1) instanceof Number).be.true()

					should('' instanceof String).be.false()
					should(new String('') instanceof String).be.true()

					should(true instanceof Boolean).be.false()
					should(new Boolean(true) instanceof Boolean).be.true()

				})

				it('取得Function的prototype属性，如果prototype不是对象的话，抛出异常', function(){
					function func() {}
					var f = new func();

					should(f instanceof func).be.true();

					(function(){
						func.prototype = 1
						f instanceof func
					}).should.throw(TypeError);

					(function(){
						func.prototype = ''
						f instanceof func
					}).should.throw(TypeError);

					(function(){
						func.prototype = true
						f instanceof func
					}).should.throw(TypeError);

					(function(){
						func.prototype = null
						f instanceof func
					}).should.throw(TypeError);

					(function(){
						func.prototype = undefined
						f instanceof func
					}).should.throw(TypeError);
				})

				// 注意[[prototype]]和prototype的区别
				// obj的[[prototype]]是 Object.getPrototypeOf(obj)
				// obj的prototype是 obj.prototype
				it('然后重复比较left-value的[[prototype]]链上的对象和right-value的prototype', function(){

					function Foo(){}
					var foo = new Foo
					// 如果有一个对象和right-value的prototype相同，返回true
					should(foo instanceof Foo).be.true()

					var proto = {}
					var foo2 = Object.create(proto)
					var Foo2 = function(){};
					Foo2.prototype = proto;
					should(foo2 instanceof Foo2).be.true()

					// 如果原型链到达了顶端的null，返回false
					// 这个例子因为Object.create(null)创建出来的对象的[[prototype]]就是null，所以只可能返回false
					should(Object.getPrototypeOf(Object.create(null))).be.exactly(null)
					should(Object.create(null) instanceof Object).be.false()

					Foo.prototype = {}
					should(foo instanceof Foo).be.false()
				})
			})

			describe('特例又来了，对于Function.prototype.bind创建的Function来说，结果又不一样了', function(){
				it('这个时候,bind生成Function的[[HasInstance]]的实现是委托给被绑定的Function的[[HasInstance]]方法', function(){
					//简单的说，就是这样的
					var a = {} // 任意对象
					function foo() {}
					var bFoo = foo.bind({});
					should(a instanceof bFoo).eql(a instanceof foo)

					// 上面说的a可以是任意对象，比如：
					var b = new foo()
					should(b instanceof bFoo).eql(b instanceof foo)

					var c = new bFoo()  // 问题来了，new的时候到底发生了什么？
					should(c instanceof bFoo).eql(c instanceof foo)

					var d = Object.create(foo.prototype)
					should(d instanceof bFoo).eql(d instanceof foo)

					// 所以这种情况下就和正常的function不一样了。
					should(bFoo.prototype).be.undefined(); // 因为默认情况下这个是undefined
					bFoo.prototype = {} // 所以需要先设置一下
					var f = Object.create(bFoo.prototype)
					should(f instanceof bFoo).be.fasle
				})
			})
		})

    });
});


```
