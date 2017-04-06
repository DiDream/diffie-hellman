Number.prototype.isOdd= function(){
    return this%2 != 0;
}
function fastExponentiation(base, exp, m){
    console.log(base, exp, m);
    var x = 1;
    var y = base%m;
    while(exp>0 && y>1){

        if(exp.isOdd()){
            x = (x*y)% m;
            exp--;
        }else {
            y= (y*y)%m;
            exp/=2;
        }
    }
    return x;
}

class DiffieHellman {
    static calculate(prime,alpha,xa, xb){
        var ya = fastExponentiation(alpha,xa,prime),
            yb = fastExponentiation(alpha,xb,prime),
            k = fastExponentiation(ya,xb,prime);
        return {ya,yb,k }
    }
}
