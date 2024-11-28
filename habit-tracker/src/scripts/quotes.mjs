const quotesApi = "https://api.api-ninjas.com/v1/quotes";

export default async function displayQuote() {
    const quote = await getapi();
    console.log(quote[0]);

    //render quote
    const quoteH2 = document.getElementById("inspirational-quote");
    quoteH2.innerHTML = `${quote[0].quote}     -${quote[0].author}`;
}

//Get the data
async function getapi() {
    const response = await fetch(quotesApi, {
        headers: {
            'X-Api-Key': 'M0JCqV2MfwEn/+5crY1a3w==CZJXw7NwxnnfgORz'
        }
    });
    var data = await response.json();
    return data;
}