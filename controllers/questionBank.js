
import questionBank from '../models/questionBank.js';

const paper_index = async (req, res, next) => {
  questionBank
    .find()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.send(500).send(err.message));
}
const paper_upload = async (req, res, next) => {
  const { courseName, courseCategory, examType, year } = req.params;
  try {
    questionBank.find({ courseName }).then(result => {
      if (result.length > 0) {
        questionBank.updateOne({ courseName: courseName }, {
          $push: {
            questionPapers: {
              year: year,
              paper: req.file.path,
              examType: examType
            }
          }
        }, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(data);
          }
        });
      } else {
        questionBank.create({
          courseName: courseName,
          courseCategory: courseCategory,
          questionPapers: [{
            year: year,
            paper: req.file.path,
            examType: examType
          }]
        }, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(data);
          }
        });
      }
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
}
const paper_download = (req, res) => {
  const { courseName, id } = req.params;
  const directoryPath = __basedir + "/";

  console.log(directoryPath);

  questionBank.findOne({ courseName: courseName })
    .then((result => {
      if (result) {
        const paper = result.questionPapers.filter(qPaper => qPaper["_id"] == id)
        res.download(directoryPath + paper[0]["paper"], courseName + paper[0]["examType"] + paper[0]["year"], (err) => {
          if (err) {
            res.status(500).send({
              message: "Could not download the file. " + err,
            });
          }
        })
      }
    })).catch(err => res.status(401).send("No paper found to download"))
};
const courses_index = (req, res) => {
  let coursesArr = [];
  questionBank
    .find()
    .then((result) => {
      result.forEach(course => {
        const { courseName, courseCategory } = course;
        coursesArr.push({ courseName, courseCategory })
      });
      res.status(200).send(coursesArr)
    })
    .catch((err) => res.send(500).send(err));
}
const course_papers = (req, res) => {
  const { courseName } = req.body;
  questionBank.findOne({ courseName: courseName })
    .then((result => {
      if (result) {
        res.status(201).send(result)
      } else {
        res.status(201).send("No results found")
      }
    })).catch(err => res.status(401).send(err.message))
}
export {
  paper_index, paper_upload, paper_download, courses_index, course_papers
}