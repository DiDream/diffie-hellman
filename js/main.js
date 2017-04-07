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

    var operations = DiffieHellman.calculate(prime,alpha,xa,xb);

    $('.operations').each(function(){
        var key = $(this).attr('id').split('-')[0];
        $(this).html( operationsDiffieHelmman(operations[key].slice(0,-1)) );
        $(`#${key}-value`).text(operations[key].last());
    });
}
