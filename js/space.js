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
};

// const search = document.getElementById("inputBuscar");
const buttomBuscar = document.getElementById("btnBuscar");


buttomBuscar.addEventListener("click", (e) => {
    const search = document.getElementById("inputBuscar");

    getImages(search.value).then(items => loadImages(items));
});

const getImages = (search) => {
    return getJSONData(`${API_URL}${searchURL}${search}`);
};

const loadImages = (data) => {

    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    console.log(Array.from(data));
    for (let item of Array.from(data)) {

        contenedor.innerHTML += `
        <div class="card">
            <div>
            <img src="${item.links[0].href}"/>
            </div>
                <div>
                    <h4>${item.data[0].title}</h4>
                    <p>${item.data[0].description}</p>
                    <p>${item.data[0].date_created}</p>
                    </div>
                
        </div>
        `
    }
};

