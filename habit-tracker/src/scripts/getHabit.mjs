//Parse the page url, find product[s] with certain param
export default function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const habitProperty = urlParams.get(param);

    return habitProperty;
}