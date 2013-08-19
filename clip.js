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
