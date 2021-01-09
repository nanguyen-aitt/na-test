import React from "react";

class showImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    if(this.props.listImage.length){
      this.setState({listImage: this.props.listImage});
    }
  }

  render() {
    let { updateImage, listImage } = this.props;
    return (
      <div className="row">
        {listImage.length ? listImage.map((item) => {
            return (
              <div key={item.data[0].nasa_id} className="column">
                <div>
                  {item.links ?
                  <img alt={item.data[0].title} src={item.links ? item.links[0].href : null} className='image-item' />
                  :
                  <video className="image-item" id="video-player_transformed" playsInline autoPlay muted>
                    <source src="https://storage.googleapis.com/coverr-main/mp4/Sunset-Desert-Run.mp4" type="video/mp4" />
                  </video>
                  }
                </div>
                <div className='label-item'>
                  <label >
                    {item.data[0].title}
                  </label>
                </div>
                <div>
                  <button
                    onClick={() => updateImage(item.data[0].nasa_id, { type: 'like', value: !item.like })}
                  >
                    {!item.like ? 'Like' : 'Unlike'}
                  </button>
                  <button
                    onClick={() => updateImage(item.data[0].nasa_id, { type: 'remove', value: !item.remove })}
                  >
                    {!item.remove ? 'Remove' : 'Undo'}
                  </button>
                  <button
                    onClick={() => updateImage(item.data[0].nasa_id, { type: 'edit' })}
                  >Edit
                        </button>
                </div>
              </div>
            )
        })
          : null}
      </div>

    );
  }
}

export default showImage;
