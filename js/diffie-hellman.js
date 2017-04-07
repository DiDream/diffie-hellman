Number.prototype.isOdd= function(){
    return this%2 != 0;
}
Array.prototype.last = function(){
    return this[this.length -1];
}
function fastExponentiation(base, b, m){
    console.log(base,b,m);
    var x = 1;
    var y = base%m;
    var result = [];
    result.push({y,b,x})
    while(b>0 && y>1){

        if(b.isOdd()){
            x = (x*y)% m;
            b--;
            result.push({y:'',b,x})
        }else {
            y= (y*y)%m;
            b/=2;
            result.push({y,b,x:''})
        }

    }
    result.push(x); //El resultado final estara al final del array que se retorne
    return result;
}

class DiffieHellman {
    static calculate(prime,alpha,xa, xb){
        var ya = fastExponentiation(alpha,xa,prime),
            yb = fastExponentiation(alpha,xb,prime),
            ka = fastExponentiation(yb.last() ,xa,prime),
            kb = fastExponentiation(ya.last() ,xb,prime);
        return {ya,yb,ka,kb}
    }
}
