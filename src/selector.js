/*
** @lib: Simple DOM Selector
** @usage: $(args), selecting JavaScript code should be under main DOM html, just before </body>
** args format supported: tagName#id, tagName.class, tagName, #id, .class
** return: Array [element0, element1 ...]
** @author: willizm.cn@gmail.com
*/
var $ = function (selector) {
    "use strict";
    // Check args
    if (!/^[\-\w]*(#|\.)?[\-\w]*$/i.test(selector) || !selector) { return null; }
    
    // Add Array.prototype.indexOf method for lte IE8
    if (!(Array.prototype.indexOf instanceof Function)) {
        Array.prototype.indexOf = function(sth) {
            for (var i = 0; i < this.length; i++) {
                if (sth == this[i]) {
                    return i;
                }
            }
        }
    }
    
    var tag = {
        "name": "",
        "className": "",
        "id": ""
    },
        elements = [],//element collection for deep selecting
        els = [],//element collection for return
        selstr = selector.toString();
    
    if (selstr.indexOf("#") >= 0) {
        tag.name = selstr.split("#")[0];
        tag.id =  selstr.split("#")[1];
    } else if (selstr.indexOf(".") >= 0) {
        tag.name = selstr.split(".")[0];
        tag.className = selstr.split(".")[1];
    } else {
        tag.name = selstr;
    }
    
    elements = (tag.name) ? (document.getElementsByTagName(tag.name)) : (document.all);
    
    if (tag.className) {
        for (var i in elements) {
            var el = elements[i];
            if (el.className) {
                var classes = (el.className).split(" ");
                if (classes.indexOf(tag.className) >= 0) {
                    els.push(el);
                }
            }
        }
    } else if (tag.id) {
        els[0] = document.getElementById(tag.id);
    } else {
        els = document.getElementsByTagName(tag.name);
    }
    console.log(this);
    return els;
}