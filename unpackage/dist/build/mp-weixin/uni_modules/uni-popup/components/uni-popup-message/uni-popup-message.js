(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-popup/components/uni-popup-message/uni-popup-message"],{"2f4d":function(e,t,n){"use strict";n.r(t);var u=n("40ae"),i=n("8e31");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("9c5d");var o=n("f0c5"),s=Object(o["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],void 0);t["default"]=s.exports},"40ae":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){}));var u=function(){var e=this.$createElement;this._self._c},i=[]},"8e31":function(e,t,n){"use strict";n.r(t);var u=n("e4b2"),i=n.n(u);for(var a in u)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return u[e]}))}(a);t["default"]=i.a},"9c5d":function(e,t,n){"use strict";var u=n("e130"),i=n.n(u);i.a},e130:function(e,t,n){},e4b2:function(e,t,n){"use strict";var u=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(n("8ca7")),a={name:"uniPopupMessage",mixins:[i.default],props:{type:{type:String,default:"success"},message:{type:String,default:""},duration:{type:Number,default:3e3},maskShow:{type:Boolean,default:!1}},data:function(){return{}},created:function(){this.popup.maskShow=this.maskShow,this.popup.messageChild=this},methods:{timerClose:function(){var e=this;0!==this.duration&&(clearTimeout(this.timer),this.timer=setTimeout((function(){e.popup.close()}),this.duration))}}};t.default=a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-popup/components/uni-popup-message/uni-popup-message-create-component',
    {
        'uni_modules/uni-popup/components/uni-popup-message/uni-popup-message-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2f4d"))
        })
    },
    [['uni_modules/uni-popup/components/uni-popup-message/uni-popup-message-create-component']]
]);
