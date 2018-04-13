import React, { Component } from 'react';
import axios from 'axios';
import PhaseContent from './PhaseContent';
import '../CSS/ProgressBar.css';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      currentPhase: '',
      totalPhases: 0,
      phaseArr: [],
    };
  }
  componentDidMount() {
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    axios
      .get(`http://localhost:3030/loan/${getLoanId}`)
      .then((loandata) => {
        const filteredLoans = PhaseContent.filter(post =>
          post.loanType.includes(loandata.data.loanType));
        const totalPhaseNo = filteredLoans.length;
        console.log(filteredLoans.length);
        this.setState({
          phaseArr: filteredLoans,
          currentPhase: loandata.data.currentStatus,
          progressValue: Number(loandata.data.currentStatus) * (100 / totalPhaseNo),
          totalPhases: totalPhaseNo,
        });
        console.log(this.state.phaseArr);
        console.log(this.state.totalPhases);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let progressBarStyle = {};
    if (this.state.totalPhases === 5) {
      progressBarStyle = { marginLeft: '9.8em' };
    } else if (this.state.totalPhases === 6) {
      progressBarStyle = { marginLeft: '8em' };
    } else if (this.state.totalPhases === 8) {
      progressBarStyle = { marginLeft: '5.9em' };
    } else {
      progressBarStyle = { marginLeft: '6em' };
    }
    return (
      <div className="ProgressBar">
        <div className="progress ProgressBar-container">
          <div
            className="progress-bar ProgressBar-style progress-bar-success"
            role="progressbar"
            aria-valuenow={this.state.progressValue}
            style={{ width: `${((this.state.progressValue / (100 / this.state.totalPhases)) * (68.5 / this.state.totalPhases))}em` }}
          >
            Current Phase: {this.state.currentPhase}
          </div>
        </div>
      </div>
    );
  }
}
