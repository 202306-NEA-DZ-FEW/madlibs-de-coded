let storyForTts = " ";

function parseStory(rawStory) {
  // const random = rawStory.replaceAll(",", " ,").replaceAll(".", " .").split(" ");

  const parsedStory = rawStory.match(
    /[a-zA-Z]+\[v\]|[a-zA-Z]+\[n\]|[a-zA-Z]+\[a\]|[a-zA-Z]+|[,\.]/g
  );

  const parsedObjectsStory = parsedStory.map((element) => {
    if (element.endsWith("[n]") === true) {
      return { word: element.slice(0, -3), pos: "noun" };
    } else if (element.endsWith("[v]") === true) {
      return { word: element.slice(0, -3), pos: "verb" };
    } else if (element.endsWith("[a]") === true) {
      return { word: element.slice(0, -3), pos: "adjective" };
    } else {
      return { word: element };
    }
  });
  return parsedObjectsStory;
}


const madLibsEdit = document.querySelector(".madLibsEdit");
const madLibsPreview = document.querySelector(".madLibsPreview");


getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    // we get the components from the html

    // function that creates input field
    function createInput(index, defaultValue) {
      const input = document.createElement("input");
      input.setAttribute("data-index", index);

      input.placeholder = defaultValue || "___";
      input.maxLength = 20;
      // input.value = "";
      input.addEventListener("input", () => {
        input.value.trim() !== "" ? input.classList.add("has-text") : input.classList.remove("has-text") 
        updatePreview(processedStory)});
      return input;
    }

    // function that creates empty space
    function createSpan(text) {
      const span = document.createElement("span");

      span.textContent = text ?  text+" "   : "___ "; 
    // Display underscores if text is empty
      span.textContent = text ?  text+" "   : "___ "; // Display underscores if text is empty

      return span;
    }
    //create colored span
    function createColoredSpan(text) {
      
      const span = document.createElement("span");
      for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const letterSpan = document.createElement("span");
        letterSpan.textContent = letter;
        letterSpan.style.color = colors[i % colors.length];
        span.appendChild(letterSpan);
      }
      return span;
    }
    // generate the madlibs
    function generateMadLibs(array) {
      array.forEach((word, index) => {
        if (word.pos) {
          const input = createInput(index, word.pos);
          madLibsEdit.appendChild(input);
        } else {
         // text.push(word.word);
          const span = createSpan(word.word);
          madLibsEdit.appendChild(span);
        }
      });
    }

    // function to update the preview
    function updatePreview(array) {
      while (madLibsPreview.firstChild) {
        madLibsPreview.removeChild(madLibsPreview.firstChild);
      }
      storyForTts = "";
      array.forEach((word) => {
        if (word.pos) {
          const input = madLibsEdit.querySelector(
            `input[data-index="${array.indexOf(word)}"]`
          );
          const span = createSpan(input.value);
          span.style.color = "white"
          span.classList.add('preview-animation')
          madLibsPreview.appendChild(span);
          storyForTts += input.value + " ";
        } else {
          const span = createSpan(word.word);
         
          
          
          madLibsPreview.appendChild(span);
          storyForTts += word.word + " ";
        }
      });
    }
    generateMadLibs(processedStory);
    updatePreview(processedStory);
    const inputs = madLibsEdit.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("click", () => {
      
        
        document.documentElement.scrollTo({
          top: document.documentElement.scrollHeight * 0.30,
          behavior: "smooth"
        });
      });
    });
        
    madLibsEdit.addEventListener("keypress" ,function (e) {
      if (e.key === 'Enter') {
        const currentIndex = Array.from(inputs).indexOf(e.target);
        console.log(currentIndex)
        let nextIndex = 0
        currentIndex == Array.from(inputs).length - 1 ? nextIndex = 0 : nextIndex = currentIndex + 1;
        const nextInput = inputs[nextIndex];
        console.log(nextInput)
        if (nextInput) {
          nextInput.focus(); // Move focus to the next input field
      
        }

      }} )
  });
let speakButton = document.getElementById("speak-button");
let volumeSlider = document.getElementById("volume");

speakButton.addEventListener("click", function() {
  let utterance = new SpeechSynthesisUtterance();
  if (!window.speechSynthesis.speaking) {
    utterance.text = storyForTts;
    utterance.voice = window.speechSynthesis.getVoices()[6];
    utterance.volume = volumeSlider.value;
    window.speechSynthesis.speak(utterance);
  } else {
    window.speechSynthesis.cancel();
  }
  
});
