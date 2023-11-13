class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.75);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
            }

            :host([opened]) #backdrop,
            :host([opened]) #modal {
                opacity: 1;
                pointer-events: all;
            }

            :host([opened]) #modal {
                top: 45vh;
            }

            #modal {
              position: absolute;
              left: 65%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 60vmin;
              height: 60vmin;
              padding: 2rem;
              opacity: 0;
              border-radius:50%;
              background: rgb(48, 55, 62);
              background: linear-gradient(
                0deg,
                rgba(48, 55, 62, 1) 0%,
                rgba(14, 16, 18, 1) 100%
              );
              z-index: 10;
              display: flex;
              flex-direction: column;
              justify-content: center;
                      align-items: center;
              overflow: hidden;
              text-align: center;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
              pointer-events: none;
              transition: all 0.3s ease-out;
            }
            #modal::before {
              content: "";
              position: absolute;
              width: 8rem;
              height: 200%;
              background: #0be4ff;
                         z-index: -1;
              animation: borderRotate 4s linear infinite;
            }
            @keyframes borderRotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            #modal::after {
              content: "";
              position: absolute;
              inset: 2px;
              background: rgb(48, 55, 62);
              background: linear-gradient(
                0deg,
                rgba(48, 55, 62, 1) 0%,
                rgba(14, 16, 18, 1) 100%
              );
              border-radius:50%;
            }

            #icon-space {
          z-index: 11;
            }
            #icon-space img {
              border-radius: 50%;
              display: block;
              margin:  0 auto; 
              width: 15vmin;            
              filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
            }

            header {
              font-family: 'Oswald', sans-serif;
                padding: 1rem;                
                font-family: 'Oswald', sans-serif;
                color: #0be4ff;
                font-size: clamp( 
                    0.6rem,
                    3.5vw,
                    2rem
                   );
                font-weight: 300;
                margin:1rem auto;
                letter-spacing: 0.1em;
                line-height: calc(1em + 1rem);
                text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
                z-index: 11;
            }

            #main p {
              font-family: 'Oswald', sans-serif;
              font-size: clamp( 
                  0.4rem,
                  3.5vw,
                  1.5rem           
               );
              overflow-wrap: break-word;
              hyphens: auto;
              text-align: center;
              margin: 0;
              color: #fff;
              font-weight: 200;
              hyphens: auto;
              line-height: calc(1em + 1rem);
              letter-spacing: 2px;
              text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
              z-index: 12;
            }


            ::slotted(h1) {
            }
            ::slotted(p) {
            }               

            #main {
                padding: 0 2rem;
                color: #fff;
                text-align: center;      
                z-index: 11;
            }

            #actions {
              align-self: middle;
                padding: 1rem;
                display: flex;
                justify-content: flex-end;       
            }

            #actions button {
              position: relative;
              display: inline-block;
              background-color: rgba(48, 55, 62, 1);
              color: #fff;
              border: 1px solid #0be4ff;
              font-family: 'Oswald', sans-serif;
              font-size: 1rem;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              font-weight: 300;
              letter-spacing: 3px;
              padding: 1rem 2.5rem;
              overflow: hidden;
              margin-top: clamp(1rem,2.5vw,2rem);
              border-radius: 3rem;
              transition: all 0.4s ease-in;
            cursor: pointer;
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
            z-index: 11;
            }
                #actions button:hover {
              background-color: #0be4ff;
              color: #000;
              cursor: url(images/glove2.png),auto;
              transition: all 0.2s ease-out;
            }
            #actions button:focus {
              outline: none;
            }
            #actions button:active {
              transform: scale(0.9);
             box-shadow: inset 0 0 15px #000;
            }
      
        </style>
        <div id="backdrop"></div>
        <div id="modal">
        <div id="icon-space">
        <img src="https://user-images.githubusercontent.com/59874288/117998857-92faf380-b344-11eb-8185-97423f9542e8.png" />
      </div>
            <header>
              <slot name="title">Welcome to OneStepWeb Development</slot>
            </header>
            <section id="main">
            <p>
            Please note, the following pages are for demo purposes and hosted on free tiers so slow-loading.
          </p><slot></slot>
            </section>
            <section id="actions"> 
                <button id="confirm-btn">OK</button>
            </section>
        </div>
    `;
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', (event) => {
      console.dir(slots[1].assignedNodes());
    });
    const backdrop = this.shadowRoot.querySelector('#backdrop');
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    backdrop.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute('opened')) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  static get observedAttributes() {
    return ['opened'];
  }

  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define('uc-modal', Modal);
