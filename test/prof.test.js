const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const url = 'http://localhost:5000';
var agent = chai.request.agent(url);


describe('# Professor test', function () {
    let classInput;
    describe('ClassCreate & Delete test', () => {
        it('클래스 생성 성공', done => {
            agent.post('/users/login')
                .type('form')
                .send({
                    'userID': 'testP@email.com',
                    'password': 'qwe123'
                })
                .end((err, res) => {
                    agent.post('/prof/classCreate')
                        .type('form')
                        .send({
                            'className': 'testname'
                        })
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.text).to.be.an('String');
                            classInput = res.body;
                            done();
                        })
                })
        });
        it('클래스 삭제 성공', done => {
            agent.delete(`/prof/${classInput.classCode}/delete`)
                .type('form')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body).to.equal(true);
                    done();
                })
        });
    });
    describe('설문 생성', () => {
        it('설문 생성 성공', done => {
            const survey = {
                classCode:"prtvne",
                surveyName:"testSurvey",
                surveyList:[
                    {
                        surveyQuestion:"test1",
                        surveyType: 1,
                        contentCount: 5,
                        content: ["강아지", "고양이", "도마뱀","곰돌이","도룡뇽"],
                        count:new Array(5).fill(0)
                    },
                    {
                        surveyQuestion:"test2",
                        surveyType: 2,
                        contentCount: 5,
                        content: ["강아지", "고양이", "도마뱀","곰돌이","도룡뇽"],
                        count:new Array(5).fill(0)
                    },
                    {
                        surveyQuestion:"test3",
                        surveyType: 3
                    }
                ],
                active:false,
                public:true,
                date:"2019년 5월 16일 오후 7:33"
            };
            agent.post('/prof/prtvne/surveyAdd')
            .type('form')
            .send({survey:survey})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.an("Object");
                done();
            })
        });
    });
    //설문 수정
    //설문 삭제

})
