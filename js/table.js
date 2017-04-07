function operationsDiffieHelmman(op){
    var result =
    `<table>
        <thead>
            <tr>
                <th> Y </th>
                <th> B </th>
                <th> X </th>
            <tr>
        </thead>
        <tbody>`;
    for(var i=0; i<op.length; i++){
        result += `<tr>
                        <td>${op[i].y}</td>
                        <td>${op[i].b}</td>
                        <td>${op[i].x}</td>
                    </tr>`;
    }
    result += `</tbody>
        </table>`;
    return result;
}
