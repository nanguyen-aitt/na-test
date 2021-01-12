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
                <div className='images'>
                  {item.links ?
                  <img alt={item.data[0].title} src={item.links ? item.links[0].href : null} className='image-item' />
                  :
                  <video className="image-item" id="video-player_transformed" playsInline autoPlay muted>
                    <source src="https://storage.googleapis.com/coverr-main/mp4/Sunset-Desert-Run.mp4" type="video/mp4" />
                  </video>
                  }
                </div>
                <div className='buttons'>
                  <button className={['button-item', item.like ? 'button-liked' : 'button-unliked'].join(' ')} 
                    onClick={() => updateImage(item.data[0].nasa_id, { type: 'like', value: !item.like })}
                  >
                    <i className="fa fa-thumbs-up"/>
                  </button>
                  <button className={['button-item', item.remove ? 'button-removed' : 'button-unliked'].join(' ')} 
                    onClick={() => updateImage(item.data[0].nasa_id, { type: 'remove', value: !item.remove })}
                  >
                    <i className="fa fa-trash"/>
                  </button>
                  <button className={['button-item', 'button-unliked'].join(' ')} 
                    onClick={() => updateImage(item.data[0].nasa_id, { type: 'edit' })}
                  >
                    <i className="fa fa-edit"/>
                  </button>
                </div>
                <div className='label-item'>
                  <label >
                    {item.data[0].title}
                  </label>
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
