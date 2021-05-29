import React, { useState, useEffect } from 'react'
import { generatePizzaImage } from '../functions/pizza'
import { getPizza } from '../functions/getPizza'
import { giftPizza } from '../functions/giftPizza'
import { eatPizza } from '../functions/eatPizza'

export function Inventory(props) {
  const [inventories, setInventories] = useState([])
  const [action, setAction] = useState(true)

  const inventory = async () => {
    const addr = props.accounts[0]
    const address = addr.toString()
    const pizzas = await getPizza(address)
    setInventories(pizzas)
  }

  const gift = async (value) => {
    const sendTo = prompt('Enter address which should receive your Pizza')

    if (!isValidAddress(sendTo)) {
      showStatus('Please enter a valid address')
      return
    }

    var audio = new Audio(
      'https://studio.ethereum.org/static/img/cryptopizza/2.mp3',
    )
    audio.play()

    setAction(false)
    await giftPizza(props.accounts, sendTo, value)
    setAction(true)
    showStatus('Pizza will be sent.')
  }

  const eat = async (value) => {
    const confirmation = window.confirm('Are you sure?')
    let result
    if (confirmation) {
      setAction(false)
      var audio = new Audio(
        'https://studio.ethereum.org/static/img/cryptopizza/3.mp3',
      )
      audio.play()
      result = await eatPizza(props.accounts, value)
      showStatus('Pizza will be gone.')
      setAction(true)
    } else {
      showStatus('Eating canceled.')
    }
  }

  const isValidAddress = (address) => {
    return /^(0x)?[0-9a-f]{40}$/i.test(address)
  }

  const showStatus = (text) => {
    var status = document.getElementById('status')
    status.innerHTML = text
    status.className = 'show'
    setTimeout(function () {
      status.className = status.className.replace('show', '')
    }, 3000)
  }

  useEffect(() => {
    inventory()
  })

  return (
    <div>
      <div id="status"></div>
      <hr />
      <h2>Your Inventory</h2>
      <div className="row">
        {inventories.map((cell, i) => (
          <div className="col-md-4">
            <div className="pizza-container">
              <div>
                <p>
                  <span className="float-left">{cell['name']}</span>
                  <span className="pizzaDna float-right">{cell['id']}</span>
                </p>
                <div className="pizza-inner-container">
                  <img
                    className="pizza-frame"
                    alt="pizza frame"
                    src="https://studio.ethereum.org/static/img/cryptopizza/container.jpg"
                  />
                  <img
                    alt="pizza"
                    src="https://studio.ethereum.org/static/img/cryptopizza/corpus.png"
                  />
                  <div id="pizza-ingredients-container" className="ingredients">
                    <div>{generatePizzaImage(cell['nda'])}</div>
                  </div>
                </div>
                <div className="action-buttons">
                  {action && (
                    <button
                      className="btn button-gift"
                      onClick={() => gift(cell['id'])}
                    >
                      Gift
                    </button>
                  )}
                  {action && (
                    <button
                      className="btn button-eat"
                      onClick={() => eat(cell['id'])}
                    >
                      Eat
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
