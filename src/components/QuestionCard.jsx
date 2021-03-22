import React, { useState, useEffect } from 'react'
import dummy from '../bages'
import Badge from './Badge'
import AnswerButton from './AnswerButton'
import AnswerIndicator from './AnswerIndicator'

const QuestionCard = ({
  styles,
  /* dynamic styles object */
  data,
  /* card data: CardData

    CardData = {
      title: String;
      number: Int;
      total: Int;
      question: String;
      badges: BadgeData[];
      correctAnswer: String;
      isAnswered: Boolean;
      score: Int;
    }

    BadgeData = {
      text: String;
      textColor: String;
      borderColor: String;
      signOn: Boolean;
      singColor: String;
    }

  */
  selected
  /* card selected callback */
}) => {

  const {
    title,
    number,
    total = 10,
    question,
    badges = Object.values(dummy),
    correctAnswer
  } = data

  useEffect(() => {
    if (!data.isAnswered) {
      setAnswer("")
    } else {
      if (answer === "") {
        if (data.score > 0) {
          setAnswer(correctAnswer)
        } else {
          setAnswer(data.incorrect_answers[0])
        }
      }
    }
  }, [data])

  const [answer, setAnswer] = useState("")

  function onCardSelected(event) {
    console.log("QuestionCard.onCardSelected")
  }

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  function onAnswerClick(answer) {
    console.log(answer);
    setAnswer(answer);
    selected(answer===correctAnswer ? 1 : 0)
  }

  return (<div className="question-card" onClick={onCardSelected}>

    <div className="question-card-title">{title}</div>
    <div className="question-vl"></div>
    <div className="question-card-subtitle">{number}/{total}</div>

    <div className="question-bage-container">
      {badges.map((item, index) => index < 3 && <Badge key={index} styles={styles} data={item}/>)}
    </div>

    <div className="question-text">{htmlDecode(question)}</div>
    <div className="question-card-footer">
      <AnswerButton styles={styles} isSelected={answer==="True"} isAnswered={answer!==""} click={onAnswerClick} answer="True" icon="up"/>
      <AnswerIndicator styles={styles} isAnswered={answer!==""} score={answer===correctAnswer ? 1 : 0} />
      <AnswerButton styles={styles} isSelected={answer==="False"} isAnswered={answer!==""} click={onAnswerClick} answer="False" icon="down"/>
    </div>

  </div>)

}

export default QuestionCard
