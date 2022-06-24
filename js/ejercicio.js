const cargarDatos=()=>{
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
    .then(response=>response.text())
    .then(data=>{
        const parser = new DOMParser();
        const xml= parser.parseFromString(data, "application/xml");
        let escritores=xml.getElementsByTagName("escritor");
        for (let escritor of escritores) {
            let nombre=escritor.getElementsByTagName('nombre')[0].textContent;
            let valor=escritor.getElementsByTagName('id')[0].textContent;

            let plantilla=`
                <option value="${valor}">${nombre}</option>
            `
            document.querySelector('div.input-group > select').innerHTML+=plantilla;
        }
    })
    .catch(console.error);
}

window.addEventListener('DOMContentLoaded',(event)=>{
    cargarDatos();
});

let select = document.querySelector('div.input-group > select');
select.addEventListener('change', function() {
    fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
        .then(response => response.json())
        .then(data => {                
            let frases = data["frases"];
            document.getElementById('frases').innerHTML = '';
            frases.filter(frase => frase['id_autor'] == select.value)
                .forEach(frase => {
                    let texto = frase['texto'];                        
                    let autor = this.options[select.selectedIndex].text;
                    let plantilla = `<div class="col-lg-3">
                                    <div class="test-inner ">
                                        <div class="test-author-thumb d-flex">
                                            <div class="test-author-info">
                                                <h4>${autor}</h4>                                            
                                            </div>
                                        </div>
                                        <span>${texto}</span>
                                        <i class="fa fa-quote-right"></i>
                                    </div>
                                </div>`;
                    document.getElementById('frases').innerHTML += plantilla;
                });
        }).catch(console.error);
});