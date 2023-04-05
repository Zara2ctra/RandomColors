const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'enter') {
        setRandomColors();
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClick(event.target.textContent)
    }
})

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}

function copyToClick(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors() {
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = generateRandomColor();
        const contrast = function (color) {
            let hexColor = color.slice(1)

            let r = parseInt((hexColor.slice(0, 2)), 16);
            let g = parseInt((hexColor.slice(2, 4)), 16);
            let b = parseInt((hexColor.slice(4, 6)), 16);
            let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return ((yiq >= 128) ? 'black' : 'white');
        }

        if (isLocked) {
            return
        }

        text.textContent = color;
        col.style.background = color;


        text.style.color = contrast(color);
        button.style.color = contrast(color);
    })

}


setRandomColors();