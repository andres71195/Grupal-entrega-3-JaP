const API_URL = "https://images-api.nasa.gov/";
const searchURL = "search?q=";

const getJSONData = async (url) => {
    // debugger;
    const result = {};
    try {
        const response = await fetch(url);
        if (response.ok) {
            result.data = await response.json();
            result.status = "ok";
        } else {
            throw Error(response.statusText);
        }
    }
    catch (error) {
        result.status = 'error';
        result.data = error;
    }
    return result.data.collection.items;
}

// const search = document.getElementById("inputBuscar");
const buttomBuscar = document.getElementById("btnBuscar");


buttomBuscar.addEventListener("click", (e) => {
    const search = document.getElementById("inputBuscar");
    getImages(search.value).then(items => loadImages(items));
})
const getImages = (search) => {
    return getJSONData(`${API_URL}${searchURL}${search.value}`);
}

const loadImages = (data) => {
    console.log("Hola");
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    console.log(data);
    for (let objeto of Array.from(data)) {

        console.log("Hola");
        contenedor.innerHTML += `<div class="card">
        <img src="${objeto.href}" />
        <h3>${objeto.title}</h3>
        
    </div>`
    }
}

// const getCardHTML = (objeto) => {

//     return `<div class="card">
//       <img src="${objeto.href}" />
//       <h3>${objeto.title}</h3>
      
//   </div>`;
// };

