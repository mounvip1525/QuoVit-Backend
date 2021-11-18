import ideasBlock from "../models/ideasBlock.js";
import users from "../models/user.js";

const ideasBlock_index = (req,res) => {
    ideasBlock
    .find()
    .sort({createdAt: -1 })
    .then((result)=> {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

const ideasBlock_create_idea = (req, res) => {
    let uTag;
    const userId = req.params.id;
    users.findById(userId).then(result=>{
        try{
            uTag = `${result.branch} , VIT ${result.campus}`
            ideasBlock.create({...req.body,creator:{ name:result.name,tagLine:uTag,profileImg:result.profileImg,id:result._id}}, (err, data) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(201).send(data);
                }
              });
        } catch(err) {
            res.status(500).send(err);
        }
    })
};

const ideasBlock_delete = (req, res) => {
  const id = req.params.id;
  ideasBlock
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("Idea deleted successfully");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const ideasBlock_update_idea = async (req, res) => {
    try {
      const idea = await ideasBlock.findById(req.params.id);
      if (idea.creator.id === req.body.userId) {
        await idea.updateOne({ $set: req.body });
        res.status(200).send("the idea has been updated");
      } else {
        res.status(403).send("you can update only your idea");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

export {
  ideasBlock_index,
  ideasBlock_create_idea,
  ideasBlock_delete,
  ideasBlock_update_idea
};
