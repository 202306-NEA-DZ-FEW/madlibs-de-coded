function parseStory(rawStory) {
  console.log(rawStory);
  // const random = rawStory.replaceAll(",", " ,").replaceAll(".", " .").split(" ");
  // console.log (random);

  const parsedStory = rawStory.match(
    /[a-zA-Z]+\[v\]|[a-zA-Z]+\[n\]|[a-zA-Z]+\[a\]|[a-zA-Z]+|[,\.]/g
  );
  // console.log(parsedStory);

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

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    // we get the components from the html
    const madLibsEdit = document.querySelector(".madLibsEdit");
    const madLibsPreview = document.querySelector(".madLibsPreview");

  
    // function that creates input field
    function createInput(index, defaultValue) {
      const input = document.createElement("input");
      input.setAttribute("data-index", index);

      input.placeholder = defaultValue || "___";
      input.maxLength = 20;
      // input.value = "";
      input.addEventListener("input", () => updatePreview(processedStory));
      return input;
    }

    // function that creates empty space
    function createSpan(text) {
      const span = document.createElement("span");
      span.textContent = text ?  text+" "   : "___ "; // Display underscores if text is empty
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

      array.forEach((word) => {
        if (word.pos) {
          const input = madLibsEdit.querySelector(
            `input[data-index="${array.indexOf(word)}"]`
          );
          const span = createSpan(input.value);
          madLibsPreview.appendChild(span);
        } else {
          const span = createSpan(word.word);
          madLibsPreview.appendChild(span);
        }
      });
    }
  
    
    generateMadLibs(processedStory);
    updatePreview(processedStory);
  });