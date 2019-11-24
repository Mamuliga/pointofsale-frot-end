import React from "react";
import { connect } from "react-redux";
import { simpleAction } from "./store/actions/simpleAction";
import MaterialUIButtons from "./components/uis/materialUiButton";
import VectorIcon from "./components/uis/VectorIcon";
import { heart, pause, play } from "./assets/vectorIcons";
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

function App(props) {
  return (
    <div className="App">
      <pre>
        {JSON.stringify(props)}
      </pre>
      <header className="App-header">
        EIP POS FRONT END
        <MaterialUIButtons />
        <VectorIcon name={heart} /> <VectorIcon name={play} />
        <VectorIcon name={pause} />
        <button onClick={() => props.simpleAction()}>Click me</button>
        <DatePicker />
      </header>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
