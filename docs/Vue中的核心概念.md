---
slug: "/docs/Vue中的核心概念"
date: "2019-05-04"
title: "Vuex中的核心概念"
---
本文主要归纳总结Vuex.Store实例化过程中传入对象的属性。如下面的store, getter, mutations, actions属性；
```javascript
// store.js
const store = Vuex.Store({
		state: {
				count: 0,
				todos: [
					{
						{id: 1, done: true},
						{id: 2, done: false}
					}
				]
			},
		getters: {
				doneTodos: state => {
					state.todos.filter(todo => todo.done)
				}
			},
		mutations: {
				increment: state => state.count++
			},
		actions: {
				increment: context => {
					context.commit('increment');
				},
				incrementAsync ({commit}) {
					setTimeout(() => {
							commit('increment');
						}, 1000)
				}
		}
	})
module.exports = store;
```
## state, getters, mutations, actions联系与区别
+ states中管理这所有的**数据状态**
+ getters中则保存的是由**state派生出来的状态**，默认传入的参数为**state**
+ mutations中保存着用来**改变state状态的方法**，**只能包含同步操作**，state更改只能在这进行，默认传入的参数为**state**
+ actions中保存的也是改变state状态的方法，但是是**通过提交mutations来修改**的，**可以是异步操作**，默认传入的参数为**context**

## 子组件中使用state中的状态与派生状态
1. 首先将store添加到根Vue中
```javascript
// app.js
const store = require('store.js')
var app = new Vue({
		components: {
			com1,
			com2
		}
		store
	})
```
2. 在组件中调用
```javascript
// com1.vue
<template>
	<div> {{ count }} </div>
</template>
<script>
	export default {
		data () {
			return {
				localCount: 0
			}
		},
		computed: {
			// 获取state中状态
			count () {
				return this.$store.state.count;
			}
			// 获取派生状态
			doneTodos () {
				return this.$store.getters.doneTodos;
			}
		}
	}
</script>
```
也可以使用辅助函数mapState,mapGetters
```javascript
// com1.vue
<template>
	<div> {{ count }} </div>
</template>
<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		data () {
			return {
				localCount: 0
			}
		},
		computed: {
			...mapState({
				count: state => state.count
			}),
			...mapGetters({
				doneTodos: getters => getters.doneTodos
			})
		}
	}
</script>
```

## 子组件中改变state
在子组件中提交mutations或者分发actions
```javascript
// com1.vue
<template>
	<div> {{ count }} </div>
</template>
<script>
	export default {
		methods: {
			increment () {
				this.$store.commit(increment);
				this.$store.dispatch(incrementAsync);
			}
		}
	}
</script>
```