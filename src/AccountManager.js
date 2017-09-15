import React, { Component } from 'react'


class AccountManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      balance: ""
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    if(this.state.value !== ""){
      this.setState({selectedAccount: this.state.value});
      this.props.selectAccountHandler(this.state.value);
    }
  }

  render() {
    let accounts = this.props.list || [];
    
    return (
        <div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <select className="form-control" value={this.state.value} onChange={this.handleChange}  id="exampleFormControlSelect1">
                 <option value="" >Select</option>
                  {
                    accounts.map(function(account){
                      return <option key={account} value={account}>{account}</option>;
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={this.handleClick} >Select</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {
                this.state.selectedAccount != null &&
                  <span><b>Selected Account:</b> {this.state.selectedAccount} ({this.props.balance} wei)</span>
              }
            </div>
          </div>
        </div>
    );
  }
}

export default AccountManager;  