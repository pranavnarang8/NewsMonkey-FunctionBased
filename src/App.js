// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
//class based components
//here we use render to return components but in function based component we use a function to do the same
//there's also a diff in usage of states and props
import React from 'react'
import { useState } from 'react';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App = ()=> {
  let pageSize = 12;
  let apiKey = process.env.REACT_APP_NEWS_API;
  // state={
  //   progress:0
  // }
  const[progress,setProgress] = useState(0)

  // const setProgress = (progress)=>{
  //   // this.setState({progress: progress})
  //   setProg(progress);
  // }
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
        // onLoaderFinished={() => setProgress(0)}
      />
        {/* <News setProgress={progress} apiKey={apiKey} pageSize={pageSize} country="in" category="general"/> */}
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="gen" pageSize={pageSize} country="in" category="general"/></Route>
          <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/></Route>
          <Route exact path="/general"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/></Route>
        </Switch>
        </Router>
      </div>
    )
 
}

export default App
