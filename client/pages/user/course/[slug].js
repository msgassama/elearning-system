import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import user from '../../../../server/models/user'

const SingleCourse = () => {
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState({ lessons: [] })

  // router
  const router = useRouter()

  const { slug } = router.query

  useEffect(() => {
    if (slug) loadCourse()
  }, [slug])

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`)
    setCourse(data)
  }

  return (
    <>
      <h1>Couse slug is: {JSON.stringify(course, null, 4)}</h1>
    </>
  )
}

export default SingleCourse
