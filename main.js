
let pole = document.querySelector(".pole")
let btn = document.querySelector(".btn")
let gawin = document.querySelector(".gameWin")

var leftOffset = 0;
var topOffset = 0;
var dir = "right"

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


                const winsComb = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','']

                let win = true
                for(let i = 0; i <pole.children.length; i++) {
                    if(pole.children[i].innerHTML != winsComb[i]){
                        win = false;
                        break;
                    }
                }
                if (win == true) {
                    gawin.style.display = "flex";
                }
            }
        }
    }
}

