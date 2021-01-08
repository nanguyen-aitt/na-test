import React from "react";
import ImageService from "../services/imageService";
import Sorter from './sorter';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      listImage: [],
    };
  }

  componentDidMount = () => {
    let dataLocal = localStorage.getItem('imageNasa');
    if(dataLocal){
      this.setState({ listImage: JSON.parse(dataLocal) });
    }
  }

  getList = async () => {
    let list = await ImageService.searchImage(this.state.searchText);
    if (list && list.collection && list.collection.items) {
      let listItems = list.collection.items;
      this.setState({ listImage: listItems });
      localStorage.setItem('imageNasa', JSON.stringify(listItems));
    }
  }

  updateImage = (nasa_id, valueChange) => {
    let data = localStorage.getItem('imageNasa');
    let list = JSON.parse(data);
    let getIndex = list.findIndex(item => item.data[0].nasa_id === nasa_id);

    if(valueChange.type === 'edit'){
      let oldTitle = list[getIndex].data[0].title;
      var newTitle = prompt("Please enter change title:", oldTitle);
      if (newTitle !== null && newTitle !== "" && newTitle !== oldTitle) {
        list[getIndex].data[0].title = newTitle;
      }
    }
    else{
      list[getIndex][valueChange.type] = valueChange.value;
    }

    localStorage.setItem('imageNasa', JSON.stringify(list));
    this.setState({ listImage: list });
  }

  render() {
    let { listImage } = this.state;
    return (
      <div>
        <div>
          <input
            onChange={(e) => {
              this.setState({ searchText: e.target.value })
            }}
            type="text"
            placeholder="Input text to search"
          />
          <button
            onClick={() => {
              this.getList();
            }}
          >
            Search</button>
        </div>
        <div id="main">

          <div id="left-container">
            <Sorter />
          </div>
          <div id="right-container">

            <div className="row">
              {listImage.length ? listImage.map((item) => {
                let url = item.links ? item?.links[0]?.href : null;
                if(url){
                  return (
                    <div className="column">
                      <div>
                        <img src={item.links[0].href} className='image-item' />
                      </div>
                      <div className='label-item'>
                        <label >
                          {item.data[0].title}
                        </label>
                      </div>
                      <div>
                        <button
                          onClick={() => this.updateImage(item.data[0].nasa_id, {type: 'like', value: !item.like}) }
                        >
                          {!item.like ? 'Like' : 'Unlike'}
                        </button>
                        <button
                          onClick={() => this.updateImage(item.data[0].nasa_id, {type: 'remove', value: !item.remove}) }
                        >
                          {!item.remove ? 'Remove' : 'Undo'}
                        </button>
                        <button
                          onClick={() => this.updateImage(item.data[0].nasa_id, {type: 'edit'}) }
                        >Edit
                        </button>
                      </div>
                    </div>
                  )
                }
                else{
                  return(
                  <div id="video-container">
                    <h1 className="movie-title">Movie title</h1>
                    <video className="videoplayer" id="video-player_transformed" playsInline autoPlay muted>
                      <source src="https://storage.googleapis.com/coverr-main/mp4/Sunset-Desert-Run.mp4" type="video/mp4" />
                    </video>
                  </div>
                  )
                }
              })
              : null}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default List;
