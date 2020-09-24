import React from 'react';
import Navbar from "components/navbar/Navbar.js"
import {Switch, Route} from "react-router-dom";
import Splash from "views/Splash/Splash.js"
import About from "views/About/About.js"
import { Layout } from 'antd';
import './App.css'

const { Header, Footer, Content } = Layout; 

const App = () => {
  return (
    <React.Fragment>
      <Layout className="layout">
        <Header>
          <Navbar />
        </Header>
        <Content>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route path="/about" component={About} />
          </Switch>
        </Content>
        <Footer>
        </Footer>
      </Layout>
    </React.Fragment>
  );
}

export default App;
