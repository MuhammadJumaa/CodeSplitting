import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Page1 from './components/page1';
// import Page2 from './components/page2';
// import Page3 from './components/page3';
import AsyncComponent from './components/AsyncComponent';
class App extends Component {
  constructor (){
    super();
    this.state={
      route:'Page1',
      component:null
    }
  }
  onRouteChange=(route)=>{
    //no code splitting:
    //this.setState({route});
    //code splitting:
     console.log(route);
    if(route==='page1'){
       import('./components/page1').then((Page1)=>{
        this.setState({route:route,component:Page1.default})
      })
    }else if(route==='page2'){
      import('./components/page2').then((Page2)=>{
        this.setState({route:route,component:Page2.default})
      })
    }else if(route==='page3'){
      import('./components/page3').then((Page3)=>{
        this.setState({route:route,component:Page3.default})
      })
    }
  }
  render() {
    
      if(this.state.route==='page1'){
      return <Page1  onRouteChange={this.onRouteChange}/>
     }      
     else if(this.state.route==='page2'){
      const AsyncPage2= AsyncComponent(()=> import('./components/page2'));
        return <AsyncPage2  onRouteChange={this.onRouteChange}/>
     }
      else{
       const AsyncPage3= AsyncComponent(()=> import('./components/page3'));
        return <AsyncPage3  onRouteChange={this.onRouteChange}/>   
      }
    //  if(this.state.route==='Page1'){     
    //   return <Page1  onRouteChange={this.onRouteChange}/>
    // }else{
    //   return <this.state.component onRouteChange={this.onRouteChange} />
    // }
    
  }
}

export default App;
