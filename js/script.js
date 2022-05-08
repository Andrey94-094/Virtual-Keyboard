const Keyboard = {
   elements: {
      main: null,
      keysContainer: null,
      textArea: null,
      keyboardInput: null,
      done: null,
      message: null,
      keys: []
   },

   eventHandlers: {
      oninput: null,
      onclose: null
   },

   properties: {
      value: '',
      capsLock: false,
      shift: false,
      isMess: true,
      lang: 'en'
   },

   keyLayouts: {
      keyLayout: [
         "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
         "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", '\\',
         "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
         "l. shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "r. shift",
         "lang", "space", "arrow_left", "arrow_right"
      ],
      keyLayoutShift: [
         "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
         "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", '|',
         "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "enter",
         "r. shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "l. shift",
         "space"
      ],
      keyLayoutRus: [
         "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
         "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", '\\',
         "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
         "r. shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "l. shift",
         "lang", "", "", "space", "", "", "", ""
      ],
      keyLayoutShiftRus: [
         "Ё", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
         "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", '/',
         "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", 'Э', "enter",
         "r. shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "l. shift",
         "space"
      ]
   },

   init() {
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');
      this.elements.message = document.createElement('span');
      this.elements.textArea = document.createElement('div');
      this.elements.keyboardInput = document.createElement('textarea');

      this.elements.main.classList.add('keyboard', 'keyboard--hidden');
      this.elements.keysContainer.classList.add('keyboard__keys');
      this.elements.textArea.classList.add('text-area');
      this.elements.keyboardInput.classList.add('use-keyboard-input');
      this.elements.message.classList.add('message', 'keyboard--hidden');
      this.elements.message.innerHTML = 'press <span>ctrl</span> to switch language';

      document.querySelector('.wrapper').appendChild(this.elements.textArea);
      document.querySelector('.wrapper').appendChild(this.elements.main);
      document.querySelector('.wrapper').appendChild(document.createElement('audio'));
      document.querySelector("audio").setAttribute('src', 'sound/click.mp3');
      this.elements.main.appendChild(this.elements.keysContainer);
      this.elements.keysContainer.appendChild(this._createKeys());
      this.elements.textArea.appendChild(this.elements.message);
      this.elements.textArea.appendChild(this.elements.keyboardInput);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

      document.querySelectorAll('.use-keyboard-input').forEach(element => {
            this.open(element.value, currentValue => {
               element.value = currentValue;
            });
         const keyElement = document.createElement('button');
         keyElement.setAttribute('type', 'button');
         keyElement.classList.add('keyboard__key', 'keyboard__key--wide', 'keyboard__key--dark', 'done', 'keyboard--hidden');
         keyElement.innerHTML = `<i class="material-icons">check_circle</i>`
         this.elements.done = keyElement;
         document.querySelector('.text-area').appendChild(keyElement);
      });
   },

   _getKeyCode(e) {
      if (e.code.split('').slice(0, 3).join('').toLowerCase() === 'key') key = document.getElementById(e.code.split('').slice(3).join('').toLowerCase());
      else if (e.code.split('').slice(0, 5).join('') === 'Digit') key = document.getElementById(e.code.split('').slice(5).join(''));
      else if (e.code === 'BracketLeft') key = document.getElementById('[');
      else if (e.code === 'BracketRight') key = document.getElementById(']');
      else if (e.code === 'Semicolon') key = document.getElementById(';');
      else if (e.code === 'Quote') key = document.getElementById("'");
      else if (e.code === 'Comma') key = document.getElementById(",");
      else if (e.code === 'Period') key = document.getElementById(".");
      else if (e.code === 'Slash') key = document.getElementById("/");
      else if (e.code === 'Space') key = document.getElementById("space");
      else if (e.code === 'ShiftLeft') key = document.getElementById("l. shift");
      else if (e.code === 'ShiftRight') key = document.getElementById("r. shift");
      else if (e.code === 'CapsLock') key = document.getElementById("caps");
      else if (e.code === 'Backspace') key = document.getElementById("backspace");
      else if (e.code === 'Backslash') key = document.getElementById("\\");
      else if (e.code === 'ControlLeft') key = document.getElementById("lang");
      else if (e.code === 'ArrowLeft') key = document.getElementById("arrow_left");
      else if (e.code === 'ArrowRight') key = document.getElementById("arrow_right");
      else if (e.code === 'Enter') key = document.getElementById("enter");
      else if (e.code === 'Tab') key = document.getElementById("Tab");
      else if (e.code === 'Backquote') key = document.getElementById("`");
      else if (e.code === 'Minus') key = document.getElementById("-");
      else if (e.code === 'Equal') key = document.getElementById("=");
      else if (e.code === 'F5') key = location.reload();
      else key = '';
      return key;
   },

   _createKeys() {
      window.addEventListener('keydown', e => {
         const key = this._getKeyCode(e);
         key === '' ? '' : key.click();
         if (key === '') {
            return;
         } else {
            if (key.classList.contains('keyboard__key-active')) return;
            else key.classList.add('keyboard__key-active');
         }
      });

      window.addEventListener('keyup', e => {
         const key = this._getKeyCode(e);
         if (key === '') {
            return;
         } else {
            if (key.classList.contains('keyboard__key-active')) key.classList.remove('keyboard__key-active');
            else return;
         }
      });

      const fragment = document.createDocumentFragment();

      const createIconHTML = (icon_name) => {
         return `<i class="material-icons">${icon_name}</i>`
      };

      this.keyLayouts.keyLayout.forEach(key => {
         const keyElement = document.createElement('button');
         const insertBreakLine = ['backspace', '\\', 'enter', 'r. shift'].indexOf(key) !== -1;

         keyElement.setAttribute('type', 'button');
         keyElement.classList.add('keyboard__key');

         switch (key) {
            case 'backspace':
               keyElement.classList.add('keyboard__key', 'keyboard__key--action');
               keyElement.innerHTML = createIconHTML('backspace');

               keyElement.addEventListener('click', () => {
                  let cursorPos = this.elements.keyboardInput.selectionStart;
                  let left = this.properties.value.slice(0, cursorPos);
                  let right = this.properties.value.slice(cursorPos);

                  if (cursorPos - 1 === -1) return;

                  left = this.properties.value.slice(0, cursorPos - 1).substring(0, this.properties.value.length - 1);
                  left += right;
                  this.properties.value = left;

                  this._triggerEvent('oninput');

                  this.elements.keyboardInput.setSelectionRange(cursorPos - 1, cursorPos - 1);
               });

               break;

            case 'arrow_left':
            case 'arrow_right':
               keyElement.classList.add('keyboard__key--double-wide', 'keyboard__key--action');
               keyElement.innerHTML = `<i class="material-icons">${key.toLowerCase()}</i>`;

               keyElement.addEventListener('click', e => {
                  let cursorPos = this.elements.keyboardInput.selectionStart;

                  if (e.target.textContent === 'arrow_left') {
                     if (cursorPos - 1 === -1) return;
                     else cursorPos--;
                  }
                  else if (e.target.textContent === 'arrow_right') cursorPos++;

                  this.elements.keyboardInput.setSelectionRange(cursorPos, cursorPos);
               });

               break;

            case 'r. shift':
            case 'l. shift':
               keyElement.classList.add('keyboard__key--double-wide', 'keyboard__key--activatable', 'keyboard__key--action');
               keyElement.innerHTML = `<p>${key.toLowerCase()}</p>`;

               keyElement.addEventListener('click', () => {
                  this._toggleShift();
                  keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
               });

               break;

            case 'lang':
               keyElement.classList.add('keyboard__key--double-wide', 'keyboard__key--action');
               keyElement.innerHTML = `<p><span class="selected-lang">en</span> / <span>ru</span></p>`;

               keyElement.addEventListener('click', () => {
                  this.elements.message.classList.add('keyboard--hidden');

                  this._toggleLang();
                  document.querySelectorAll('p span')[0].classList.toggle('selected-lang');
                  document.querySelectorAll('p span')[1].classList.toggle('selected-lang');
               });

               break;

            case 'caps':
               keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key--action');
               keyElement.innerHTML = createIconHTML('keyboard_capslock');

               keyElement.addEventListener('click', () => {
                  this._toggleCapsLock();
                  keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
               });

               break;

            case 'Tab':
               keyElement.classList.add('keyboard__key', 'keyboard__key--action');
               keyElement.innerHTML = createIconHTML('keyboard_tab');

               keyElement.addEventListener('click', () => {
                  let cursorPos = this.elements.keyboardInput.selectionStart;
                  let left = this.properties.value.slice(0, cursorPos);
                  let right = this.properties.value.slice(cursorPos);

                  this.properties.value = `${left}\t${right}`;
                  this._triggerEvent('oninput');
                  this.elements.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);

               });

               break;

            case 'enter':
               keyElement.classList.add('keyboard__key--wide', 'keyboard__key--action');
               keyElement.innerHTML = createIconHTML('keyboard_return');

               keyElement.addEventListener('click', () => {
                  let cursorPos = this.elements.keyboardInput.selectionStart;
                  let left = this.properties.value.slice(0, cursorPos);
                  let right = this.properties.value.slice(cursorPos);

                  this.properties.value = `${left}\n${right}`;
                  this._triggerEvent('oninput');

                  this.elements.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
               });

               break;

            case 'space':
               keyElement.classList.add('keyboard__key--extra-wide', 'keyboard__key--action');
               keyElement.innerHTML = createIconHTML('space_bar');

               keyElement.addEventListener('click', () => {
                  let cursorPos = this.elements.keyboardInput.selectionStart;
                  let left = this.properties.value.slice(0, cursorPos);
                  let right = this.properties.value.slice(cursorPos);

                  this.properties.value = `${left} ${right}`;
                  this._triggerEvent('oninput');

                  this.elements.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
               });

               break;

            default:
               keyElement.textContent = key.toLowerCase();

               keyElement.addEventListener('click', (e) => {
                  let cursorPos = this.elements.keyboardInput.selectionStart;
                  let left = this.properties.value.slice(0, cursorPos);
                  let right = this.properties.value.slice(cursorPos);

                  left += this.properties.capsLock || this.properties.shift ? e.target.textContent.toUpperCase() : e.target.textContent.toLowerCase();
                  left += right;
                  this.properties.value = left;
                  this._triggerEvent('oninput');

                  this.elements.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
               });

               break;
         }

         keyElement.setAttribute('id', key);

         keyElement.addEventListener('mouseover', () => {
            keyElement.classList.add('keyboard__key-hover');
         });

         keyElement.addEventListener('mouseleave', () => {
            keyElement.classList.remove('keyboard__key-hover');
         });
         keyElement.addEventListener('mouseout', () => {
            keyElement.classList.remove('keyboard__key-hover');
         });

         keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('keyboard__key-active');
         });

         keyElement.addEventListener('mouseup', () => {
            keyElement.classList.remove('keyboard__key-active');
         });

         fragment.appendChild(keyElement);
         if (insertBreakLine) {
            fragment.appendChild(document.createElement('br'));
         }
      });


      return fragment;
   },

   _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == 'function') {
         this.eventHandlers[handlerName](this.properties.value)
      }
   },

   _toggleLang() {
      if (this.properties.lang === 'en') this.properties.lang = 'ru';
      else if (this.properties.lang === 'ru') this.properties.lang = 'en';

      let i = 0;
      for (const key of this.elements.keys) {
         if (key.childElementCount === 0) {
            if (this.properties.lang === 'ru') {
               key.textContent = this.keyLayouts.keyLayoutRus[i];
               key.textContent.toUpperCase();
            } else {
               key.textContent = this.keyLayouts.keyLayout[i];
               key.textContent.toLowerCase();
            }
         }
         i++;
      }
   },

   _toggleShift() {
      this.properties.shift = !this.properties.shift;
      let i = 0;
      if (this.properties.lang === 'en') {
         for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
               if (key.textContent = this.properties.shift) {
                  key.textContent = this.keyLayouts.keyLayoutShift[i];
                  key.textContent.toUpperCase();
               } else {
                  key.textContent = this.keyLayouts.keyLayout[i];
                  key.textContent.toLowerCase();
               }
            }
            i++;
         }
      } else {
         for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
               if (key.textContent = this.properties.shift) {
                  key.textContent = this.keyLayouts.keyLayoutShiftRus[i];
                  key.textContent.toUpperCase();
               } else {
                  key.textContent = this.keyLayouts.keyLayoutRus[i];
                  key.textContent.toLowerCase();
               }
            }
            i++;
         }
      }
   },

   _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      for (const key of this.elements.keys) {
         if (key.childElementCount === 0) {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
         }
      }
   },

   open(initialValue, oninput) {
      this.properties.value = initialValue || '';
      this.eventHandlers.oninput = oninput;
      this.elements.main.classList.remove('keyboard--hidden');
      this.elements.done.classList.remove('keyboard--hidden');

      if (this.properties.isMess) {
         this.elements.message.classList.remove('keyboard--hidden');
         this.properties.isMess = false;
      }

      document.querySelectorAll('.use-keyboard-input').forEach(element => {
         element.onblur = () => element.focus();
      });
      window.onkeydown = e => e.preventDefault();
   },

};

window.addEventListener('DOMContentLoaded', () => {
   Keyboard.init();
});