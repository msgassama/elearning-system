import { Badge } from 'antd'
import axios from 'axios'
import { currencyFormatter } from '../../utils/helpers'
import ReactPlayer from 'react-player'
import { useState } from 'react'

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState('')

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
            {lessons[0].video && lessons[0].video.Location ? (
              <div
                onClick={() => {
                  setPreview(lessons[0].video.Location)
                  setShowModal(!showModal)
                }}
              >
                <ReactPlayer
                  className="react-player-div"
                  url={lessons[0].video.Location}
                  light={image.Location}
                  width="100%"
                  height="225px"
                />
              </div>
            ) : (
              <>
                <img
                  src={image.Location}
                  alt={name}
                  className="img img-fluid"
                />
              </>
            )}
            {/* enroll button */}
            <p>show enroll button</p>
          </div>
        </div>
      </div>

      {showModal ? course.lessons[0].video.Location : "don't show"}
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
