


class KeyBoardElement extends HTMLElement {
  symbols = `!@#$%^&*()_+-=[]\\{}|;':",./<>?`.split('')
  row_1 = `1234567890-=`.split('')
  row_2 = `qwertyuiop[]\\`.split('')
  row_3 = `asdfghjkl;'`.split('')
  row_4 = `zxcvbnm,./`.split('')
  row_5 = `!@#$%^&*()_+`.split('')
  row_6 = `QWERTYUIOP{}|`.split('')
  row_7 = `ASDFGHJKL:"`.split('')
  row_8 = `ZXCVBNM<>?`.split('')
  all_rows = [
    this.row_1, 
    this.row_2, 
    this.row_3, 
    this.row_4, 
    this.row_5, 
    this.row_6, 
    this.row_7, 
    this.row_8
  ]
  last_key = undefined
  shift = false

  connectedCallback(){
    this.generateKeyboardGraphic()
    window.addEventListener('keydown', (e) => {
      this.handleKey(e)
    })
    window.addEventListener('keyup', (e) => {
      this.keyUp(e)
    })
  }

  keyUp(e){
    if(e.key === 'Shift'){
      this.classList.remove('shift-pressed');
      return
    }
    try {
      this.querySelector(`.key-${e.key}`).classList.remove('key-down')
    }catch(err){
      if(this.symbols.indexOf(e.key) > -1){
        this.querySelector(`.key-symbol-${this.symbols.indexOf(e.key)}`)
          .classList.remove('key-down')
      }
    }
  }

  handleKey(e){
    try{
      this.querySelector(`.key-${e.key}`).classList.add('key-down')
    } catch (err){
      if(this.symbols.indexOf(e.key) > -1){
        this.querySelector(`.key-symbol-${this.symbols.indexOf(e.key)}`)
          .classList.add('key-down')
      }
    }

    this.shift = false
    const index_1 = this.row_1.indexOf(e.key);
    const index_2 = this.row_2.indexOf(e.key);
    const index_3 = this.row_3.indexOf(e.key);
    const index_4 = this.row_4.indexOf(e.key);
    const index_5 = this.row_5.indexOf(e.key);
    const index_6 = this.row_6.indexOf(e.key);
    const index_7 = this.row_7.indexOf(e.key);
    const index_8 = this.row_8.indexOf(e.key);

    let message = {msg:'Error'}

    if(index_1 > -1){
      message = {channel: '1', index: index_1}
    } 
    if (index_2 > -1){
      message = {channel: '2', index: index_2}
    } 
    if (index_3 > -1){
      message = {channel: '3', index: index_3}
    }
    if (index_4 > -1){
      message = {channel: '4', index: index_4}
    }
    if(index_5 > -1){
      message = {channel: '5', index: index_5}
    } 
    if (index_6 > -1){
      message = {channel: '6', index: index_6}
    } 
    if (index_7 > -1){
      message = {channel: '7', index: index_7}
    }
    if (index_8 > -1){
      message = {channel: '8', index: index_8}
    }

    if(e.key === 'Shift'){
      this.classList.add('shift-pressed')
      if(e.code === 'ShiftLeft'){
        message = {channel: 'Shift', index: 'left'}
      } else if(e.code === 'ShiftRight'){
        message = {channel: 'Shift', index: 'right'}
      }
    } 



    if(e.code === 'ArrowDown'){
      message = {channel: 'Arrow', index: 'down'}
    }

    if(e.code === 'ArrowUp'){
      message = {channel: 'Arrow', index: 'up'}
    }

    if(e.code === 'ArrowRight'){
      message = {channel: 'Arrow', index: 'right'} 
    }

    if(e.code === 'ArrowLeft'){
      message = {channel: 'Arrow', index: 'left'}
    }

    const message_obj = Object.assign(message, {key:e.key,code:e.code})
    const key_event = new CustomEvent('KEY_EVENT', {detail: message_obj})
    this.dispatchEvent(key_event);
  } 

  generateKeyboardGraphic(){
    this.all_rows.forEach((row, index) => {
      const row_el = document.createElement('div');
      row_el.classList.add(`row-${index}`, 'row');

      if(index < 4){
        row_el.classList.add('no-shift')
      } else {
        row_el.classList.add('shift')
      }

      row.forEach((c,i) => {
        const key_el = document.createElement('div');
        if(this.symbols.indexOf(c) > -1){
          key_el.classList.add(`c-${i}`, `key`, `key-symbol-${i}`);
        } else {
          key_el.classList.add(`c-${i}`, `key`, `key-${c}`);          
        }
        const key_content_el = document.createElement('span')
        key_content_el.classList.add('key-content');
        key_content_el.innerText = c;
        key_el.appendChild(key_content_el)
        row_el.appendChild(key_el);
      });

      this.appendChild(row_el);
    })
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


