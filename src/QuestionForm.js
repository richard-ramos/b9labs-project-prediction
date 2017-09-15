import React, { Component } from 'react'


class QuestionForm extends Component {

  render() {
    return (
        <div>
          <h5>Create Question</h5>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <input type="text" className="form-control" id="exampleFormControlSelect1" placeholder="Question Text" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input type="text" className="form-control" id="exampleFormControlSelect1" placeholder="Administrator 0x0000" />
              </div>
            </div>
            <div className="col">
              <button type="button" className="btn btn-primary">Create Question</button>
            </div>
          </div>
        </div>
    );
  }
  
}

export default QuestionForm;  