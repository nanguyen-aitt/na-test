import React from "react";
import ImageService from "../services/imageService";

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
      
    }
  }

  render() {
    let { type } = this.state;
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
      <div>
        <input type="button" defaultValue="Show Dialog" id="show" onClick={() => this.changeShowPopup('remove')} />
        <div id="mask" className="hidden" />
        <div id="dialog" className="hidden">
          <h1>Please pick a color</h1>
          <label htmlFor="type">Choose a attribute:</label>

          <select name="type" id="type" onChange={(e) => this.setState({ type: e.target.value })}>
            <option value="date_created">date_created</option>
            <option value="title">title</option>
          </select>

          <label htmlFor="value">Choose a direction:</label>

          <select name="value" id="value" onChange={(e) => this.setState({ value: e.target.value })}>
            {direction[this.state.type].map(item => {
              return (<option value={item.value}>{item.title}</option>)
            })
            }
          </select>
          <footer>
            <input type="button" defaultValue="OK" id="hide" onClick={() => this.changeShowPopup('add', true)} />
            <input type="button" defaultValue="Cancel" id="hide" onClick={() => this.changeShowPopup('add')} />
          </footer>
        </div>
        <div id="result" />
      </div>
    );
  }
}

export default Sorter;
