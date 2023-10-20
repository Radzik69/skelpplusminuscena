var dataShop
const body = document.getElementById("body")


async function getProducts() {


    const url = 'http://localhost/wordpress/wp-json/wc/v3/products/';
    const username = 'Radzik';
    const password = '1qaz2wsx';

    const headers = new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    await fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            dataShop = data
            console.log(dataShop)
            divProducts()
            createProducts()
        })
        .catch(error => {
            console.error(error);
        });




}

function divProducts() {

    for (let i in dataShop) {
        const div = document.createElement("div")
        div.setAttribute("id", `${i}`)
        div.setAttribute("class", "produkt")
        div.style.display = "inline-block"
        body.appendChild(div)

        const name = document.createElement("label")
        name.innerHTML = dataShop[i].name
        div.appendChild(name)

        const paragraf1 = document.createElement("p")
        div.appendChild(paragraf1)

        const price = document.createElement("label")
        price.innerHTML = dataShop[i].regular_price
        div.appendChild(price)

        const paragraf2 = document.createElement("p")
        div.appendChild(paragraf2)

        const minusPrice = document.createElement("button")
        minusPrice.setAttribute("class", "minusPrice")
        minusPrice.innerText = "-10"
        minusPrice.addEventListener("click", () => {
            substractPrice(i, dataShop)
            minusPrice.setAttribute("hidden", "true")
            plusPrice.setAttribute("hidden", "true")
        })
        div.appendChild(minusPrice)

        const plusPrice = document.createElement("button")
        plusPrice.setAttribute("class", "plusPrice")
        plusPrice.innerText = "+10"

        plusPrice.addEventListener("click", () => {
            addPrice(i, dataShop)
            plusPrice.setAttribute("hidden", "true")
            minusPrice.setAttribute("hidden", "true")
        })
        div.appendChild(plusPrice)
    }

}

function createProducts() {
    const createProduct = document.createElement("div")
    createProduct.setAttribute("id", "createProductDiv")
    createProduct.style.display = "inline-block"
    body.appendChild(createProduct)

    const nameProduct = document.createElement("input")
    nameProduct.setAttribute("type", "text")
    nameProduct.setAttribute("id", "createProductName")
    nameProduct.setAttribute("placeholder", "nazwa nowego produktu")
    createProduct.appendChild(nameProduct)

    const paragraf1 = document.createElement("p")
    createProduct.appendChild(paragraf1)

    const priceProduct = document.createElement("input")
    priceProduct.setAttribute("type", "number")
    priceProduct.setAttribute("id", "createProductPrice")
    priceProduct.setAttribute("placeholder", "cena nowego produktu")
    createProduct.appendChild(priceProduct)

    const sendProduct = document.createElement("button")
    sendProduct.setAttribute("id", "sendProduct")
    sendProduct.setAttribute("onclick", "sendProductIf()")
    sendProduct.innerText = "Stworz Produkt"
    createProduct.appendChild(sendProduct)



}

function sendProductIf() {
    if (document.getElementById("createProductName").value != 0 && document.getElementById("createProductPrice").value != 0) {
        document.getElementById("sendProduct").setAttribute("onmouseout", "createProductSend()")

    }
}

async function substractPrice(i, dataShop) {
    const url = `http://localhost/wordpress/wp-json/wc/v3/products/${dataShop[i].id}`;
    const username = 'Radzik';
    const password = '1qaz2wsx';

    const headers = new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json',
    });
    var newPrice = parseInt(dataShop[i].regular_price) - 10
    console.log("WAIT   " + newPrice)
    const jsonData = {
        regular_price: `${newPrice}`
    }


    await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(jsonData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            getProducts()
            console.log("UPDATED   " + responseData.regular_price)
            body.innerHTML = ""

        })
        .catch(error => {
            console.error(error);
        });

}

async function addPrice(i, dataShop) {

    const url = `http://localhost/wordpress/wp-json/wc/v3/products/${dataShop[i].id}`;
    const username = 'Radzik';
    const password = '1qaz2wsx';

    const headers = new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json',
    });
    var newPrice = parseInt(dataShop[i].regular_price) + 10
    console.log("WAIT   " + newPrice)
    const jsonData = {
        regular_price: `${newPrice}`
    }


    await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(jsonData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            getProducts()
            console.log("UPDATED   " + responseData.regular_price)
            body.innerHTML = ""

        })
        .catch(error => {
            console.error(error);
        });


}


async function createProductSend() {
    

    const productName = document.getElementById("createProductName").value
    console.log("Name = " + productName)
    const productPrice = document.getElementById("createProductPrice").value
    console.log("Price = " + productPrice)
    

    const url = `http://localhost/wordpress/wp-json/wc/v3/products/`;
    const username = 'Radzik';
    const password = '1qaz2wsx';

    const headers = new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json',
    });

    const newProductData = {
        name: productName,
        regular_price: productPrice,
      };

    await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newProductData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            //zwrot od serwera co ma sie potem wykoonac
            body.innerHTML = ""
            getProducts()
            createProducts()
            console.log("NOWY PRODUKT:    "+responseData)
        })
        .catch(error => {
            console.error(error);
        });


    
    document.getElementById("createProductDiv").remove()
}



getProducts()