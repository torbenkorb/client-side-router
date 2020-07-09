export const escapeHTML = str => str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
}[tag] || tag));


export const elt = (type, props) => {
    const dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    return dom;
};
