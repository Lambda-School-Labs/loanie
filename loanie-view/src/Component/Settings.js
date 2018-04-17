import React, { Component } from 'react';
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';

import '../CSS/Settings.css';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      subExp: '',
      phoneNumber: '',
      name: '',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }

  componentDidMount() {
    const base = 'http://localhost:3030' || 'https://loanie.herokuapp.com';
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post(`${base}/user`, body)
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          phoneNumber: res.data.mobilePhone,
          subExp: res.data.subExp,
        });
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
  }

  submitChanges = () => {
    console.log('sending to DB');
    this.send();
    // window.location = '/my_loans';
  };

  send() {
    const base = 'http://localhost:3030' || 'https://loanie.herokuapp.com';
    const userInfo = {
      name: this.state.name,
      email: this.state.email,
      mobilePhone: this.state.phoneNumber,
      token: this.state.tokenId,
    };
    console.log('sending to db:', userInfo);
    axios
      .post(`${base}/edituser`, userInfo)
      .then((res) => {
        console.log('Success response: ', res);
      })
      .catch((err) => {
        console.log('Failed to make changes to user!', err);
      });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePhoneChange = (telNumber, selectedCountry) => {
    console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
    this.setState({ phoneNumber: telNumber });
  };

  handleInputBlur = (telNumber, selectedCountry) => {
    console.log(
      'Focus off the ReactTelephoneInput component. Tel number entered is: ',
      telNumber,
      ' selected country is: ',
      selectedCountry,
    );
  };

  render() {
    // render getter
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    return (
      <div className="Settings">
        <Navbar />
        <SideBarNav />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/open_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Settings</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="Settings-title-containter">
          <h1>Settings</h1>
        </div>
        <div className="Settings-form-container">
          <form>
            <fieldset>
              <legend>Personal information:</legend>
              <div>
                <p>Name:</p>
                <input
                  type="text"
                  name="name"
                  value={this.state.name || ''}
                  onChange={this.handleNameChange}
                />
              </div>
              <br />
              <br />
              <div>
                <p>Phone Number:</p>{' '}
                <ReactTelephoneInput
                  defaultCountry="us"
                  flagsImagePath="/Images/flags.png"
                  value={this.state.phoneNumber}
                  onChange={this.handlePhoneChange}
                  onBlur={this.handleInputBlur}
                />
              </div>
              <br />
              <br />
              <p>Subscription expiration date: {this.state.subExp}</p>
              <button onClick={this.send}>Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
