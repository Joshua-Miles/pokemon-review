const tagNames = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "pre",
    "progress",
    "q",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr"
  ]

tagNames.forEach(function(tagName){
    window[tagName] = function(...args){
        const element = document.createElement(tagName)
        let innerText, children, attributes;
        
        if(typeof args[0] == 'string') [ innerText, ...args ] = args

        if(args[0] && args[0].__proto__ === Object.prototype) [ attributes, ...children ] = args
        else children = args

        if(innerText) element.innerText = innerText
        if(attributes){
            for(let attributeName in attributes){
                let attribute = attributes[attributeName]
                if(typeof attribute == 'function'){
                    element.addEventListener(attributeName, attribute)
                } else {
                    element.setAttribute(attributeName, attribute)
                }
            }
        }

        children.forEach(function(child){
            element.append(child)
        })
        return element
    }
})

// Usage: 

div({ class: 'container'}, 
    h1('Hello World'),
    p(`
        With a little creativity, we can facilitate
        any syntax we desire with JavaScripts powerful
        abstraction mechanics...
    `),
    button('Red Pill', {
        click: function(){
            alert('Oh Yeeeeaaaaah.')
        }
    }),
    button('Blue Pill', {
        click: function(){
            alert('T_T')
        }
    })
)