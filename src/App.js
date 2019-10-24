import React from "react"
import logo from "./logo.png"
import "./App.css"
import ReactTable from "react-table"
import "react-table/react-table.css"
import motosumo from "./api/motosumo"

class App extends React.Component {
  state = {
    id: 42,
    event: []
  }

  fetchEvent = async id => {
    console.log("fetching event..")
    const response = await motosumo.get("/event", {
      params: {
        id: id
      }
    })
    console.log(response)
    this.setState({
      event: response.data
    })
  }

  componentDidMount() {
    // fetch event now, and then every 1 minute
    this.fetchEvent(this.id)
    this.timer = setInterval(() => this.fetchEvent(), 60000)
  }

  componentDidUpdate() {
    console.log("UPDATE: ", this.state.event)
  }

  render() {
    const columns = [
      {
        Header: "Chain",
        accessor: "chain"
      },
      {
        Header: "Gym",
        accessor: "center"
      },
      {
        Header: "Distance",
        accessor: "distance"
      },
      {
        Header: "kcal",
        accessor: "kcal"
      },
      {
        Header: "Hours",
        accessor: "hours"
      },
      {
        Header: "Unique members",
        accessor: "n_users"
      }
    ]

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to the Motosumo Global Event site!</p>
          <div className="App-table">
            <ReactTable data={this.state.event} columns={columns} />
          </div>
          <p className="App-link">
            Powered by&nbsp;
            <a
              className="App-link"
              href="https://motosumo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Motosumo
            </a>
          </p>
        </header>
      </div>
    )
  }
}

export default App
