import mongoose from 'mongoose';

const lineSchema = new mongoose.Schema({
  content: {
    type: String,
  }
})

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  lines: [lineSchema]
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    sections: [sectionSchema]
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
