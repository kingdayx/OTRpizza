import React, { useState } from 'react'
import { Inventory } from './inventory'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import '../App.css'
import { Create } from './create'
import Party from './party'

export default function Toggle(props) {
  return (
    <div>
      <h1>OTR Bake Sale</h1>
      <Router>
        <Link to="/create">
          <button id="create-tab" className="tablinks active">
            Create new
          </button>
        </Link>
        <Link to="/inventory">
          <button id="inventory-tab" className="tablinks">
            Inventory
          </button>
        </Link>
        <Link to="/stake">
          <button id="inventory-tab" className="tablinks">
            Stake
          </button>
        </Link>
        <Switch className="tab">
          <Route path="/create">
            <Create
              accounts={props.accounts}
              gas={props.input}
              handleChange={props.handleChange}
            />
          </Route>
          <Route path="/inventory">
            <Inventory gas={props.input} accounts={props.accounts} />
          </Route>
          <Route path="/stake">
            <Party
              gas={props.input}
              accounts={props.accounts}
              handleChange={props.handleChange1}
              value={props.value}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
