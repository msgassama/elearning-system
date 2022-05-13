import { useState, useEffect, createElement } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'
import { Button, Menu, Avatar } from 'antd'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

const { Item } = Menu

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1)
  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState({ lessons: [] })

  // router
  const router = useRouter()

  const { slug } = router.query

  useEffect(() => {
    if (slug) loadCourse()
  }, [slug])

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`)
    setCourse(data)
  }

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    })

    console.log(data)
  }

  return (
    <StudentRoute>
      <div className="row">
        <div className="overflow-auto" style={{ height: '100vh' }}>
          <Button
            className="text-primary mt-1 btn-block mb-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{' '}
            {!collapsed && 'Lessons'}
          </Button>
          <Menu
            mode="inline"
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: '80vh', overflowY: 'scroll', overflowX: 'hidden' }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
              >
                {lesson.title.substring(0, 30)}
              </Item>
            ))}
          </Menu>
        </div>

        <div className="col overflow-auto pt-2" style={{ height: '100vh' }}>
          {clicked !== -1 ? (
            <>
              <div className="col alert alert-primary square">
                <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                <span
                  className="float-right pointer text-success"
                  onClick={markCompleted}
                >
                  Mark as completed
                </span>
              </div>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        height="100%"
                        controls
                      />
                    </div>
                  </>
                )}
              <ReactMarkdown
                children={course.lessons[clicked].content}
                className="single-post"
              />
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <h2>Start Learning</h2>
                <p className="lead">Click on the lessons to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentRoute>
  )
}

export default SingleCourse
