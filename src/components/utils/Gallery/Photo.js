import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const imgWithClick = { cursor: 'pointer' };

const Photo = ({ index, onClick, photo, margin, onDeleteClick  }) => {
  const imgStyle = { display: 'block', float: 'left', margin: margin };

  const handleClick = event => {
    onClick(event, { photo, index });
  };
  const handleonDeleteClick = event => {
    event.preventDefault();
    onDeleteClick(event, { photo, index });
  };
  const styles ={
    root:{
      position:'relative',
      height:photo.height,
      width:photo.width,
      display:"inline"
    },
    deleteIcon:{
      position:'absolute',
      right:0,
      top:0,
      background:"white"
    }
  }
  return (
    <div style={styles.root} >
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        {...photo}
        onClick={onClick ? handleClick : null}
      />
      {onDeleteClick&&(<IconButton style={styles.deleteIcon} onClick={onDeleteClick ? handleonDeleteClick : null}>
        <DeleteIcon/>
      </IconButton>)}
    </div>
  );
};

export const photoPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sizes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
});

Photo.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  photo: photoPropType,
};

export default Photo;
