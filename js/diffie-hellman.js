Number.prototype.isOdd= function(){
    return this%2 != 0;
}

function fastExponentiation(base, b, m){ //  base=> base de exponent, b=> exponente, m=> modulo
    //console.log(base,b,m);
    var x = 1;
    var y = base%m;
    var logs = [];
    logs.push({y,b,x})
    while(b>0 && y>1){

        if(b.isOdd()){
            x = (x*y)% m;
            b--;
            logs.push({y:'',b,x})
        }else {
            y= (y*y)%m;
            b/=2;
            logs.push({y,b,x:''})
        }

    }
    return {logs, value: x};
}

class DiffieHellman {
    /*
    var val= {
        alpha: 0,
        prime: 0,
        xs: []
    }
    */
    constructor(val) {
        if(!(val.xs instanceof Array) ) {
            throw 'Error en la asignación de claves';
        }
        this.parties = val.xs.length;
        this.xs = val.xs;
        this.alpha = val.alpha;
        this.prime = val.prime;
        var ys = new Array(this.parties);
        var alpha = val.alpha;
        var prime = val.prime;


    // Calcular valores Y
        for(var i=0; i<this.parties; i++){
            ys[i] = fastExponentiation(alpha, this.xs[i],prime);
        }

    //Calcular valores intermedios Z (si se puede)
        var zs = [];
        var tmp = ys;
        for(var i=2; i<this.parties; i++){
            tmp = this.passKeys(tmp);
            zs.push(tmp);
        }

    //Calcular valores K

        var ks = this.passKeys(tmp);
        this.log = { ys,zs,ks};
    }
    passKeys(z){
        var res = new Array(this.parties);

        for(var i=1; i<this.parties; i++){
            res[i]= fastExponentiation(z[i-1].value, this.xs[i], this.prime );
        }
        res[0] = fastExponentiation(z[this.parties-1].value ,this.xs[0], this.prime)
        return res;
    }
    get output(){
        return this.log;
    }
}
