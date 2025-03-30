const counterDisplay = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');
const likesList = document.querySelector('.likes');

let count = 0;
let timer;
let isPaused = false;
const likes = {};

function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            count++;
            counterDisplay.textContent = count;
        }
    }, 1000);
}

plusBtn.addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
});

minusBtn.addEventListener('click', () => {
    count--;
    counterDisplay.textContent = count;
});

heartBtn.addEventListener('click', () => {
    if (!likes[count]) {
        likes[count] = 1;
        const li = document.createElement('li');
        li.id = `like-${count}`;
        li.textContent = `${count} has been liked 1 time`;
        likesList.appendChild(li);
    } else {
        likes[count]++;
        const li = document.querySelector(`#like-${count}`);
        li.textContent = `${count} has been liked ${likes[count]} times`;
    }
});

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(timer);
        pauseBtn.textContent = 'resume';
        [plusBtn, minusBtn, heartBtn].forEach(btn => btn.disabled = true);
    } else {
        startTimer();
        pauseBtn.textContent = 'pause';
        [plusBtn, minusBtn, heartBtn].forEach(btn => btn.disabled = false);
    }
});

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const comment = commentInput.value.trim();
    if (comment) {
        const p = document.createElement('p');
        p.textContent = comment;
        commentsList.appendChild(p);
        commentInput.value = '';
    }
});

startTimer();
