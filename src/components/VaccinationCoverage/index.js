import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  const {vaccinationCoverDetails} = props

  return (
    <div className="vaccine-cover-container">
      <h1 className="cover-heading">Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={400}
        data={vaccinationCoverDetails}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccinationDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
