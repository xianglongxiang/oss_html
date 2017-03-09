//
define(function(){
    var add = function(x,y){
        return x + y;
    }
    var minus = function(x,y){
       return x - y;
    }
    return {
        add:add,
        minus:minus

    }
});