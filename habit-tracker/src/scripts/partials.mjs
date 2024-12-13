import getParam from "./getHabit.mjs";

export async function renderWithTemplate(template, parentElement, data, callback, position = "afterbegin", clear = true) {
    if (clear) {
        parentElement.innerHTML = "";
    }
    let htmlString;
    try {
        htmlString = await template(data);
    } catch (err) {
        console.log(err);
    }

    parentElement.insertAdjacentHTML(position, htmlString);
    if (callback) {
        callback(data);
    }
}

function loadTemplate(path) {
    return async function () {
        const res = await fetch(path);
        if (res.ok) {
            const html = await res.text();
            return html;
        }
    };
}

//header and footer
export async function loadHeaderFooter() {
    const headerTemplateFn = loadTemplate("/partials/header.html");
    const footerTemplateFn = loadTemplate("/partials/footer.html");
    const loginTemplateFn = loadTemplate("/partials/login.html");
    const signupTemplateFn = loadTemplate("/partials/signup.html");

    const parentElH = document.querySelector('#main-header');
    const parentElF = document.querySelector('#main-footer');
    const parentElL = document.querySelector('#login-modal');
    const parentElS = document.querySelector('#signup-modal');

    try {
        await renderWithTemplate(headerTemplateFn, parentElH);
        await renderWithTemplate(footerTemplateFn, parentElF);
        await renderWithTemplate(loginTemplateFn, parentElL);
        await renderWithTemplate(signupTemplateFn, parentElS);
    } catch (err) {
        console.log(err);
    }
}