class Slider {
    constructor({el,time,autoPlay,autoPlayTime,direction,active}) {
        this.el = document.querySelector(el)
        this.inner = this.el.querySelector('.slider__inner')
        this.slides = [...this.inner.children]
        this.prev = this.el.querySelector('.slider__prev')
        this.next = this.el.querySelector('.slider__next')
        
        this.height = this.minHeight()
        this.width = this.minWidth()
        this.direction = direction.toUpperCase() === 'Y' ? 'Y' : 'X'
        this.moveSize = this.direction === 'X' ? this.width : this.height
        
        this.active = this.slides[active] ? active : 0
        this.time = isNaN(time) ? 1000 : time
        this.autoPlay = autoPlay
        this.autoPlayTime = autoPlayTime > time + 1000 ? autoPlayTime : time + 3000
        this.interval
        
        this.inner.style = `
                            width:${this.width}px;
                            height: ${this.height}px;
                            overflow: hidden;
                            position:relative;
                            `
        
        this.slides.forEach((el, i) => {
            el.style = `
                        height:100%;
                        width:100%;
                        position:absolute;
                        object-fit:cover;
            `;
            if(this.active !== i) el.style.transform = `translate${this.direction}(${this.moveSize}px)`
        })
        
        this.prev.addEventListener('click', () => this.move(this.prev))
        this.next.addEventListener('click', () => this.move(this.next))
        
        if (this.autoPlay) this.interval = setInterval(() => this.move(this.next), this.autoPlayTime)
    }
    
    move(btn){
        this.prev.disabled = true
        this.next.disabled = true
        
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, this.time)
        
        const moveSide = btn === this.next ? -this.moveSize : this.moveSize
        this.slides.forEach((el,i)=>{
            el.style.transition = '0s'
            if(i !== this.active)el.style.transform = `translate${this.direction}(${-moveSide}px)`
        })
        this.slides[this.active].style.transition = `${this.time}ms`
        this.slides[this.active].style.transform = `translate${this.direction}(${moveSide}px)`
        
        if (btn === this.next) {
            this.active++
            if (this.active >= this.slides.length) {
                this.active = 0
            }
        }else{
            this.active--
            if (this.active < 0) {
                this.active = this.slides.length - 1
            }
        }
        this.slides[this.active].style.transition = `${this.time}ms`
        this.slides[this.active].style.transform = `translate${this.direction}(0px)`
    }

    minHeight() {
        return Math.min(...this.slides.map(el => el.clientHeight))
    }
    minWidth() {
        return Math.min(...this.slides.map(el => el.clientWidth))
    }
}

new Slider({
    el: '#slider1',
    time: 1000,
    autoPlay: true,
    autoPlayTime: 3000,
    direction: 'X',
    active: 2
})
new Slider({
    el: '#slider2',
    time: 3000,
    autoPlay: true,
    autoPlayTime: 3000,
    direction: 'Y',
    active: 98
})

// obj = {
//     name: 'Test',
//     age: 55
// }

// const name = obj.name
// const age = obj.age

// const {name, age} = obj