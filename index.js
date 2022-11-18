
let quotesElement = document.getElementById("quotes");
let loaderElement = document.getElementById("loader");

let showLoader = () => { loaderElement.style.opacity = 1 };
let hideLoader = () => { loaderElement.style.opacity = 0 };

async function fetchQuotes() {

    let random = Math.floor(Math.random() * 200);
    //Get a random list of 10 quotes
    let quoteList = await fetch(`https://quotable.io/quotes?page=${random}&limit=10`);

        if(!quoteList.ok) {
            throw new Error(`Data could not be loaded: ${quoteList.status}`)
        }

        quoteList = await quoteList.json();

    //Create quote elements and add them to #quotes div.
    quoteList.results.forEach(quote => {
        quoteElement = document.createElement("blockquote");
        quoteElement.classList.add("quote");
        quoteElement.innerHTML = `
               ${quote.content}
                <footer><i>~ ${quote.author}</i></footer>`;
        quotesElement.appendChild(quoteElement);
    });

    hideLoader();
}

setTimeout(fetchQuotes,200);

window.addEventListener('scroll', () => {
    showLoader();
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
       setTimeout(fetchQuotes, 500); //to see the cute loader icon longer :)
    }
}, {
    passive: true
})