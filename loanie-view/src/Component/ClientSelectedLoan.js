import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import ProgressBar from './ProgressBar';
import PhaseContent from './PhaseContent';

import '../CSS/ClientSelectedLoan.css';

export default class ClientSelectedLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      checked: [],
      borrower: '',
      coBorrower: 'Bob',
      type: 'New Purchase',
      amount: '',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  componentDidMount() {
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    const body = { token: this.state.tokenId };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        // console.log(res.data.name);
        const userName = res.data.name;
        axios
          .get(`http://localhost:3030/loan/${getLoanId}`)
          .then((loandata) => {
<<<<<<< HEAD
            // console.log(loandata.data);
            const assignArr = loandata.data.assignments;
            for (let j = 0; j < assignArr.length; j += 1) {
              this.state.assignments.push(assignArr[j].text);
              this.state.checked.push(assignArr[j].complete);
            }
            this.setState({
              borrower: userName,
              amount: loandata.data.amount,
              type: loandata.data.loanType,
            });
            // console.log(this.state.phase);
=======
            console.log(loandata.data);
            loandata.data.assignments.map((val) => {
              this.state.assignments.push(val.text);
              this.state.checked.push(val.complete);
              console.log(loandata.data.currentStatus);
              this.setState({
                borrower: userName,
                amount: loandata.data.amount,
                phase: loandata.data.currentStatus,
                type: loandata.data.loanType,
              });
              return val;
            });
>>>>>>> 9909a34cc4e035e3581ef6066a42ee4685062cf8
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // getter
    const token = this.state.tokenId;
    // console.log(sessionStorage.getItem('tokenId'));
    // console.log('state tokenId:', token);
<<<<<<< HEAD
    // console.log(this.state.phase);
=======
    console.log(this.state.phase);
>>>>>>> 9909a34cc4e035e3581ef6066a42ee4685062cf8
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem active>Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
<<<<<<< HEAD
        <div className="ClientLoan-title-container">
          <h1><b>Loan Progress</b></h1>
        </div>
        <div className="ClientLoan-container">
          <div className="ClientLoan-borrower-container">
            <p><b>Borrower: </b>{this.state.borrower}</p>
            <p><b>Co-Borrower: </b>{this.state.coBorrower}</p>
            <p><b>Type: </b>{this.state.type}</p>
            <p><b>Amount: </b>{this.state.amount}</p>
=======
        <div className="MyLoans-title-container">
          <h1>
            <b>Loan Progress</b>
          </h1>
        </div>
        <div className="MyLoans-container">
          <div className="MyLoans-borrower-container">
            <p>
              <b>Borrower: </b>
              {this.state.borrower}
            </p>
            <p>
              <b>Co-Borrower: </b>
              {this.state.coBorrower}
            </p>
            <p>
              <b>Type: </b>
              {this.state.type}
            </p>
            <p>
              <b>Amount: </b>
              {this.state.amount}
            </p>
>>>>>>> 9909a34cc4e035e3581ef6066a42ee4685062cf8
          </div>
          <div className="ClientLoan-progress-container">
            <ProgressBar />
          </div>
        </div>
        <div className="ClientLoan-content-container">
          <div className="ClientLoan-assignment-container">
            <div className="ClientLoan-input-container">
              <div className="ClientLoan-p1-item">
                <p> Your loan officer will update these boxes as they recieve your documents</p>
              </div>
              <br />
              {this.state.assignments.map((val, index) => {
                if (this.state.checked[index] !== false) {
                  return (
                    <p>
                      {val} <input type="checkbox" disabled="disabled" checked />
                    </p>
                  );
                }
                return (
                  <p>
                    {val} <input type="checkbox" disabled="disabled" />
                  </p>
                );
              })}
            </div>
            <br />
            <p>
              {' '}
              If you have any questions call Bob Officer: <br />1-800-000-000
            </p>
          </div>
          <div className="ClientLoan-text-container">
            <div className="ClientLoan-text-item">
              <PhaseContent />
            </div>
          </div>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
