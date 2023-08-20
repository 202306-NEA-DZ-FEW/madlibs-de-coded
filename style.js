for (let i = 0; i < 32; i++) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    let size = 2 + Math.random() * 4;
    let distance = 6 + Math.random() * 2;
    let position = -5 + Math.random() * 110;
    let time = 2 + Math.random() * 2;
    let delay = -1 * (2 + Math.random() );
    bubble.style.setProperty("--size", size + "rem");
    bubble.style.setProperty("--distance", distance + "rem");
    bubble.style.setProperty("--position", position + "%");
    bubble.style.setProperty("--time", time + "s");
    bubble.style.setProperty("--delay", delay + "s");
    document.querySelector(".bubbles").appendChild(bubble);
  }
  

  const loader = document.getElementById("preload");
  window.addEventListener("load", function(){
    loader.style.display = "none";
  })