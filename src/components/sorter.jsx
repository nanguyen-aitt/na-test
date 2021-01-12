import React from "react";

class Sorter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'date_created',
      value: 'asc'
    };
  }

  changeShowPopup = (functionOpen, isSubmit) => {
    let dialog = document.getElementById("dialog");
    let mask = document.getElementById("mask");

    mask.classList[functionOpen]("hidden");   // Show the mask
    dialog.classList[functionOpen]("hidden"); // Show the dialog

    if(isSubmit){
      this.props.onSubmit(this.state.type, this.state.value);
    }
  }

  render() {
    let direction = {
      date_created: [
        { title: "newest", value: "asc" },
        { title: "oldest", value: "desc" },
      ],
      title: [
        { title: "a-z", value: "asc" },
        { title: "z-a", value: "desc" }
      ]
    }
    return (
      <>
        <button className="button-search"  id="show" onClick={() => this.changeShowPopup('remove')}><i className="fa fa-sort"/> </button>
        <div id="mask" className="hidden" />
        <div id="dialog" className="hidden">
          <h3>Please select attribute to sort</h3>
          <div className='select-dialog'>
            <select className='select-type' name="type" id="type" onChange={(e) => this.setState({ type: e.target.value })}>
              <option value="date_created">Date created</option>
              <option value="title">Title</option>
            </select>


            <select className='select-value' name="value" id="value" onChange={(e) => this.setState({ value: e.target.value })}>
              {direction[this.state.type].map(item => {
                return (<option value={item.value}>{item.title}</option>)
              })
              }
            </select>
          </div>
          <div className='footer-dialog'>
            <input className='select-button-ok' type="button" defaultValue="OK" id="hide" onClick={() => this.changeShowPopup('add', true)} />
            <input className='select-button-cancel' type="button" defaultValue="Cancel" id="hide" onClick={() => this.changeShowPopup('add')} />
          </div>
        </div>
        <div id="result" />
      </>
    );
  }
}

export default Sorter;
