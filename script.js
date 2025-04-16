
    const letters = 'A B C D E F G H'.split(' ');
    let cardValues = [...letters, ...letters]; // 16 cards total
    cardValues = cardValues.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('gameBoard');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    function createCard(letter) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.letter = letter;
      card.textContent = '';
      card.addEventListener('click', flipCard);
      return card;
    }

    function flipCard() {
      if (lockBoard || this.classList.contains('face-up')) return;

      this.textContent = this.dataset.letter;
      this.classList.add('face-up');

      if (!firstCard) {
        firstCard = this;
      } else {
        secondCard = this;
        lockBoard = true;

        if (firstCard.dataset.letter === secondCard.dataset.letter) {
          firstCard = null;
          secondCard = null;
          lockBoard = false;
          matchedPairs++;
          if (matchedPairs === 8) {
            setTimeout(() => alert('You win! All pairs matched!'), 500);
          }
        } else {
          setTimeout(() => {
            firstCard.classList.remove('face-up');
            firstCard.textContent = '';
            secondCard.classList.remove('face-up');
            secondCard.textContent = '';
            firstCard = null;
            secondCard = null;
            lockBoard = false;
          }, 1000);
        }
      }
    }

    cardValues.forEach(letter => {
      const card = createCard(letter);
      gameBoard.appendChild(card);
    });
  
