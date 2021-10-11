
import { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { uploadImg } from '../../services/cloudinary.service';
import { CloudUpload } from '@material-ui/icons';
import uploadGif from '../../assets/imgs/uploader.gif'

export class MyEditor extends Component {
  state = {
    content: '',
    img: '',
    isUploading: false
  }

  onUpdate = (ev) => {
    ev.preventDefault()
    if (this.state.content) {
      if (this.state.img) {
        // IF IMG UPLOADED ONSUBMIT WITH IMGURL DANGEROUS HTML AFTER COMEMNT
        const content = `<div className="user-comment flex column">
        ${this.state.content}
        <img className="comment-img" src=${this.state.img} />
        </div>`
        this.props.onSubmit(content)
      } else {
        this.props.onSubmit(this.state.content)
      }
      this.props.richTextOff()
    }
  }

  handleEditorChange = (e) => {
    this.setState({
      content: e.target.getContent()
    })
  }

  handleImgChange = async (ev) => {
    this.setState((prevState) => ({ ...prevState, isUploading: true }))
    try {
      // HANDLES CLOUDINARY UPLOADING
      const value = await uploadImg(ev)
      this.setState((prevState) => ({ ...prevState, img: value }))
    } catch (err) {
      console.log(err);
    } finally {
      // isUploading for changing text of upload status
      this.setState((prevState) => ({ ...prevState, isUploading: false }))
    }
  }

  render() {
    const { img, isUploading } = this.state
    return (
      <form onSubmit={this.onUpdate} action="">
        <Editor
          apiKey="YOUR_API_KEY"
          initialValue=""
          init={{
            max_height: 145,
            resize: false,
            menubar: false,
            plugins: [
              'advlist autolink lists link image',
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
          }}
          onChange={this.handleEditorChange} />

        <label htmlFor="img">
          {!isUploading &&
            <p style={{marginBottom: 0}}>
              {img ? <img src={img} alt="uploaded" />
                :
                <CloudUpload style={{ fontSize: '3.5rem', cursor: 'pointer', color: '#4e7ab5' }} />}
            </p>
          }
          {isUploading &&
            <span>
              <img src={uploadGif} style={{ width: '3.5rem', height: '3.5rem' }} alt="wait a bit" />
            </span>
          }
        </label>
        {!img &&
        <input className="hidden" type="file" name="img"
          placeholder="Upload img" id="img"
          defaultValue={img} onChange={this.handleImgChange} />}

        <div className="btn-container flex jce">
          <button className="comment-update-btn">Update</button>
        </div>

      </form>
    );
  }
}

