import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const blogData = {
  title: 'Blog Name',
  imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
  avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
  author: 'Author Name',
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

class BlogItemDetails extends Component {
  state = {itemDetailsArray: {}, isLoadin: true}

  componentDidMount() {
    this.getrenderedData()
  }

  getrenderedData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const jsonData = await response.json()
    const data = jsonData
    console.log(data)
    const newData = {
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
    }
    // const data = await response.json()
    this.setState({itemDetailsArray: newData, isLoadin: false})

    // fetch(`https://apis.ccbp.in/blogs/${id}`)
    //   .then(response => response.json())
    //   .then(jsonData => {
    //     const data = jsonData
    //     console.log(data)

    //     const newData = {
    //       title: data.title,
    //       imageUrl: data.image_url,
    //       content: data.content,
    //       avatarUrl: data.avatar_url,
    //       author: data.author,
    //     }
    //     // const data = await response.json()
    //     this.setState({itemDetailsArray: newData, isLoadin: false})
    //   })
  }

  renderBlogItemDetails = () => {
    const {itemDetailsArray} = this.state
    const {title, imageUrl, content, avatarUrl, author} = itemDetailsArray
    console.log(this.props)
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoadin} = this.state

    return (
      <div className="blog-container">
        {isLoadin ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
