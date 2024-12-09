//Parse the page url, find product[s] with certain param
export default function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let habitProperty = urlParams.get(param);

    //get the array if the parmeter is completed
    if (param == "completed") {

        console.log(habitProperty);
        habitProperty = JSON.parse(habitProperty);
        console.log(habitProperty);
    }

    return habitProperty;
}