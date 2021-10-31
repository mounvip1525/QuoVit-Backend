
import questionBank from '../models/questionBank.js';

const paper_index = async (req, res, next) => {
  try {
    const files = await questionBank.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
const paper_upload = async (req, res, next) => {
  const { courseName, courseCategory, examType, year } = req.params;
  try {
    const file = new questionBank({
      courseName: courseName,
      courseCategory: courseCategory,
      questionPapers: {
        year: year,
        paper: req.file.path,
        examType: examType
      }
    });
    await file.save();
    res.status(201).send('File Uploaded Successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
}
const paper_download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
export {
  paper_index, paper_upload, paper_download
}