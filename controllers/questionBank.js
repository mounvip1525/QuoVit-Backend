
import questionBank from '../models/questionBank.js';

const paper_index = async (res) => {
  questionBank
    .find()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.send(500).send(err.message));
}

const paper_upload = async (req, res) => {
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
        }, (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            get_courses().then(courses=>res.status(200).send(courses))
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
        }, (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            get_courses().then(courses=>res.status(200).send(courses))
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

const get_courses = async () => {
  try {
    let coursesArr = [];
    let result = await questionBank.find()
        await result.forEach(course => {
          const { courseName, courseCategory } = course;
          coursesArr.push({ courseName, courseCategory })
        });
      return coursesArr
    }
    catch(err) {
    console.log(err)
  }
}

const courses_index = async (req, res) => {
      try {
        let coursesArr = await get_courses();
      res.status(200).send(coursesArr)
      } catch(err){
        res.status(500).send(err)
      }
}

const course_papers = (req, res) => {
  const { courseName } = req.params;
  let categoryArray = {courseName,courseCategory:"",cat1:[],cat2:[],fat:[]}
  questionBank.findOne({ courseName: courseName })
    .then((result => {
      if (result) {
        result.questionPapers.map(qp=>{
          if(qp.examType === "cat1" || qp.examType === "CAT1") {
            categoryArray.cat1.push(qp)
          } else if(qp.examType === "cat2" || qp.examType === "CAT2"){
            categoryArray.cat2.push(qp)
          } else {
            categoryArray.fat.push(qp)
          }
        })
        categoryArray.courseCategory = result.courseCategory;
        res.status(201).send(categoryArray)
      } else {
        res.status(201).send("No results found")
      }
    })).catch(err => res.status(401).send(err.message))
}

export {
  paper_index, paper_upload, paper_download, courses_index, course_papers
}