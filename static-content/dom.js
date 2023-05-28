export function createElement(tag, attrs, ...children) {
    const element = document.createElement(tag)
    if(attrs) Object.entries(attrs).forEach(([attr, value]) => element.setAttribute(attr, value))
    if(children) children.forEach(child => child ? element.appendChild(typeof child != "object" ? text(child) : child) : null)
    return element
}

export function text(text) {
    return document.createTextNode(text)
}

export function h1(attrs, ...children) {
    return createElement("h1", attrs, ...children)
}

export function h2(attrs, ...children) {
    return createElement("h2", attrs, ...children)
}

export function h3(attrs, ...children) {
    return createElement("h3", attrs, ...children)
}

export function h4(attrs, ...children) {
    return createElement("h4", attrs, ...children)
}

export function h5(attrs, ...children) {
    return createElement("h5", attrs, ...children)
}

export function h6(attrs, ...children) {
    return createElement("h6", attrs, ...children)
}

export function p(attrs, ...children) {
    return createElement("p", attrs, ...children)
}

export function a(attrs, ...children) {
    return createElement("a", attrs, ...children)
}

export function div(attrs, ...children) {
    return createElement("div", attrs, ...children)
}

export function img(attrs, ...children) {
    return createElement("img", attrs, ...children)
}

export function ul(attrs, ...children) {
    return createElement("ul", attrs, ...children)
}

export function li(attrs, ...children) {
    return createElement("li", attrs, ...children)
}

export function button(attrs, onClick, ...children) {
    const element = createElement("button", attrs, ...children)
    if(onClick) element.onclick = onClick
    return element
}

export function small(attrs, ...children) {
    return createElement("small", attrs, ...children)
}

export function form(attrs, ...children) {
    return createElement("form", attrs, ...children)
}

export function input(attrs, required = false) {
    if(required) attrs.required = true
    attrs.autocomplete = "off"
    return createElement("input", attrs)
}

export function span(attrs, ...children) {
    return createElement("span", attrs, ...children)
}

export function label(attrs, text) {
    const element = createElement("label", attrs)
    element.textContent = text
    return element
}

export function textarea(attrs) {
    return createElement("textarea", attrs)
}

export function icon(...icons) {
    const element = createElement("span")
    element.classList.add("icon", "fa", ...icons.map(c => "fa-" + c))
    return element
}