import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  randomNumberGeneratorWithNumberArrayRestriction,
  stringArrayScrambler,
} from "../../../../components/functions/generic-functions";
import QuizMultipleChoiceQuestion from "./child-components/quiz-mulitple-choice-question";
import { useEffect, useState } from "react";
import { randomUserSelectGenerator } from "../../../../components/functions/generic-functions";
import {
  UserSelectedData,
  UserQuizQuestionSetup,
} from "../../../../store/quiz-store-slice";
const QuizMultipleChoiceCreator = () => {
  const dispatch = useAppDispatch();
  const userSelectedQuizVocabNPhrases: UserSelectedData[] = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabNPhrases
  );
  const userSelectedQuizVocabQuestionTypes: string = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabQuestionTypes
  );
  const userQuizQuestionSetup: UserQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const numberOfQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions;

  const phrasesDB = useAppSelector((state) => state.mainStore.phrasesDB);

  const overAllVocabDB = useAppSelector(
    (state) => state.mainStore.overAllVocabDB
  );
  const finalAnswerKey: string[] = [];

  const [useEffectTrigger, setUseEffectTrigger] = useState<string | number>(0);
  const [finalKeyPushArray, setFinalKeyPushArray] = useState<string[]>([]);
  const [
    renderReadyMultipleChoiceQuestions,
    setRenderReadyMultipleChoiceQuestions,
  ] = useState<any>([]);

  if (useEffectTrigger === 0) {
    // if statement so that this only renders once
    /// Step 1.  Creating a overallVOcab AN Phrase Database
    const copyOfPhrasesDB = JSON.parse(JSON.stringify(phrasesDB));
    const copyOfOverAllVocabDB = JSON.parse(JSON.stringify(overAllVocabDB));
    const vocabNPhrasesDB = copyOfOverAllVocabDB.concat(copyOfPhrasesDB);

    // Getting French Term Array so we know where we are in our newly created Database
    const vocabNPhrasesDBFrenchArray = vocabNPhrasesDB.map(
      (item: UserSelectedData) => {
        return item.french;
      }
    );

    // Creates Incorrect Answers
    const incorrectAnswerGenerator = (
      excludedIndex: number,
      questionType: string
    ) => {
      // Creating three Wrong Answer
      const firstWrongAnswerIndex =
        randomNumberGeneratorWithNumberArrayRestriction(
          0,
          vocabNPhrasesDB.length - 1,
          [excludedIndex]
        );
      const secondWrongAnswerIndex =
        randomNumberGeneratorWithNumberArrayRestriction(
          0,
          vocabNPhrasesDB.length - 1,
          [excludedIndex, firstWrongAnswerIndex]
        );
      const thirdWrongAnswerIndex =
        randomNumberGeneratorWithNumberArrayRestriction(
          0,
          vocabNPhrasesDB.length - 1,
          [excludedIndex, firstWrongAnswerIndex, secondWrongAnswerIndex]
        );
      let firstIndexWrongAnswer = "";
      let secondIndexWrongAnswer = "";
      let thirdIndexWrongAnswer = "";
      if (questionType === "English") {
        firstIndexWrongAnswer = vocabNPhrasesDB[firstWrongAnswerIndex].english;

        secondIndexWrongAnswer =
          vocabNPhrasesDB[secondWrongAnswerIndex].english;

        thirdIndexWrongAnswer = vocabNPhrasesDB[thirdWrongAnswerIndex].english;
      } else {
        firstIndexWrongAnswer = vocabNPhrasesDB[firstWrongAnswerIndex].french;

        secondIndexWrongAnswer = vocabNPhrasesDB[secondWrongAnswerIndex].french;

        thirdIndexWrongAnswer = vocabNPhrasesDB[thirdWrongAnswerIndex].french;
      }

      return [
        firstIndexWrongAnswer,
        secondIndexWrongAnswer,
        thirdIndexWrongAnswer,
      ];
    };

    // Creating the questions
    const multipleChoiceQuestionCreator = (
      userData: UserSelectedData,
      questionIndex: number
    ) => {
      const indexOfUserSelectedItem = vocabNPhrasesDBFrenchArray.indexOf(
        userData.french
      );

      let answerType = userSelectedQuizVocabQuestionTypes;
      if (answerType !== "English" && answerType !== "French") {
        // Coin flip to decide what the quiz type will be
        const coinFlip = randomNumberGeneratorWithNumberArrayRestriction(0, 1, [
          2,
        ]);
        if (coinFlip === 0) {
          answerType = "French";
        } else {
          answerType = "English";
        }
      }
      // generating Random Wrong Answers

      const arrayOfIncorrectAnswers = incorrectAnswerGenerator(
        indexOfUserSelectedItem,
        answerType
      );

      const questionAnswers = arrayOfIncorrectAnswers;
      const userSelectedFrenchTerm =
        vocabNPhrasesDBFrenchArray[indexOfUserSelectedItem];

      if (answerType === "French") {
        questionAnswers.push(vocabNPhrasesDB[indexOfUserSelectedItem].french);
      } else {
        questionAnswers.push(vocabNPhrasesDB[indexOfUserSelectedItem].english);
      }
      // Scrambling The Answers

      const scrambledAnswers: string[] = stringArrayScrambler(questionAnswers);

      // Finding the correct answer inside the new Scrambled array
      let termToLookUp = "";
      if (answerType === "French") {
        termToLookUp = userSelectedFrenchTerm;
      } else {
        termToLookUp = vocabNPhrasesDB[userSelectedFrenchTerm];
      }
      const indexOfCorrectAnswer = scrambledAnswers?.indexOf(termToLookUp);
      // creating answer key
      const letterArray = ["A", "B", "C", "D"];
      const correctAnswer = letterArray[indexOfCorrectAnswer ?? 0];

      // Pushing To the Question Child Component
      finalAnswerKey.push(correctAnswer);

      // Handeling Question Title
      let questionTitle = "";
      console.log(userSelectedFrenchTerm);
      console.log(vocabNPhrasesDB[userSelectedFrenchTerm]);
      if (answerType === "French") {
        // title should be english term
        questionTitle = vocabNPhrasesDB[indexOfUserSelectedItem].english;
      } else {
        // title should be french term
        questionTitle = vocabNPhrasesDB[indexOfUserSelectedItem].french;
      }

      return (
        <QuizMultipleChoiceQuestion
          key={questionIndex}
          arrayOfAnswers={scrambledAnswers}
          questionIndex={questionIndex}
          title={questionTitle}
        />
      );
    };
    // Creating The Multiple Choice Questions

    if (numberOfQuestions < userSelectedQuizVocabNPhrases.length) {
      // if numberOfQuestions is less than what was selected than  we need to randomly generate the answers to be tested on

      const arrayOfTestTerms = randomUserSelectGenerator(
        userSelectedQuizVocabNPhrases,
        numberOfQuestions
      );

      setRenderReadyMultipleChoiceQuestions(
        arrayOfTestTerms.map((word: UserSelectedData, index: number) => {
          return multipleChoiceQuestionCreator(word, index);
        })
      );
    } else {
      setRenderReadyMultipleChoiceQuestions(
        userSelectedQuizVocabNPhrases.map(
          (word: UserSelectedData, index: number) => {
            return multipleChoiceQuestionCreator(word, index);
          }
        )
      );
    }

    if (finalAnswerKey.length === numberOfQuestions) {
      setUseEffectTrigger("x");
      setFinalKeyPushArray(finalAnswerKey);
    }
  }

  useEffect(() => {
    if (useEffectTrigger === "x") {
      dispatch(
        quizStoreSliceActions.setVocabPhraseQuizMultipleChoiceAnswerKey(
          finalKeyPushArray
        )
      );
      setUseEffectTrigger("y");
    }
  }, [useEffectTrigger, dispatch, finalKeyPushArray]);

  return <>{renderReadyMultipleChoiceQuestions}</>;
};
export default QuizMultipleChoiceCreator;
