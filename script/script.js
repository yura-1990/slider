// var map = Array.prototype.map
// var a = map.call(sliderItems, function(x) {
//     return Math.min(parseInt(x.querySelector('.slider__img').clientWidth, 10))
// })
// console.log(a);
let active = 0

const slider = document.querySelector('.slider'),
    sliderItems = [...slider.children],
    btnPrev = document.querySelector('.slider__prev'),
    btnNext = document.querySelector('.slider__next')

btnPrev.addEventListener('click', () => prevOrnext('btnPrev'))
btnNext.addEventListener('click', () => prevOrnext('btnNext'))


function minWidth(item) {
    return Math.min(...item.map(imgItem => imgItem.querySelector('.slider__img').clientWidth))
}

function minHeight(item) {
    return Math.min(...item.map(imgItem => imgItem.querySelector('.slider__img').clientHeight))
}

const minW = minWidth(sliderItems)
const minH = minHeight(sliderItems)
slider.style = `width: ${minW}px;
                height: ${minH}px;
                margin-left: auto;
                margin-right: auto;
                position: relative;
                overflow: hidden;
`
sliderItems.forEach((el, i) => {
    el.style = `width: ${minW}px;
                height: ${minH}px;
                position: absolute;
                `
    el.querySelector('.slider__img').style = `width: 100%; height: 100%;`
})

function prevOrnext(params) {
    let moveSize = params === "btnPrev" ? -minW : minW

    sliderItems.forEach((el, i) => {
        el.style.transition = `0s`
        if (active !== i) {
            el.style.transform = `translateX(${-moveSize}px)`
        }
    })

    sliderItems[active].style.transform = `translateX(${moveSize}px)`
    sliderItems[active].style.transition = `1s linear`

    if (params === 'btnPrev') {
        active++
        if (active >= sliderItems.length) {
            active = 0
        }
        console.log(active);

    } else if (params === 'btnNext') {

        if (active > 0) {
            active--
        } else {
            active = sliderItems.length - 1
        }
        console.log(active);

    }

    sliderItems[active].style.transform = `translateX(0px)`
    sliderItems[active].style.transition = `1s linear`

}