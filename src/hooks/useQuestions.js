import { useSelector } from 'react-redux'
import { getDummyData } from '../actions/index'

const useQuestions = () => {

  let selector = (state) => state.remoteQuestions.slice(0, 10)

  getDummyData("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")

  const questions = useSelector(selector)

  return [questions];

}

export default useQuestions
