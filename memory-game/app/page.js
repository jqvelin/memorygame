'use client'

import './style.scss'
import {useState} from 'react'

const initialCards = [
  {id: 0, flipped: false, guessed: false, content: 'grape', src: '/fruits/grape.png'},
  {id: 1, flipped: false, guessed: false, content: 'pear', src: '/fruits/pear.png'},
  {id: 2, flipped: false, guessed: false, content: 'pineapple', src: '/fruits/pineapple.png'},
  {id: 3, flipped: false, guessed: false, content: 'grape', src: '/fruits/grape.png'},
  {id: 4, flipped: false, guessed: false, content: 'cherry', src: '/fruits/cherry.png'},
  {id: 5, flipped: false, guessed: false, content: 'cherry', src: '/fruits/cherry.png'},
  {id: 6, flipped: false, guessed: false, content: 'strawberry', src: '/fruits/strawberry.png'},
  {id: 7, flipped: false, guessed: false, content: 'pear', src: '/fruits/pear.png'},
  {id: 8, flipped: false, guessed: false, content: 'pineapple', src: '/fruits/pineapple.png'},
  {id: 9, flipped: false, guessed: false, content: 'strawberry', src: '/fruits/strawberry.png'},
  {id: 10, flipped: false, guessed: false, content: 'apple', src: '/fruits/apple.png'},
  {id: 11, flipped: false, guessed: false, content: 'apple', src: '/fruits/apple.png'},
]

let flippedCount = 0

let result = ''

function Board({cards, setCards}){
  function handleClick(id){
    
    if (cards[id].guessed || flippedCount >= 2) return

    setCards(cards.map(card => {
      if (card.id !== id) return card
      card.flipped = true
      return card
    }))

    const flipped = cards.filter(card => card.flipped === true && !card.guessed)

    flippedCount++
    if (flippedCount === 2){
      if (flipped[0].content == flipped[1].content){
        console.log(flipped[0].content, flipped[1].content)
        setCards(cards.map(card => {
          if (card.id === flipped[0].id || card.id === flipped[1].id){
            card.guessed = true
            return card
          } else {
            return card
          }
        }))
        
      } else {
        setTimeout(() => {setCards(cards.map(card => {
          if(!(card.guessed)){
            card.flipped = false
            return card
          } else {
            return card
          }
          
        }))}, 500)
      } 
      setTimeout(() => flippedCount = 0, 500)
    }
  }
  return (
    <>
    <div class="grid">
      {cards.map((card) => {
        return (
          <div onClick={() => handleClick(card.id)} key={card.id} className={card.flipped ? 'card flipped' : 'card'}>
            <div class="card__front">
            </div>
            <div class="card__back">
            <img class="fruit" src={card.src}/>
            </div>
          </div>
        )
      })}
    </div>
    <p hidden={!(cards.filter(card => card.guessed).length == cards.length)} id="result">You Won!</p>
    </>
  )
}


export default function Game(){
  const [cards, setCards] = useState(initialCards)
  function handleRestart(){
    for (let div of document.querySelectorAll('.card')){
      div.classList.remove('flipped')
      setCards(cards.map(card => {
        card.guessed = false
        card.flipped = false
        return card
      }))
    }
    flippedCount = 0
    
  }
  return <main>
    <h1 id="title">Memory Game</h1>
    <Board cards={cards} setCards={setCards}/>
    <button id="restart-btn" onClick={handleRestart}>New Game</button>
      </main>
}