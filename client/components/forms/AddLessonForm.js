import { Button } from 'antd'

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  setUploading,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></textarea>

        <Button
          size="large"
          type="primary"
          onClick={handleAddLesson}
          className="col mt-3"
          loading={uploading}
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  )
}

export default AddLessonForm
