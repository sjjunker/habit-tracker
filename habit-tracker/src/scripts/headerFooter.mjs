export async function renderWithTemplate(template, parentElement, data, callback, position = "afterbegin", clear = true) {
    if (clear) {

        parentElement.innerHTML = "";
    }
    const htmlString = await template(data);
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

export function loadHeaderFooter() {
    const headerTemplateFn = loadTemplate("/partials/header.html");
    const footerTemplateFn = loadTemplate("/partials/footer.html");
    const parentElH = document.querySelector('#main-header');
    const parentElF = document.querySelector('#main-footer');
    renderWithTemplate(headerTemplateFn, parentElH);
    renderWithTemplate(footerTemplateFn, parentElF);
}