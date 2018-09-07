import React, { Component } from "react";
import Loadable from "react-loadable";
import Header from "./components/Header";
import "./App.css";
//import AsyncComponent from './components/AsyncComponent';
//import Page1 from './components/page1';
// import Page2 from './components/page2';
// import Page3 from './components/page3';

const loading = props => {
    if (props.error) {
      return (
        <div>
          Error! <button onClick={props.retry}>Retry</button>
        </div>
      );
    } else if (props.timedOut) {
      return (
        <div>
          Taking a long time... <button onClick={props.retry}>Retry</button>
        </div>
      );
    } else if (props.pastDelay) {
      return "Loading...";
    } else {
      return null;
    }
  };



class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "page1",
      component: null
    };
  }
  onRouteChange = route => {
    //no code splitting:
    //this.setState({route});
    //code splitting:

    import("./components/" + route).then(PageResult => {
      this.setState({ route: route, component: PageResult.default });
    });
    // if(route==='page1'){
    //    import('./components/page1').then((Page1)=>{
    //     this.setState({route:route,component:Page1.default})
    //   })
    // }else if(route==='page2'){
    //   import('./components/page2').then((Page2)=>{
    //     this.setState({route:route,component:Page2.default})
    //   })
    // }else if(route==='page3'){
    //   import('./components/page3').then((Page3)=>{
    //     this.setState({route:route,component:Page3.default})
    //   })
    //}
  };
  
  renderPage() {
    const LoadableComponent = Loadable({
      loader: () => import("./components/" + this.state.route.toLowerCase()),
      loading: loading,
      timeout: 1000
    });
    return <LoadableComponent onRouteChange={this.onRouteChange} />;
    // const AsyncPage= AsyncComponent(()=> import('./components/'+this.state.route.toLowerCase()));
    //   return <AsyncPage  onRouteChange={this.onRouteChange}/>
    // if(this.state.route==='page1'){
    //    const AsyncPage1= AsyncComponent(()=> import('./components/page1'));
    //      return <AsyncPage1  onRouteChange={this.onRouteChange}/>
    //   }
    //   else if(this.state.route==='page2'){
    //    const AsyncPage2= AsyncComponent(()=> import('./components/page2'));
    //      return <AsyncPage2  onRouteChange={this.onRouteChange}/>
    //   }
    //    else{
    //     const AsyncPage3= AsyncComponent(()=> import('./components/page3'));
    //      return <AsyncPage3  onRouteChange={this.onRouteChange}/>
    //    }
  }

  render() {
    return (
      <div className="App">
        <Header PageName={this.state.route} />
        {this.renderPage()}
      </div>
    );
    //  if(this.state.route==='Page1'){
    //   return <Page1  onRouteChange={this.onRouteChange}/>
    // }else{
    //   return <this.state.component onRouteChange={this.onRouteChange} />
    // }
  }
}

export default App;
