/*
let pole = document.querySelector(".pole")
let block0 = document.querySelector(".block__0")

pole.onmousedown = (e) => {
    if (e.target.className == 'block') {
        const block = e.target
        block.style.position = "absolute";
        
        document.onmousemove = function (e) {
            block.style.top = e.pageY + 'px'
            block.style.left = e.pageX + 'px'
        }
        block.onmouseup = function (e) {
            block.hidden = true;
            block0 = document.elementFromPoint(e.pageX, e.pageY)
            block.hidden = false;
            if(blockFinish.className != 'block__0') {
                const empty = document.querySelector('.empty');
                empty.before(block);
                block.style.position = '';
                empty.remove();
            }
        }
    }
}
*/


/*
let pole = document.querySelector(".pole")
let block0 = document.querySelector(".block__0")

pole.onmousedown = (e) => {
    if (e.target.className == 'block') {
        const block = e.target
        block.style.position = "absolute";
        document.onmousemove = function (e) {}
        block.onmouseup = function (e) {}
    }
}

*/
























