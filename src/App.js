import React, { Component } from 'react'

import './App.css'
import axios from 'axios'

class App extends Component {
  CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/'

  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      author: '',
      image: ''
    }
  }

  componentDidMount = () => {
    axios
      .get(
        'https://api.unsplash.com/photos/random?count=1&client_id=a99ca210f159a57ffe3e1ee488fc1d1930614d06093b49671699a5319fc88309'
      )
      .then(response => {
        console.log(response.data[0].urls.regular)
        this.setState({
          image: response.data[0].urls.regular
        })
      })
    axios
      .get(
        `${
          this.CORS_ANYWHERE_URL
        }http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`
      )
      .then(response => {
        this.setState({
          quote: response.data.quoteText,
          author: response.data.quoteAuthor,
          link: response.data.quoteLink
        })
      })
  }
  insertQuote = () => {
    if (this.state.quote) {
      return (
        <div className="quote">
          <p>{this.state.quote}</p>
          <h6>-{this.state.author}</h6>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Inspirational Quotes</h1>
          <h3 onClick={this.componentDidMount}>Get New Quote</h3>
        </header>
        <main>
          <img src={this.state.image} alt="UnSplash" />
          {this.insertQuote()}
        </main>
        <footer>
          <p>&copy; QuirkFactory.Co</p>
        </footer>
      </div>     
    )
  }
}

export default App; 

