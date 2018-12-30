import React, {PureComponent} from 'react';
import Gallery from './Gallery/Gallery';
import Lightbox from 'react-images';


class PhotoGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0,photos:props.photos};
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.deletePhotoItem = this.deletePhotoItem.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  deletePhotoItem(e, obj){
      
    if (this.state.photos){
        this.state.photos.splice(obj.index,1);
        //this.setState({photos:photos});
        const {deleteCallback} = this.props;
        deleteCallback(this.state.photos);
    }
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  componentWillReceiveProps(nextProps) {
      this.setState({photos:nextProps.photos});
      this.forceUpdate();
  }
  
  render() {
    // /const {photos} = this.props;
    //
    const {deleteCallback} = this.props;
    return (
        <div>
            <Gallery photos={this.state.photos||[]} onClick={this.openLightbox} onDeleteClick = {deleteCallback?this.deletePhotoItem:null}  columns={5}/>
            <Lightbox images={this.state.photos||[]}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            />
        </div>
    )
  }
}
export default PhotoGallery;
