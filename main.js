
let pole = document.querySelector(".pole")
let btn = document.querySelector(".btn")

btn.onclick = (e) => {
    /// Для рандома пятнашек
    function createField(e) {
        const mainArr = []
        document.querySelector(".pole");
        for (let i = 1; i < e*e; i++){
            mainArr.push(i);
        }
    }
    console.log(1)
}

pole.onmousedown = (e) => {
    if (e.target.className == 'block') {
        const block = e.target
        let success = false;

        for(let i = 0; i < pole.children.length ; i++){

            if(pole.children[i].className == 'block__0'){

                let leftBlock = pole.children[i-1] 
                let rightBlock = pole.children[i+1]
                let topBlock = pole.children[i-4]
                let bottomBlock = pole.children[i+4]

                if (leftBlock == block || rightBlock == block || bottomBlock == block || topBlock == block){
                    success = true;
                } else {
                    success = false;
                    break;
                }
            }
        }

        if (success) {
            const emptyBlock = document.createElement('div');
            emptyBlock.className = 'empty';
            block.before(emptyBlock)
            block.style.position = "absolute";

            document.body.append(block);
            block.style.top = e.pageY - block.offsetWidth / 2 + 'px';
            block.style.left = e.pageX - block.offsetWidth / 2 + 'px';

            document.onmousemove = function (e) {
                block.style.top = e.pageY - block.offsetWidth / 2 + 'px';
                block.style.left = e.pageX - block.offsetWidth / 2 + 'px';
            }

            block.onmouseup = function (e) {
                
                block.style.display = 'none';
                const finishBlock = document.elementFromPoint(e.pageX, e.pageY)
                block.style.display = 'flex';
                console.log(finishBlock);

                if(finishBlock.className == 'block__0') {
                    block.style.position = '';
                    finishBlock.before(block)
                    const empty = document.querySelector('.empty');
                    empty.before(finishBlock)
                    empty.remove()
                    console.log('block')
                } else {
                    const empty = document.querySelector('.empty');
                    empty.before(block);
                    block.style.position = '';
                    empty.remove();
                    console.log('back')
                }
                
                document.onmousemove = null;
                block.onmouseup = null;
            }
        }
    }
}

