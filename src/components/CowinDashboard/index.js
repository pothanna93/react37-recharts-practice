import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const vaccinationUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDay => ({
            vaccinationDate: eachDay.vaccine_date,
            dose1: eachDay.dose_1,
            dose2: eachDay.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          byGender => ({
            gender: byGender.gender,
            count: byGender.count,
          }),
        ),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-title">Something went wrong</h1>
    </div>
  )

  renderLoaderView = () => (
    <div testid="loader" className="loader-dots">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccinationStatus = () => {
    const {vaccinationData} = this.state

    return (
      <fragment>
        <VaccinationCoverage
          vaccinationCoverDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccineByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </fragment>
    )
  }

  renderAllViewInfo = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStatus()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="cowin-dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-image"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderAllViewInfo()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
