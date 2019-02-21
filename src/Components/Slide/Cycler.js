class Cycler {
    constructor(items, width, index){
      this.items = items;
      this.width = width;
      this.index = index;
    }
    next(steps){
      const res = new Array(this.width);
      this.index = this.cyclicIndex(this.index + steps);
      for (let i = 0; i < this.width; i++) {
        res[i] = this.items[this.cyclicIndex(this.index + i)];
      }
      return res;
    }
    getNext(){
      let nextIndex = this.cyclicIndex(this.index + 3);
      return this.items[nextIndex];
    }
    getPrev(){
      return this.items[this.cyclicIndex(this.index - 1)];
    }
    checkOverflow(num){
      return num % this.items.length
    }
    cyclicIndex(i){
      return i >= this.items.length ? this.checkOverflow(i - this.items.length) : 0 > i ? this.checkOverflow(i + this.items.length) : i;
    }
  }
  
  export default Cycler;
  