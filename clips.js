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
 
(function($){
 
  var template={};
  
  template.parse=function(id,data){
  
    this.cache = this.cache||{};
    
    this.run=function(id,data){
       
          $id=$('#'+id);
    $id.hide();
      
      if(this.cache[id]){

        html=this.cache[id]['phtml'];
        fun=this.cache[id]['fun'];
      } else {
        html=$id.html();
         fun=this.tmpl(html);
        this.cache[id]={};
       this.cache[id]['fun']= fun;
        this.cache[id]['ohtml']=html;
      }

      this.fun=fun;
      
      ret=this.loop(data);
     
      if(ret==''){

       ret=this.fun(data);

      }

      
      this.cache[id]['phtml']=ret;
    $id.html(ret);
    $id.show();

    }
    
    this.loop=function(sdata){
      var ret='';
      var newobj=sdata;
      for(var k in sdata){
       // array, string, function 
       // if(typeof data[k]=='object'){
        if( Object.prototype.toString.call( sdata[k] ) === '[object Array]' ) {  // array
          
          var newk =k.substring(0, k.length - 1);
          
          //console.log(k);
          for(var i in sdata[k]){
           var loopval= sdata[k][i];
           //console.log(loopval);
            newobj['index']=i;
            newobj[newk]=loopval; 
           // console.log(newobj);
           ret+=this.fun(newobj);
           // console.log(ret);
            
          }
          delete sdata[newk]; delete sdata['index'];
        } else {
          
        }
      }
      delete newobj;
      return ret;
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

})(jQuery);
