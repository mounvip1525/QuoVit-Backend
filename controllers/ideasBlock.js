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
    let uName,uTag;
    const userId = req.params.id;
    const idea = req.body;
    users.findById(userId).then(result=>{
        try{
            uName = result.name;
            uTag = `${result.branch} , ${result.campus}`
            ideasBlock.create({...req.body,creator:{name:uName,tagLine:uTag}}, (err, data) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(201).send(data);
                }
              });
        } catch(err) {
            console.log("create-idea error",err)
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

export {
  ideasBlock_index,
  ideasBlock_create_idea,
  ideasBlock_delete,
};
