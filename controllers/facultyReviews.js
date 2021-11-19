import facultyReviews from "../models/facultyReviews.js";

const facultyReviews_index = (req, res) => {
  facultyReviews
    .find()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.send(500).send(err))
};

const create_faculty = (req, res) => {
  const userId = req.params.id;
  const { facultyName, facultyRating } = req.body;
  facultyReviews.create(
    { facultyName, facultyCMRating: facultyRating, numOfVotes: 1,voters:[userId]},
    (err, data) => {
          if (err) {
        // console.log(err)
        if(err.code === 11000){
            res.send({message:`${Object.keys(err.keyValue)[0]} already exists`})
        } else
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
    }
  );
};

const delete_faculty = (req, res) => {
  const id = req.params.id;
  facultyReviews
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("Faculty has been deleted successfully");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const rate_faculty = async (req, res) => {
  try {
    var updateFaculty=[];
    const id = req.params.id;
    const newRating = parseInt(req.body.facultyRating);
    const currentFaculty = await facultyReviews.findById(req.body.facId);
    if (!currentFaculty.voters.includes(id)) {
      await currentFaculty.updateOne({ $push: { voters: id } });
      updateFaculty = await facultyReviews.findByIdAndUpdate(
        req.body.facId,
        {
          facultyCMRating: currentFaculty.facultyCMRating + newRating,
          numOfVotes: parseInt(currentFaculty.numOfVotes) + 1,
        },
        { new: true }
      );
      res.status(200).send(updateFaculty);
  } else {
    res.status(200).send({message:"You have already rated this faculty"})
  }
  } catch (err) {
    res.status(500).send(err);
  }
};

export { facultyReviews_index, create_faculty, delete_faculty, rate_faculty };
