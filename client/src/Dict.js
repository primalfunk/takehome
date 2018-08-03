import React, { Fragment } from 'react'
import { Container, Header, Segment, Form, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'

class Dict extends React.Component {
  state = { word: [], query: '' }

  handleSubmit = e => {
    e.preventDefault()
    axios.get(`/api/words/${this.state.query}`)
      .then(res => this.setState({ word: res.data.results }))
      .catch(res => { console.log(res.errors) })
    this.setState({ query: '' })
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value })
  }

  render() {
    const word  = this.state.word
    console.log(word)
    return (
      <Fragment>
        <MyHeader>DevPoint Studios Dev Application: Take Home Project</MyHeader>
        <DictContainer>
          <MySegment>
            <MyHeader>Search the Oxford Dictionary&nbsp;<a href="https://developer.oxforddictionaries.com/">API</a></MyHeader>
            <Form onSubmit={this.handleSubmit} style={{"display": "flex","flexDirection": "column"}}>
            <Form.Input 
              type="text" 
              value={this.state.query}
              onChange={this.handleChange}
              placeholder="Search a word..." />
            <MyButton type="submit" content="Submit" />
          </Form>
          </MySegment>
        </DictContainer>
        <DictContainer style={{ "backgroundColor": "white" }}>
          { word.length > 0 ?
            <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "width": "30vw", "height": "auto" }}>
              <p>{`Results for: `}<b>{word[0].id}</b></p>
                { word[0].lexicalEntries.map(l => (
                <div key={l.lexicalCategory} style={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
                  <i style={{ "fontSize": "14px" }}>{ l.lexicalCategory }</i>
                  { l.entries.map(e => (
                    <div key={e.senses[0].definitions[0]} style={{ "fontSize": "10px", "margin": "3px" }}>
                      {`-   ${e.senses[0].definitions[0]}`}
                    </div>
                  ))}

                </div>
              ))
            }
            </div>
            : null}
          </DictContainer>
      </Fragment>
    )
  }
}

const MyButton = styled(Button)`
  width: 80px;
  margin-top: 10px;
`

const MyHeader = styled(Header)`
  display: flex;
  margin: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`

const MySegment = styled(Segment)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: "light-gray";
  margin: 20px;
  padding: 20px;
  border: 1px dashed gray;
`

const DictContainer = styled(Container)`
  display: flex;
  background-color: gray;
  height: 40vh;
  width: 100vw;
  justify-content: center;
`

export default Dict