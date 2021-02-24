---
title: unit test来说明==和===
tags:  
  - javascript
  - equality  
date: '2015-09-08T00:00:00.000Z'
---

```js
var should = require('should');

describe('Equality', function(){

    describe('ToBoolean', function(){
        it('null, undefined转换为false', function(){
            should(!!null).be.false()
            should(!!undefined).be.false()
        })

        it('Number中+0，-0，NaN转换为false，其他为true', function(){
            should(!!0).be.false()
            should(!!NaN).be.false()
            should(!!3).be.true()
        })

        it('String中空字符串转换为false，其他为true',function(){
            should(!!'').be.false()
            should(!!'12f').be.true()
        })

        it('Object都转换为true', function(){
            should(!!Function).be.true()
        })
    })

    describe('ToNumber', function(){
        it('String 转换为 Number', function(){
            // 前后可以有空格或者换行
            should(' \
            1  \
            ' - 0).eql(1)

            // 数字，小数，正负数
            should('1' - 0).eql(1)
            should('1.2' - 0).eql(1.2)
            should('+1' - 0).eql(1)
            should('-1' - 0).eql(-1)

            //16进制
            should('0xF' - 0).eql(15)
            should('0Xf' - 0).eql(15)

            //无限大
            should('Infinity' - 0).eql(Infinity)

            // 科学计数法
            should('1E2' - 0).eql(100)
            should('1e+2' - 0).eql(100)
            should('1e-2' - 0).eql(0.01)

            // NaN
            should('1R' - 0).be.NaN

        });

        it('boolean 转换为 Number', function(){
            should(true - 0).eql(1)
            should(false - 0).eql(0)
        });
    });
/*
根据ECMA262 2015进行更新：

先判断是否有方法<object>.@@toPrimitive, 如果有，调用这个方法，传入的参数hint可能的值是default，number，string

如果没有定义@@toPrimitive，如果hint是default(这就是默认的行为)，将hint置为number
number：
<"valueOf", "toString">的顺序来调用方法,直到返回primitive，否则抛出TypeError
string：
<"toString", "valueOf">的顺序来调用方法，直到返回primitive, 否则抛出TypeError

目前有自行定义@@toPrimitive的两个Object(@@toPrimitive == Symbol.toPrimitive)
Symbol.prototype[@@toPrimitive]:
暂时还没看Symbol的细节，待补充...
Date.prototype[@@toPrimitive]：
行为是让default等于string，然后再按正常流程来走

测试下来，貌似这个逻辑浏览器上面还没有实现

*/
    describe('ObjectToPrimitive', function(){

        var obj1 = {
            valueOf: function() { return {}},
            toString: function() {return 'obj'}
        }

        var obj2 = {
            valueOf: function() {return 2},
            toString: function() {return {}}
        }

        var obj3 = {
            valueOf: function() {return {}},
            toString: function() {return {}}
        }

        var obj4 = {
            valueOf: function() { return 4},
            toString: function() {return 'four'}
        }

        // 使用 == 触发ToPrimitvie
        describe('默认情况下，Hint为Number，先调用valueOf,然后调用toString，直到第一个返回primitive为止', function(){
            it('valueOf和toString都返回primitive时，使用valueOf的值', function(){
                should(obj4 == 4).be.true()
            })

            it('valueOf返回Object，toString返回primitive, 使用toString的值',function(){
                should(obj1 == 'obj').be.true()

                // Array的valueOf返回的是对象本身
                var arr = []
                arr.valueOf().should.be.exactly(arr)
                should(arr == arr.toString()).be.true()
            })

            it('valueOf和toString都返回Object,抛异常', function(){
                (function(){
                    obj3 == 1
                }).should.throw(Error)
            })
        })

        describe('但是Date例外，Hint为String，先到用toString，然后再调用Valueof,直到第一个返回primitive为止', function(){
            it('等于toString', function(){
                var d = new Date()

                should(d.toString() == d).be.true()
                should(d.valueOf() == d).be.false()
            })
        })

    });

    describe('==',function(){
        describe('比较相同的类型', function(){

            it('基本类型的比较，按值比较', function(){
                should(undefined == undefined).be.true();
                should(null == null).be.true();
                should(1 == 1).be.true();
                should('abc' == 'abc').be.true();
                should(true == true).be.true();
            });

            it('对于Number型来说，特殊值NaN和任何值都不相等', function(){
                should(NaN == 1).be.false();
                should(NaN == NaN).be.false();
            });

            it('对于Object类型来说，相同的引用才相等。其余都不相等',function(){
                should({} == {}).be.false();

                var obj = {};
                should(obj == obj).be.true();
            });
        });
/*
ECMA262 2015 新加入的symbol


*/
        describe('比较不同的类型', function(){
            it('undefined等于null; undefined和null不等于其他', function(){
                should(undefined == null).be.true();

                // 和Number比较
                should(0 == undefined).be.false();
                should(0 == null).be.false();

                // 和String比较
                should('undefined' == undefined).be.false();
                should('null' == null).be.false();

                should('' == undefined).be.false()
                should('' == null).be.false()

                should(' ' == undefined).be.false()
                should(' ' == null).be.false()

                // 和Boolean比较
                should(true == undefined).be.false()
                should(false == undefined).be.false()
                should(true == null).be.false()
                should(false == null).be.false()

                // 和Object比较
                // ... 待补充
            });

            it('String和Number比较时，String转换为Number',function(){
                should('Infinity' == Infinity).be.true()
                should('1' == 1).be.true()
                should('1R' == 1).be.false()
            });

            it('有一方是boolean型的时候，将boolean转换为Number，再进行比较', function(){
                should(true == 1).be.true()
                should(false == 0).be.true()
            });

            it('所以说，if(3)和if(3 == true)是不一样的，因为前面一个是把3转成boolean，而后一个是把boolean转成数字', function(){
                (function(){if (3) throw '3 is true'}).should.throw(); // 为什么需要分号？？
                (function(){if (3 == true) throw '3 == true'}).should.not.throw()
            })

/*
    这个时候，String， Number，symbol， Object转换为Primitive

    感觉还是没有实现,和规范要求的不一样啊
*/
            it('有一方是String或者Number，另外一方是Object，将Object转换为Primitive，再进行比较', function(){
                    should({valueOf:function(){return 1}} == 1).be.true()
            });

/*
            it('补充上面，有一个是Symbol，一个是Object，也是将Object转换为Primitve，再进行比较', function(){
                (
                    {valueOf:function(){return Symbol.for('test')}} == Symbol.for('test')
                ).should.be.true();
            })
*/
            it('来一些例子', function(){
                // 先将false转成0，再将‘3’转成3，所以返回false
                should(false == '3').be.false()

                // ... 待补充
            })
        });
    });

    describe('#===', function(){
        it('相同的类型和==的结果一样', function(){
            should(undefined === undefined).be.true();
            should(null === null).be.true();
            should(1 === 1).be.true()
            should('' === '').be.true()
            should('123' === '123').be.true()
            should(NaN === 1).be.false();
            should(NaN === NaN).be.false();
            should({} === {}).be.false();
        });

        it('不同类型的话，返回false',function(){
            should(1 === '1').be.false()
            should(null === undefined).be.false()
            // ... 待补充
        })
    });
});


```
