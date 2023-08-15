/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  return {}; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
const temp = [
  { word: "Louis", pos: "noun" },
  { word: "went", pos: "verb" },
  { word: "to" },
  { word: "the" },
  { word: "store"},
  { word: "," },
];


// we get the components from the html
const madLibsEdit = document.querySelector(".madLibsEdit");
const madLibsPreview = document.querySelector(".madLibsPreview");

// create 
const text = [];

// function that creates input field
function createInput(index, defaultValue) {
  const input = document.createElement("input");
  input.setAttribute("data-index", index);
  input.value = defaultValue || "";
  input.addEventListener("input", updatePreview);
  return input;
}
//This is a comment

// function that creates empty space
function createSpan(text) {
  const span = document.createElement("span");
  span.textContent = text ? text + " " : "___ "; // Display underscores if text is empty
  return span;
}


// generate the madlibs
function generateMadLibs(array) {
  array.forEach((word, index) => {
    if (word.pos) {
      const input = createInput(index, word.pos);
      madLibsEdit.appendChild(input);
    } else {
      text.push(word.word);
      const span = createSpan(word.word);
      madLibsEdit.appendChild(span);
    }
  });
}

generateMadLibs(temp);


// function to update the preview
function updatePreview() {
  while (madLibsPreview.firstChild) {
    madLibsPreview.removeChild(madLibsPreview.firstChild);
  }

  temp.forEach((word) => {
   
    if (word.pos) {
      const input = madLibsEdit.querySelector(`input[data-index="${temp.indexOf(word)}"]`);
      const span = createSpan(input.value);
      madLibsPreview.appendChild(span);
    } else {
      const span = createSpan(word.word);
      madLibsPreview.appendChild(span);
    }
  });
}




getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  })
