import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getDummyData } from '../actions/index'

const mapStateToProps = state => ({questions: state.remoteQuestions.slice(0, 10)})

const Questions = ({questions, getDummyData: getData}) => {
  useEffect(()=>{
    getData("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
  },[getData])

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  return (
      <ul>
        {questions.map((el,index) => (
          <li key={index}><span>{htmlDecode(el.question)}</span></li>
        ))}
      </ul>
    );
}

export default connect(
  mapStateToProps,
  { getDummyData }
)(Questions);
