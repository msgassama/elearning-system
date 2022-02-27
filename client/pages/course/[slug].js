import { Badge } from 'antd'
import axios from 'axios'
import { currencyFormatter } from '../../utils/helpers'

const SingleCourse = ({ course }) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course
  return (
    <>
      {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
      <div className="jumbotron bg-primary square">
        <div className="row">
          <div className="col-md-8">
            {/* title */}
            <h1 className="text-light font-weight-bold">{name}</h1>
            {/* description */}
            <p className="lead">
              {description && description.substring(0, 160)}...
            </p>
            {/* category */}
            <Badge
              count={category}
              style={{ backgroundColor: '#03a9f4' }}
              className="pb-4 mr-2"
            />
            {/* author */}
            <p>Created by {instructor.name}</p>
            {/* updatedAt */}
            <p>Last updated {new Date(updatedAt).toLocaleDateString('US')}</p>
            {/* price */}
            <h4 className="text-light">
              {paid
                ? currencyFormatter({ amount: price, currency: 'usd' })
                : 'Free'}
            </h4>
          </div>
          <div className="col-md-4">
            {/* show video preview or course image */}
            <p>show course image</p>
            {/* enroll button */}
            <p>show enroll button</p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`)
  return {
    props: {
      course: data,
    },
  }
}

export default SingleCourse
