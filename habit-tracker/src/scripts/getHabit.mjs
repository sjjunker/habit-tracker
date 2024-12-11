//Parse the page url, find product[s] with certain param
export default function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let habitProperty = urlParams.get(param);

    //get the array if the parmeter is completed
    if (param == "completed") {
        habitProperty = JSON.parse(habitProperty);
    }

    return habitProperty;
}