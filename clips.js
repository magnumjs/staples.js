// http://jsbin.com/ozebIvu/2/edit
//////////////////////////////////
//ClipsJS
//////////////////////////////////

/**!
 * MagnumJS - ClipsJS Template Factory v0.1
 * https://github.com/magnumjs
 *
 * @description Fast simple Html template to javascript function cache
 * Includes Staples.js
 * https://github.com/magnumjs/staples.js/clips.js
 *
 * Copyright (c) 2013 Michael GLazer 
 * Released under the MIT license
 * https://github.com/magnumjs/mag.js/blob/master/LICENSE
 *
 * Date: 2013-08-19T13:48Z
 */
 
$(function(){
 
  var template={};
  
  template.parse=function(id,data){
  
    var cache = {};
    
    this.run=function(id,data){
       
    $id=$('#'+id);
    $id.hide();
    ret=this.tmpl($id.html(), data);
    ret2=this.tmpl($id.html());
   console.log(ret2);   
    $id.html(ret);
    $id.show();

    }
    
    this.loop=function(data){
      for(var k in data){
       // array, string, function 
      }
    }
 
  this.tmpl = function(str,/* optional to execute against or just returns a fun str */ data){
   
    var fn = new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
                      
        "with(obj){p.push('" +
       
         str
          .replace(/[\r\t\n]/g, " ")
          .split("[[").join("\tp.push(")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("]]").join(");p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
  
 return data ? fn( data ) : fn;
  };
   this.run(id,data);
};
  
  var data={
    test:'Yo!',
    users:[{name:'m'},{name:'g'}],
    isOld:function(){return true;},
    other:{
    more:'hmm' 
  }
  };
  
template.parse('map', data);
 
});
