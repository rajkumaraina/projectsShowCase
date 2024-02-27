import {Component} from 'react'

import Loader from 'react-loader-spinner'

import EachItem from '../EachItem'

import './index.css'

const View = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const EachOption = props => {
  const {item} = props
  const {id, displayText} = item
  return <option value={id}>{displayText}</option>
}

class HomePage extends Component {
  state = {
    selectedOption: categoriesList[0].id,
    projectsList: [],
    apiView: View.loading,
  }

  componentDidMount = () => {
    this.getProjects()
  }

  getProjects = async () => {
    const {selectedOption} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${selectedOption}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({projectsList: updatedData, apiView: View.success})
    } else {
      this.setState({apiView: View.failure})
    }
  }

  retryButton = () => {
    this.setState({apiView: View.loading}, this.getProjects)
  }

  optionChange = event => {
    this.setState(
      {selectedOption: event.target.value, apiView: View.loading},
      this.getProjects,
    )
  }

  renderView = () => {
    const {apiView, projectsList} = this.state
    switch (apiView) {
      case View.loading:
        return (
          <div className="loading">
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
            </div>
          </div>
        )
      case View.success:
        return (
          <div className="mainContainer">
            <nav className="navBar">
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
                alt="website logo"
                className="logoImg"
              />
            </nav>
            <div className="secondContainer">
              <select className="selectElement" onChange={this.optionChange}>
                {categoriesList.map(each => (
                  <EachOption item={each} key={each.id} />
                ))}
              </select>
              <ul className="unordered">
                {projectsList.map(each => (
                  <EachItem item={each} key={each.id} />
                ))}
              </ul>
            </div>
          </div>
        )
      case View.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
        className="image"
      />
      <h1 className="errorHeading">Oops! Something Went Wrong</h1>
      <p className="loadingPara">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="errorButton" type="button" onClick={this.retryButton}>
        Retry
      </button>
    </div>
  )

  render() {
    return this.renderView()
  }
}
export default HomePage
