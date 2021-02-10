class TypeWriter {
    constructor(txtElement, words, wait) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
    type() {
      // Indice palabra
      const current = this.wordIndex % this.words.length;
      // Palabra completa
      const fullTxt = this.words[current];
  
      if(this.isDeleting) 
      {
        // Quitar caracter
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } 
      else 
      {
        // Anadir caracter
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      //Crear span para insertar palabra
      var txtS = document.createElement('span')
      txtS.setAttribute('class', 'txt');
      txtS.innerHTML = this.txt;
      this.txtElement.innerHTML = txtS.innerHTML;
  
      let typeSpeed = 300;

      if(this.isDeleting) 
      {
        typeSpeed /= 2;
      }
  
      // Palabra completada
      if(!this.isDeleting && this.txt === fullTxt) 
      {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } 
      else if(this.isDeleting && this.txt === '') 
      {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  document.addEventListener('DOMContentLoaded', beginType);
  document.addEventListener('DOMContentLoaded', console.log("Empezó a correr el type"));

  function beginType() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
  }