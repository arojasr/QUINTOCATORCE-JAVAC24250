/*// Fetch
// al no cargar el segundo parametro por defecto hacemos una peticion GET

fetch("https://fakestoreapi.com/products/1")
// El primer .then recibe la cadena string (json) y la predispone a transformar a objeto 
// .then recibe como parametro una funcion con su propio parametro
.then(function(respuesta){
//transformamos el json en objeto
return respuesta.json();
})
.then(function(datos){
console.log(datos.title, datos.image, datos.price, datos.category);
})
.catch(function(error){
    console.error(error);
})
*/
// Declaramos una función que renderiza elementos en el DOM
function eliminar_caracter(texto,caracter){
    let tiene=true;
    while(tiene==true){
        if(texto.indexOf(caracter)!=-1){
            texto=texto.replace(caracter,"");
        }else tiene=false;
    }
    return texto;
}
function eliminar_lista_caracteres(texto,lista){
    for (let i = 0; i < lista.length; i++) {
        texto=eliminar_caracter(texto,lista[i]);
    }
    return texto;
}
function checkIfHasJpg(url){
    let texto=url.split(".");
    const extension=texto[texto.length-1];
    console.log(extension);
    if(extension=="jpg"||extension=="jpeg"||extension=="png"||extension=="jift"||extension=="webp"){
        // console.log("verdad--------------------------------");
        return true;
    }
    return false;
}
function pedirDatos(){
    // fetch("https://fakestoreapi.com/products")
    fetch("https://api.escuelajs.co/api/v1/products")
    .then(function(respuesta){
        return respuesta.json();
    })
    .then(function(productos){
        // Traemos el espacio de renderizado
        const contenedor = document.getElementById("container_products");

        // Utilizamos un for-each
        productos.forEach(function(dato){

            let texto=dato.images[0];
            texto=eliminar_lista_caracteres(texto,["'",'"',"[","]"]);
            console.log(texto);
            if(checkIfHasJpg(texto)){
                //Creamos el elemento html
                const article = document.createElement('div');
                //Agregamos estilo a article
                article.classList.add("product");
                //Inyectamos contenido a <article>
                // console.log(dato);
                // <img src="${dato.image}" alt="Imagen del producto ${dato.title}" class="product_img" width="300" height="300">
                // <h2 class="title_category">Categoria:${dato.category}</h3>
                article.innerHTML = `
                <img src="${texto}" alt="Imagen del producto ${dato.title}" class="product_img" width="300" height="300">
                <div class="product_description">
                        <h3 class="title_product">${dato.title}</h3>
                        <h2 class="title_category">Categoria:${dato.category.name}</h3>
                        <span class="price_product">${dato.price}</span>
                </div>
                <i class="product_icon fa-solid fa-cart-plus"></i>
                `
                //Adjuntamos el contenido 
                contenedor.appendChild(article);    
            }
        })

    })
    .catch(function(error){
        console.error(error);
    })
}

// Llamamos a la función
pedirDatos();