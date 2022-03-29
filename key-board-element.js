
class KeyBoardElement extends HTMLElement {
  row_1 = `1234567890-=`.split('')
  row_2 = `qwertyuiop[]\\`.split('')
  row_3 = `asdfghjkl;'`.split('')
  row_4 = `zxcvbnm,./`.split('')


  connectedCallback(){



    this.innerHTML = '<p>keyboard</p>';
    window.addEventListener('keydown', (e) => {
      this.handleKey(e)
    })
  }

  handleKey(e){
    const index_1 = this.row_1.indexOf(e.key);
    const index_2 = this.row_2.indexOf(e.key);
    const index_3 = this.row_3.indexOf(e.key);
    const index_4 = this.row_4.indexOf(e.key);
    console.log(e)


    if(index_1 > -1){
      console.log('row_1', index_1);
    } 
    if (index_2 > -1){
      console.log('row_2', index_2);
    } 
    if (index_3 > -1){
      console.log('row_3', index_3);
    }
    if (index_4 > -1){
      console.log('row_4', index_4);
    }

    if(e.key === 'Shift'){
      if(e.code === 'ShiftLeft'){
        console.log('Shift Left');
      } else if(e.code === 'ShiftRight'){
        console.log('Shift Right');
      }
    }

    if(e.code === 'ArrowDown'){
      console.log('down arrow')
    }

    if(e.code === 'ArrowUp'){
      console.log('up arrow')
    }

    if(e.code === 'ArrowRight'){
      console.log('right arrow')
 
    }

    if(e.code === 'ArrowLeft'){
      console.log('left arrow')
   
    }
  } 


  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }
    
  disconnectedCallback() {
    console.log('Custom element removed from page.')
  }
}

customElements.define('key-board', KeyBoardElement)
