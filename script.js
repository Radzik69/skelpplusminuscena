async function getProducts() {
    const body = document.getElementById("body")

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
            console.log(data);

            for (let i in data) {
                const div = document.createElement("div")
                div.setAttribute("id", `${i}`)
                div.setAttribute("class", "produkt")
                div.style.display = "inline-block"
                body.appendChild(div)

                const name = document.createElement("label")
                name.innerHTML = data[i].name
                div.appendChild(name)

                const paragraf1 = document.createElement("p")
                div.appendChild(paragraf1)

                const price = document.createElement("label")
                price.innerHTML = data[i].price
                div.appendChild(price)

                const paragraf2 = document.createElement("p")
                div.appendChild(paragraf2)

                const minusPrice = document.createElement("button")
                minusPrice.setAttribute("class", "minusPrice")
                minusPrice.innerText = "-10"
                minusPrice.setAttribute("onclick", "minusPrice()")
                div.appendChild(minusPrice)

                const plusPrice = document.createElement("button")
                plusPrice.setAttribute("class", "plusPrice")
                plusPrice.innerText = "+10"
                plusPrice.setAttribute("onclick", "plusPrice()")
                div.appendChild(plusPrice)


            }









        })
        .catch(error => {
            console.error(error);
        });


}

//dodac funkcje  linia 46 i linia 52




getProducts()