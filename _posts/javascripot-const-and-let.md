---
title: unit test 说明 let 和 const
tags:
  - javascript
  - variable declaration
date: '2015-09-17T00:00:00.000Z'
---

```js

'use strict'
// 目前来说，只有在strict mode下才能使用 const， let等关键词

// 定义为常量了
const should = require('should')

describe('block binding', function() {

    describe('var, let, const', function() {

        it('终于有了自己的块作用域了', function() {
            var condition;

            if (condition) {
                var _var = 100
                let _let = 100
                const _const = 100
            } else {

                should(function(){
                    _var
                }).not.throw()

                should(function(){
                    _let
                }).throw()

                should(function(){
                    _const
                }).throw()
            }

        })

        it('const表示常量', function() {
            const _const = {
                bar: 100
            }

            should(function() {
                _const = 200
            }).throw()

            should(function() {
                _const.bar = 200
            }).not.throw()
        })
    })

    describe('The Temporal Dead Zone', function(){
/*
    js引擎会遍历一下upcoming block（即将进入的block），对于let，const之类会加入到TDZ中，碰到
    使用属于TDZ的变量会直接报错，即使是typeof也一样。只有当代码知道到这个变量定义的位置，变量才从
    TDZ中移除。
*/
        it('', function() {

            should(function(){
                // typeof也会抛出异常来了
                typeof _let
            }).throw()

            let _let = 100

        })
        // 下面这个例子，因为let定义的变量不输入upcomming block，所以typeof可以工作
        it('', function() {
            var condition = true;
            // 这个时候 typeof不会抛出异常来
            (typeof _let).should.eql('undefined')

            if (condition) {
                let _let = 100
            }

        })

    })

    describe('loop', function() {

        it('', function() {
            var funcs = []
            for (var i = 0; i < 10; i++) {
                funcs.push(function() {
                    return i;
                })
            }

            var result = []
            funcs.forEach(function(func) {
                result.push(func())
            })

            result.should.eql([10, 10, 10, 10, 10, 10, 10, 10, 10, 10])
        })

        it('', function() {
            var funcs = []
            for (var i = 0; i < 10; i++) {
                funcs.push(function(v) {
                    return function() {
                        return v;
                    }
                }(i))
            }

            var result = []
            funcs.forEach(function(func) {
                result.push(func())
            })

            result.should.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        })
    })
})

```
