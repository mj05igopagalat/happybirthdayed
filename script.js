const confettiLayer = document.querySelector("#confetti-layer");
const celebrateButton = document.querySelector("#celebrate-button");
const musicButton = document.querySelector("#music-button");
const music = document.querySelector("#birthday-music");
const musicNote = document.querySelector("#music-note");
const openLetterButton = document.querySelector("#open-letter");
const closeLetterButton = document.querySelector("#close-letter");
const letterDialog = document.querySelector("#letter-dialog");
const heroConfetti = document.querySelector(".hero-confetti");

function createConfetti(container, count, className) {
  const colors = ["#b86f78", "#d9ad72", "#8d9b7c", "#e7c4b8", "#a989a3"];

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = className;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    if (className === "confetti") {
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
      piece.addEventListener("animationend", () => piece.remove(), { once: true });
    } else {
      piece.style.setProperty("--fall-delay", `${-Math.random() * 8}s`);
      piece.style.setProperty("--fall-duration", `${5 + Math.random() * 5}s`);
      piece.style.setProperty("--fall-drift", `${Math.random() * 100 - 50}px`);
    }
    container.append(piece);
  }
}

createConfetti(heroConfetti, 36, "hero-confetti-piece");

openLetterButton.addEventListener("click", () => {
  letterDialog.showModal();
  closeLetterButton.focus();
});

closeLetterButton.addEventListener("click", () => {
  letterDialog.close();
  openLetterButton.focus();
});

letterDialog.addEventListener("click", (event) => {
  if (event.target === letterDialog) {
    letterDialog.close();
    openLetterButton.focus();
  }
});

celebrateButton.addEventListener("click", () => {
  createConfetti(confettiLayer, 70, "confetti");
});

musicButton.addEventListener("click", async () => {
  musicNote.textContent = "";

  if (!music.paused) {
    music.pause();
    musicButton.setAttribute("aria-pressed", "false");
    musicButton.innerHTML = '<span aria-hidden="true">♫</span> Play a little music';
    return;
  }

  if (!music.getAttribute("src")) {
    musicNote.textContent = "The music file is not connected yet. Check the audio source in index.html.";
    return;
  }

  try {
    await music.play();
    musicButton.setAttribute("aria-pressed", "true");
    musicButton.innerHTML = '<span aria-hidden="true">♫</span> Pause the music';
  } catch (error) {
    if (error.name === "NotSupportedError") {
      musicNote.textContent = "The audio file could not be played. Check the source path and file format.";
      return;
    }

    musicNote.textContent = "The music could not be played. Check the audio file and try again.";
  }
});
