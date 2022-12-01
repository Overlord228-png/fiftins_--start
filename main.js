
let pole = document.querySelector(".pole")
let btn = document.querySelector(".btn")
let convaWin = document.querySelector("#conva")

/// для перемешівания пятнашек
btn.onclick = (e) => {
    /// Для рандома пятнашек
    let getRandom = []
    for (let i = 0; i < 15; i++) {
        let randomNum = Math.round(1 - 0.5 + Math.random() * (15 - 1 + 1));
        if(getRandom.includes(randomNum) == false){
            getRandom.push(randomNum)
        } else {
            i--;
        }
    }

    let firstBlock = pole.children[0]
    let emptyBlock =  Array.from(pole.children).find(block=>block.textContent == '')
    let nextEmpty = emptyBlock.nextElementSibling    

    firstBlock.before(emptyBlock)
    nextEmpty.before(firstBlock)

    for (let i = 1; i < pole.children.length; i++) {
        pole.children[i].textContent = getRandom[i-1]
    }

    console.log(getRandom)
    ///console.log(1) -> проверка нажімаю ли я на кнопку
}

pole.onmousedown = (e) => {
    if (e.target.className == 'block') {
        const block = e.target
        let success = false;

        const breakLeftCoord = [4,8,12];
        const breakRightCoord = [3,7,11];

        for(let i = 0; i < pole.children.length ; i++){

            if(pole.children[i].className == 'block__0'){

                let leftBlock;
                let rightBlock;
                
                if(breakLeftCoord.includes(i) == false ){ //Проверить что нашей i нет в сломанных корд
                    leftBlock = pole.children[i-1] 
                } 
                
                if (breakRightCoord.includes(i) == false){
                    rightBlock = pole.children[i+1]
                }

                let topBlock = pole.children[i-4]
                let bottomBlock = pole.children[i+4]

                if (leftBlock == block || rightBlock == block || bottomBlock == block || topBlock == block){
                    success = true;
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
        /*
        /// Проверка выиграл ли игрок
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
        /// Анимация после победы
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#CC0013';
            ctx.font = '40pt Arial';
            ctx.fillText('Победа!', textX, 100, 300);
            ctx.fillStyle = 'red';
            ctx.strokeText('Победа!', textX, 100, 300);
        
            /// 3 - move the shapes
            textX = textX + speed;
            if((textX + 300 > canvas.width) || (textX <= 0)){
                speed = -speed;
            }
        }
        */
    }
}

