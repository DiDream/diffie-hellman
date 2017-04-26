'use strict'
$('.box-result').on('click',function(){
    $('body').addClass('modal-open');
    var op = $(this).attr('id').split('-')[0];
    $(`#${op}-operations`).addClass('open')
});
$('.modal-close').on('click',function(){
    $('body').removeClass('modal-open');
    $(this).parent().find('.operations.open').removeClass('open');
});


function calculateKeys(e){
    e.preventDefault()
    var xa = Number($('#xa-key').val() );
    var xb = Number($('#xb-key').val() );
    var alpha = Number($('#alpha').val() );
    var prime = Number($('#prime').val() );

    var dh = new DiffieHellman({
        alpha,
        prime,
        xs: [xa,xb]
    });
    var operations = dh.output;
    console.log(operations);

    //Imprimir valores Y y K no zs
    for(var i=0; i<2; i++){
        $(`#y${i}-operations`).html( operationsDiffieHellman(operations.ys[i].logs));
        $(`#k${i}-operations`).html( operationsDiffieHellman(operations.ks[i].logs));
        $(`#y${i}-value`).text(operations.ys[i].value);
        $(`#k${i}-value`).text(operations.ks[i].value);
    }

}
