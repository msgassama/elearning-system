import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import PreviewModal from '../../components/modals/PreviewModal'
import { Context } from '../../context'

const SingleCourse = ({ selectedCourse }) => {
  // state
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState('')
  const [course, setCourse] = useState(undefined)
  const [loading, setLoading] = useState(false)

  // context
  const {
    state: { user },
  } = useContext(Context)

  useEffect(() => {
    setCourse(selectedCourse)
  }, [])

  const handlePaidEnrollment = () => {
    console.log('handle paid enrollment')
  }

  const handleFreeEnrollment = () => {
    console.log('handle free enrollment')
  }

  if (course) {
    return (
      <>
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        <SingleCourseJumbotron
          course={course}
          showModal={showModal}
          setShowModal={setShowModal}
          preview={preview}
          setPreview={setPreview}
          user={user}
          loading={loading}
          handlePaidEnrollment={handlePaidEnrollment}
          handleFreeEnrollment={handleFreeEnrollment}
        />
        <PreviewModal
          showModal={showModal}
          setShowModal={setShowModal}
          preview={preview}
        />

        {course.lessons && (
          <SingleCourseLessons
            lessons={course.lessons}
            setPreview={setPreview}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </>
    )
  } else {
    return null
  }
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`)
  return {
    props: {
      selectedCourse: data,
    },
  }
}

export default SingleCourse
