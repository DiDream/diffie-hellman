function calculateKeys(e){
    e.preventDefault()
    var xa = Number($('#xa-key').val() );
    var xb = Number($('#xb-key').val() );
    var alpha = Number($('#alpha').val() );
    var prime = Number($('#prime').val() );
    console.log(xa,xb,alpha, prime);
    console.log(DiffieHellman.calculate(prime,alpha,xa,xb));
}
