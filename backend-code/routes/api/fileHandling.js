const express = require('express');
const dirTree = require("directory-tree");
const fs = require('fs')
const fsExtra = require('fs-extra'); //npm install fs.extra

const bodyParser = require("body-parser");

const router = express.Router();
const cors = require('cors');

router.use(cors());

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

//Load Course Model
const Course = require('../../models/Course');

//Load Profile Model
const Profile = require('../../models/Profile');

//Load Assignment Model
const Assignment = require('../../models/Assignments')

//Import Validator Fields
const validateProfileInput = require('../../validation/profile');

const passport = require('passport');

const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/profilePics',
    filename: function(request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }

});

const storageAssign = multer.diskStorage({
    destination: './public/uploads/course/assignment',
    filename: function(request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }

});

const storageSubmission = multer.diskStorage({
    destination: './public/uploads/course/assignment/submission',
    filename: function(request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }

});

const storageFileInFolder = multer.diskStorage({
    destination: './public/uploads',
    filename: function(request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }

});

const upload = multer({
    storage: storage,
}).single('profileImg')

const uploadAssign = multer({
    storage: storageAssign,
}).single('Assignment')


const uploadSubmission = multer({
    storage: storageSubmission,
}).single('Submission')

const uploadFileInFolder = multer({
    storage: storageFileInFolder,
}).single('folderUpload')

//@route POST api/files/profileImage/
//@desc Upload Profile Image and Display
//@access Private
router.post('/profileImage', passport.authenticate('jwt', {session: false}), (req,res) => {
    // console.log(req);
    
    upload(req, res, (err) => {
        console.log(req.file);

        pathFile = `./public/uploads/profilePics/${req.user.sjsuId}`
        
        if (!fs.existsSync(pathFile)){
            fs.mkdirSync(pathFile);
        }
        var fileName = req.file.filename;

        console.log('' + pathFile + '/' + fileName);

        var oldPath = './public/uploads/profilePics/' + fileName
        var newPath = pathFile + '/' + fileName

        fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
        })

        let fileUrl = "http://52.8.7.74:5000/uploads/profilePics/"+req.user.sjsuId + '/' + req.file.filename;


        const updatedProfileData = {
            user : req.user.id,
            avatar: fileUrl
        }

        res.send(fileUrl);
            Profile.findOne({user : req.user.id})
            .then(profile => {
                if(profile) {
                    //Update
                    // console.log("In Update")
                    Profile.findOneAndUpdate(
                        {user: req.user.id}, 
                        {$set: updatedProfileData}, 
                        {new: true}
                    ).then(profile => res.json(profile));
                } else {
                    //Create --

                    //Save Profile
                    new Profile(updatedProfileData).save()
                    .then(profile => {
                        res.json(profile);
                    })
                }
            })
    })
})

//@route POST api/files/uploadAssignment/
//@desc Upload Profile Image and Display
//@access Private
router.post('/uploadAssignment', passport.authenticate('jwt', {session: false}), (req, res) => {
    uploadAssign(req, res, (err) => {
        console.log(req.file);
        console.log(req.body.title);

        pathFile = `./public/uploads/course/assignment/` + req.user.sjsuId;

        if (!fs.existsSync(pathFile)){
            fs.mkdirSync(pathFile);
        }

        // var dir = JSON.parse(req.body.filePath).directory;
        // console.log("This is directory : " + dir)
        var fileName = req.file.filename;

        console.log('' + pathFile + '/' + fileName);

        var oldPath = './public/uploads/course/assignment/' + fileName
        var newPath = pathFile + '/' + fileName

        fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
        })

        // console.log(err);
        let fileUrl = "http://52.8.7.74:5000/uploads/course/assignment/"+req.user.sjsuId + '/' + req.file.filename;

        const assignmentData = {
            title : req.body.title,
            dueDate: req.body.dueDate,
            file: fileUrl,
            totalPoints: req.body.totalPoints,
            course: req.body.courseId
        }

        res.send(fileUrl);

        new Assignment(assignmentData).save()
        .then(assign => {
            console.log(assign);
            // res.json(assign);
            Course.findById(assign.course)
            .then(course => {
                
                course.assignments.unshift({ assignment: assign._id });
                course.save()
                .then(course => {
                    console.log(course);
                })
            })
        })
        .catch(err => {
            console.log(err)
        })

     
    })
})

//@route POST api/files/uploadAssignmentSubmission/
//@desc UPload Assignment Submission
//@access Private
router.post('/uploadAssignmentSubmission', passport.authenticate('jwt', {session: false}), (req, res) => {
    uploadSubmission(req, res, (err) => {
        console.log(req.file);
        console.log(req.body.title);

        pathFile = `./public/uploads/course/assignment/submission/` + req.body.assignmentId;

        if (!fs.existsSync(pathFile)){
            fs.mkdirSync(pathFile);
        }

        var fileName = req.file.filename;

        // console.log('' + pathFile + '/' + fileName);

        var oldPath = './public/uploads/course/assignment/submission/' + fileName
        var newPath = pathFile + '/' + fileName

        fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
        })

        // console.log(err);
        let fileUrl = "http://52.8.7.74:5000/uploads/course/assignment/submission/"+req.body.assignmentId + '/' + req.file.filename;

        Assignment.findById(req.body.assignmentId)
        .then(assignment => {
            console.log(assignment)
            let assign = assignment.submission
            
                // console.log('No submission for this assignment yet')
                assignment.submission.unshift({
                    submitedBy: req.user.id,
                    file: fileUrl,
                    submissoinNumber: assign.length + 1
                })

                assignment.save()
                .then ((assign) => {
                    console.log('------------assign+++++++++++++++++');   
                    console.log(assign);         
                    res.json(assign);
                })
                .catch(err => {console.log(err)})
            
        })
        .catch(err => console.log(err))
     
    })
})

router.post("/uploadFileFolder", (req, res) => {
    uploadFileInFolder(req, res, (err) => {
        console.log(req.file);
        console.log(req.body.filepath);

        pathFile = req.body.filepath;

        // var dir = JSON.parse(req.body.filePath).directory;
        // console.log("This is directory : " + dir)
        var fileName = req.file.filename;

        console.log('' + pathFile + '/' + fileName);

        var oldPath = '../backend-code/public/uploads/simply/' + fileName
        var newPath = pathFile + '/' + fileName

        fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
        })        

        // fs.move('../backend-code/public/uploads/simply/' + fileName, '' + pathFile + '/' + fileName, function (err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     // console.log("Dir After: " + '' + dir + '/' + fileName)
        //     res.json({});
        // });

    })
});

router.post('/uploadAssignment',  (req, res) => {
   
    uploadAssign(req, res, (err) => {
        console.log(req.file);
        console.log(req.body);
        // console.log(err);
        let fileUrl = "http://52.8.7.74:5000/uploads/Assignments/"+req.file.filename;

        const createAssignment = {
            COURSEID : req.body.COURSEID,
            NAME: req.body.NAME,
            CREATEDBY: req.body.SJSUID,
            FILEPATH: fileUrl,
            TOTALPOINTS: req.body.TOTALPOINTS,
            DUEDATE: req.body.DUEDATE,
        }

        res.send(fileUrl);

        Assignments.create(createAssignment)
        .then(assign => {
            res.json(assign);
        })
        
    })
    
})

router.post('/getAssignments',  (req, res) => {
    console.log(req.body)
   
    Assignments.findAll({
        where: {
            COURSEID: req.body.COURSEID
        }
    })
    .then(assignments => {
        res.json(assignments)
    })
    
})

router.post('/deleteAssignment', (req, res) => {
    Assignments.destroy({
        where: {
            ID: req.body.ID
        }
    })
    .then(delMsg => {
        res.send(delMsg);
    })
})

router.post('/submitAssignment', (req,res) => {
    uploadSubmission(req,res, (err) => {
        let fileUrl = "http://52.8.7.74:5000/uploads/Assignments/Submissions/"+req.file.filename;

        const assignmentSubmission = {
            COURSEID : req.body.COURSEID,
            SJSUID: req.body.SJSUID,
            SUBMISSIONPATH: fileUrl,
            ASSIGNMENTID: req.body.ASSIGNMENTID,
        }

        AssignmentSubmissions.create(assignmentSubmission)
        .then(assign => {
            res.send(assign);
        })
      
    })
})

router.post('/getSubmissions', (req, res) => {
    // console.log(req.body);

    AssignmentSubmissions.findAll({
        where : {
            ASSIGNMENTID: req.body.ASSIGNMENTID,
            COURSEID: req.body.COURSEID,
        }
    })
    .then(resData => {
        res.json(resData)
    })
}) 

/////File Structure implementation

router.post("/getFileStructure1", (req, res) => {
    console.log(req.body)
    const tree = dirTree(req.body.path);
    // const tree = dirTree(prePond+req.body.path);
    resData = { status: 200, msg: "Success", data: tree };
    // console.log(resData)
    res.json(resData);
});

router.get("/getFileStructure", (req, res) => {
    const tree = dirTree("../backend-code/public/uploads/");
    console.log(tree.children);
    resData = { status: 200, msg: "Success", data: tree };
    res.json(resData);
});


router.get("/download/:filePath(*)", (req, res) => {
    var filePath = "../"+req.params.filePath;
    console.log(filePath)
    res.download(filePath);
});

router.post("/createNewFolder", (req, res) => {
    let resData = {}
    // console.log(req.body.parent_folder_path + "/" + req.body.new_folder_name)
    dir = req.body.new_folder_path;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        resData = { status: 200, msg: "Success", data: null };
        res.json(resData);
    }else{
        resData = { status: 500, msg: "Folder already exist", data: null };
        res.json(resData);
    }
});


module.exports = router;