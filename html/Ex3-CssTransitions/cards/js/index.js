const cardContainer = document.querySelector('.cards')


cardContainer.addEventListener('click', e => {
  const cardInfoBtn = e.target.closest('.card__more-info')
  const cardLessBtn = e.target.closest('.card__less-info')
  
  if (cardInfoBtn) {
    cardInfoBtn.parentNode.parentNode.classList.add('card--open')
  }
  
  if (cardLessBtn) {
    cardLessBtn.parentNode.parentNode.classList.remove('card--open')
  }
})