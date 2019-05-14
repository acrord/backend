
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load User model
const Class = mongoose.model('Class');
const User = mongoose.model('user');
const Question = mongoose.model('Question');
const Survey = mongoose.model('Survey');

router.post('/', (req,res)=>{
    let sessionCheck = false;
    if (typeof req !== 'undefined' && typeof req.user !== 'undefined') {
        sessionCheck = true
    }
    res.send(sessionCheck);

    });


router.post('/enter', (req, res) => {
    const {classCode} = req.body;
    Class.findOne({classCode: classCode})
    .then(thisClass => {
        if (thisClass) {
            const classInput = {
                className:thisClass.className,
                profName:thisClass.profName
            };
            res.send(classInput);
        }
        else res.send(false);//없는 클래스접근 시도
    });
});

router.get('/:classCode/classAdd', (req, res) => {
    const {classCode} = req.params
    Class.findOne({classCode: classCode})
        .then(thisClass => {
            if (thisClass) {
                const classInput = {
                    classCode:thisClass.classCode,
                    className:thisClass.className,
                    profName:thisClass.profName
                };
                User.findByIdAndUpdate(
                    req.user._id,
                    {$push: { "classList": classInput}}
                )
                    .then(result => {
                        res.send(classInput);
                    })
            }
            else{
                res.send(false);
            }
        }).catch(err => {
        res.send(err);
    });
});

router.delete('/:classCode/delete', (req, res) => {
    const {classCode} = req.params
    User.findByIdAndUpdate(
        req.user._id,
        {$pull: { "classList": {
            classCode:classCode
        }}}
    ).then(result => {
        res.send(true)
    })
    .catch(err=> {
        res.send(err);
    })
});

router.post('/:classCode/question',(req,res)=>{
    let {classCode}=req.params;
    Question.find({classCode: classCode})
            .then(List => {
                res.send({questionList: List});
            })
            .catch(err=> {
                res.send(err);
            })
});

router.post('/:classCode/survey',(req,res)=>{
    let {classCode}=req.params;
    Survey.find({classCode: classCode})
        .then(List => {
            res.send({surveyList: List});
        })
        .catch(err=> {
            res.send(err);
        })
});

module.exports = router;
