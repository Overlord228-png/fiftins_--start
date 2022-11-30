
let pole = document.querySelector(".pole")
let btn = document.querySelector(".btn")
let convaWin = document.querySelector("#conva")

/// для перемешівания пятнашек
btn.onclick = (e) => {
    /// Для рандома пятнашек
    function getRandom (e) {
        const poleArr = []
        ///console.log(Math.floor(Math.random() * max)); -> проверял метод Math.random на понимание
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
    }
    console.log(Math.random())
    ///console.log(1) -> проверка нажімаю ли я на кнопку
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
        // Проверка выиграл ли игрок
        function won(poleArr) {
            if (poleArr[poleArr.length - 1] !== "empty") return;
            for (let i = 0; i < poleArr.length - 1; i++){
                if (i + 1 == poleArr[i]){
                    continue;
                } else {
                    return false;
                }
            }
            return true;
        }
        // Анимация после победы
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#CC0013';
            ctx.font = '40pt Arial';
            ctx.fillText('Победа!', textX, 100, 300);
            ctx.fillStyle = 'red';
            ctx.strokeText('Победа!', textX, 100, 300);
        
            // 3 - move the shapes
            textX = textX + speed;
            if((textX + 300 > canvas.width) || (textX <= 0)){
                speed = -speed;
            }
        }
    }
}

