import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { useFirebase } from 'react-redux-firebase'
import {useHistory} from 'react-router-dom'

import {updateLoading} from '../actions/index'
import {connect} from "react-redux"

const mapStateToProps = ({loading}) => ({loading});
const mapDispatchToProps = dispatch => ({ updateStoreLoading: loading => dispatch(updateLoading(loading)) });

const defaultSrc = "/img/add.png"
const loadingSrc = "/img/giphy.gif"
const nullSrc = "/img/null.png"

const RoundedImg = React.memo(({
  styles,
  /* dynamic styles */
  src=defaultSrc,
  /* image source URL */
  type="profile",
  /* image type = Firebase storage directory */
  updated,
  /* image updated callback */
  link,
  /* image link */
  title,
  /* image title */
  editable=false,
  /* editable flag */
  right,
  /* image right aligment flag, default is center */
  loading,
  /* loading redux store flag */
  updateStoreLoading,
  /* update redux store loading */
  square
  /* make image square after loading is complited */
}) => {

  const [isSquare, setIsSquare] = useState(false);

  const firebase = useFirebase()

  const history = useHistory()

  const isMountedRef = useRef(null);

  const onDrop = useCallback(acceptedFiles => {
    setIsSquare(false)
    console.log(acceptedFiles[0])
    setUrl(loadingSrc)
    updateStoreLoading(true)
    firebase.uploadFile(type, acceptedFiles[0])
      .then(({uploadTaskSnaphot}) => {
        console.log(uploadTaskSnaphot)
        return uploadTaskSnaphot.ref.getDownloadURL()
      })
      .then(downloadURL => {
        updateStoreLoading(false)
        console.log(downloadURL)
        updated(downloadURL)

        if (isMountedRef.current) setUrl(downloadURL)

        if (square) setIsSquare(true)


      })
      .catch(err => {
        updateStoreLoading(false)
        if (isMountedRef.current) setUrl(nullSrc)
        console.error(err)
      })

  }, [firebase, type, updateStoreLoading, updated, square])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const [url, setUrl] = useState("")

  const {roundedImageSize, marginLeft, marginRight} = styles

  const imgStyle = {
    width: roundedImageSize,
    height: roundedImageSize,
    borderStyle: url === defaultSrc || url === loadingSrc ? "none" : "solid",
    marginLeft,
    marginRight,
    objectFit: "cover"
  }

  const imgStyleSquare = {
    ...imgStyle,
    width: "414px",
    height: "273px",
    borderRadius: "0%",
    borderStyle: "none"
  }

  const dropzoneStyle = {
    alignItems: right?"right":"center",
    justifyContent: right?"right":"center",
    textAlign: right?"right":"center"
  }

  useEffect(()=>{

    isMountedRef.current = true

    if(!editable && src === defaultSrc) {
      setUrl(loadingSrc)
    } else if (src === "" && !editable) {
      setUrl(nullSrc)
    } else if (src === "") {
      setUrl(defaultSrc)
    } else {
      setUrl(src)
    }

    if (loading) {
      setUrl(loadingSrc)
    }

    return function cleanup() {

      isMountedRef.current = false;

    }

  },[src, editable, loading])

  function onClick(event) {

    if(link && link !== "") {
      history.push(link)
    }

  }


  return (

    <div style={dropzoneStyle} className="dropzone" {...getRootProps()}>

      { editable && <input {...getInputProps()}/> }

      <img onClick={onClick} className="rounded" alt={type} style={ isSquare ? imgStyleSquare :imgStyle} src={url}></img>
      {title && <div><span className="round-img-title">
        {title}
      </span></div>}

    </div>)

})

RoundedImg.propTypes = {
  src: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  updated: PropTypes.func,
  editable: PropTypes.bool,
  styles: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundedImg)
