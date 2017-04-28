'use strict'
var ALFABETO = ['a','b','c','d','e','f','g','h','i','j'];
$('#parties').on('click','.box-result',function(){
    $('body').addClass('modal-open');
    var op = $(this).attr('id').split('-')[0];
    $(`#${op}-operations`).addClass('open')
});
$('.modal-close').on('click',function(){
    $('body').removeClass('modal-open');
    $(this).parent().find('.operations.open').removeClass('open');
});
$('#parties-number').on('change',function(){
    generatePersons($(this).val() );

});
$('#parties').on('click','.x-key',function(){
    $(this).find('.symbol').addClass('sub');
    $(this).find('input').focus();
});
$('#parties').on('focus','input',function(){
    $(this).parent().find('.symbol').addClass('sub');
});

(function(){
    generatePersons($('#parties-number').val() );
})();


function generatePersons(n){
    var partiesHTML = $('#parties');
    partiesHTML.html('');
    for(var i=0; i<n; i++){
        partiesHTML.append(addPerson(i));
    }
}
function addResultKey(key, subIndex,i){

    return `<div class="key ${key}-key key-result">
                <div class="symbol">
                    <span class="base">${key.toUpperCase()}</span><span clas="sub">${subIndex}</span>
                </div>
                <div class="box box-result" id="${key}${i}-value"></div>
            </div>`;
}
function addPerson(i){
    return `<section class="person" id="person-${i}">
                <div class="person-icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div class="diffie-hellman">
                  <div class="key x-key">
                    <div class="symbol">
                        <span class="base">X</span><span clas="sub">${ALFABETO[i]}</span>
                    </div>
                    <input class="box input-box" type="text" id="x${i}-key" pattern="[0-9]+" required="true">
                  </div>
                  ${addResultKey('y',ALFABETO[i],i)}
                  ${addResultKey('k',ALFABETO[i],i)}
                </div>
            </section>`;
}
function calculateKeys(e){
    e.preventDefault()
    var xs=[];
    $('.x-key input').each(function(){
        xs.push(Number($(this).val()));
    });

    var dh = new DiffieHellman({
        alpha: Number($('#alpha').val() ),
        prime: Number($('#prime').val() ),
        xs
    });
    var operations = dh.output;
    console.log(operations);

    // Imprimir resultados
    // Para ver las operaciones hacer click en el cuadro del valor de la clave
        // correspondiente, y se abrira en popup
    $('.key-result').find('.symbol').addClass('sub');
    $('.key-operations').html('');
    for(var i=0; i<xs.length; i++){
        $('.key-operations').append(`
            <div class="operations" id="y${i}-operations">
                ${operationsDiffieHellman(operations.ys[i].logs)}
            </div>
            <div class="operations" id="k${i}-operations">
                ${operationsDiffieHellman(operations.ks[i].logs)}
            </div>`);
        $(`#y${i}-value`).text(operations.ys[i].value);
        $(`#k${i}-value`).text(operations.ks[i].value);
    }

}
