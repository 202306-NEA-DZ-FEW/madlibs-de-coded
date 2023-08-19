// Initialize an empty string to store the story for text-to-speech.
let storyForTts = " ";

/**
 * Parses the raw story text into an array of objects with word and pos (part of speech) properties.
 * @param {string} rawStory - The raw story text to be parsed.
 * @returns {Array} An array of objects representing words and their parts of speech.
 */
function parseStory(rawStory) {
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

// Get references to DOM elements for editing and previewing the madlibs.
const madLibsEdit = document.querySelector(".madLibsEdit");
const madLibsPreview = document.querySelector(".madLibsPreview");

// Fetch the raw story, parse it, and process it.
getRawStory()
  .then(parseStory)
  .then((processedStory) => {

    // Function that creates an input field for filling in words.
    function createInput(index, defaultValue) {
      const input = document.createElement("input");
      input.setAttribute("data-index", index);
      input.placeholder = defaultValue || "___";
      input.maxLength = 20;
      input.addEventListener("input", () => {
        input.value.trim() !== "" ? input.classList.add("has-text") : input.classList.remove("has-text");
        updatePreview(processedStory);
      });
      return input;
    }

    // Function that creates a span for displaying text or underscores.
    function createSpan(text) {
      const span = document.createElement("span");
      span.textContent = text ? text + " " : "___ ";
      return span;
    }


    // Generates the madlibs form based on the processed story.
    function generateMadLibs(array) {
      array.forEach((word, index) => {
        if (word.pos) {
          const input = createInput(index, word.pos);
          madLibsEdit.appendChild(input);
        } else {
          const span = createSpan(word.word);
          madLibsEdit.appendChild(span);
        }
      });
    }

    // Updates the preview of the madlibs story.
    function updatePreview(array) {
      while (madLibsPreview.firstChild) {
        madLibsPreview.removeChild(madLibsPreview.firstChild);
      }
      storyForTts = "";
      array.forEach((word) => {
        if (word.pos) {
          const input = madLibsEdit.querySelector(`input[data-index="${array.indexOf(word)}"]`);
          const span = createSpan(input.value);
          span.style.color = "white";
          span.classList.add('preview-animation');
          madLibsPreview.appendChild(span);
          storyForTts += input.value + " ";
        } else {
          const span = createSpan(word.word);
          madLibsPreview.appendChild(span);
          storyForTts += word.word + " ";
        }
      });
    }

    // Generates the initial madlibs form and updates the preview.
    generateMadLibs(processedStory);
    updatePreview(processedStory);

    // Add click event listeners to input fields for smoother scrolling behavior.
    const inputs = madLibsEdit.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("click", () => {
        document.documentElement.scrollTo({
          top: document.documentElement.scrollHeight * 0.30,
          behavior: "smooth"
        });
      });
    });

    // Add keypress event listener for handling Enter key to navigate between input fields.
    madLibsEdit.addEventListener("keypress", function (e) {
      if (e.key === 'Enter') {
        const currentIndex = Array.from(inputs).indexOf(e.target);
        let nextIndex = currentIndex === Array.from(inputs).length - 1 ? 0 : currentIndex + 1;
        const nextInput = inputs[nextIndex];
        if (nextInput) {
          nextInput.focus(); // Move focus to the next input field
        }
      }
    });
  });

// Get DOM references for the text-to-speech functionality.
let speakButton = document.getElementById("speak-button");
let volumeSlider = document.getElementById("volume");

// Add click event listener to the speak button for text-to-speech.
speakButton.addEventListener("click", function () {
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

// Toggle play/pause icon on the speak button.
let play = false;
speakButton.textContent = "▶"
speakButton.addEventListener("click", function () {
  if (play === false) {
    speakButton.textContent = "◼"
    play = true
  } else {
    speakButton.textContent = "▶"
    play = false
  }
});
