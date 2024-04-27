const urlApi = "https://jsonplaceholder.typicode.com/photos";

const getData = async (url) => {
    let code;
    try {
        let response = await fetch(url);
        console.log(response)
        if (response.status == 200) {
            let data = await response.json();
            return { code: 200, data };
        } else {
            code = response.status;
            throw new Error("Ha fallado el llamado a la API.");
        }

    } catch (error) {
        return { code, message: error };
    }
}

const listadoAlbum = (listado) => {
    let elementoLista = "";

    // listado.forEach(album => {
    //     elementoLista += `<li class="py-2">Album ${album.id} - Título: <strong>${album.title}</strong></li>`
    // });
    // document.getElementById("tituloAlbums").innerHTML = elementoLista;

    listado.slice(0, 20).forEach(album => {
        elementoLista += `<li class="py-2">Album ${album.id} - Título: <strong>${album.title}</strong></li>`;
    });
    document.getElementById("tituloAlbums").innerHTML = elementoLista;

}

const generarRetardo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Información enviada.")
        }, 3000)
    })
}

let intentos = 1;
const main = async () => {
    let parrafoResultado = document.getElementById("resultadoApi");
    parrafoResultado.innerText = "Consultando a la API."

    if (intentos > 1) {
        parrafoResultado.innerText += ` - Reintentando ${intentos}`
    }

    let mensajeRetardo = await generarRetardo();
    parrafoResultado.innerText = mensajeRetardo;

    setTimeout(async () => {
        let datos = await getData(urlApi);
        if (datos.code == 200) {
            let data = datos.data;
            // parrafoResultado.innerHTML = "Información enviada";
            listadoAlbum(data);
        } else {
            parrafoResultado.innerText = datos.message;
            intentos++;
            main();
        }
    }, 2500)
}

main();