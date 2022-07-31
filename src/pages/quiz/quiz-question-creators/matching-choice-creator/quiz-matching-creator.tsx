import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  randomUserSelectGenerator,
  randomNumberGenerator,
  stringArrayScrambler,
  letterAnswerKeyCreator,
} from "../../../../components/functions/generic-functions";
import {
  quizStoreSliceActions,
  UserSelectedData,
} from "../../../../store/quiz-store-slice";
import {
  MatchingTopContainer,
  StyledSelect,
  StyledOption,
  MatchingRowContainer,
  StyledTypography,
} from "./quiz-matching-creator-styled-components";
const QuizMatchingCreator = () => {
  const dispatch = useAppDispatch();
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const userSelectedQuizVocabQuestionTypes = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabQuestionTypes
  );
  const userSelectedQuizVocabNPhrases = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabNPhrases
  );
  const matchingAnswerKey = useAppSelector(
    (state) => state.quizStore.matchingAnswerKey
  );
  const numberOfQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions;

  const [finalrenderReadyItems, setFinalRenderReadyItems] = useState<
    JSX.Element[]
  >([]);
  const [answerKey, setAnswerKey] = useState<string[]>([]);
  const [processingState, setProcessingState] = useState<number | string>(
    "start"
  );

  // useEffect that pushses the answerKey to the store
  useEffect(() => {
    if (processingState === 1) {
      setProcessingState("end");
      dispatch(quizStoreSliceActions.setMatchingAnswerKey(answerKey));
    }
  }, [answerKey, processingState, dispatch, matchingAnswerKey.length]);

  // Step 1. Handeling numberOfquestions > userSelected Items and creating the two matching sides

  if (finalrenderReadyItems.length === 0 && processingState === "start") {
    const answerLettersArray = letterAnswerKeyCreator(numberOfQuestions);
    // if statement is here so that the questiosn are only generated once
    let arrayOfTestTerms: any[] = userSelectedQuizVocabNPhrases;
    let termsToBeTestedOn: string[] = [];
    let promptTerms: string[] = [];
    if (numberOfQuestions < userSelectedQuizVocabQuestionTypes.length) {
      arrayOfTestTerms = randomUserSelectGenerator(
        userSelectedQuizVocabNPhrases,
        numberOfQuestions
      );
    }
    const renderReadyStyledOptions: JSX.Element[] = [];
    for (let letterIndex = 0; letterIndex < numberOfQuestions; letterIndex++) {
      renderReadyStyledOptions[letterIndex] = (
        <StyledOption key={`${letterIndex} letterIndex`}>
          {answerLettersArray[letterIndex]}
        </StyledOption>
      );
    }
    renderReadyStyledOptions.unshift(
      <StyledOption key={`${-1} letterIndex`}>{""}</StyledOption>
    );

    if (userSelectedQuizVocabQuestionTypes === "English") {
      termsToBeTestedOn = arrayOfTestTerms.map(
        (userObject: UserSelectedData) => {
          return userObject.english;
        }
      );
      promptTerms = arrayOfTestTerms.map((userObject: UserSelectedData) => {
        return userObject.french;
      });
    } else if (userSelectedQuizVocabQuestionTypes === "French") {
      termsToBeTestedOn = arrayOfTestTerms.map(
        (userObject: UserSelectedData) => {
          return userObject.french;
        }
      );
      promptTerms = arrayOfTestTerms.map((userObject: UserSelectedData) => {
        return userObject.english;
      });
    } else {
      // randomly  coin toss for each term
      for (
        let indexOfCoinFlippedTerm = 0;
        indexOfCoinFlippedTerm < numberOfQuestions;
        indexOfCoinFlippedTerm++
      ) {
        const coinFlip = randomNumberGenerator(0, 1, 2);
        if (coinFlip === 0) {
          termsToBeTestedOn.push(
            arrayOfTestTerms[indexOfCoinFlippedTerm].french
          );
          promptTerms.push(arrayOfTestTerms[indexOfCoinFlippedTerm].english);
        } else {
          termsToBeTestedOn.push(
            arrayOfTestTerms[indexOfCoinFlippedTerm].english
          );
          promptTerms.push(arrayOfTestTerms[indexOfCoinFlippedTerm].french);
        }
      }
    }

    // Step 2: Scrambling the array of TestOnTerms
    //
    console.log(promptTerms);
    console.log(termsToBeTestedOn);
    const scrambledTestOnTerms = stringArrayScrambler(termsToBeTestedOn);
    console.log(scrambledTestOnTerms);

    // Step 3. Creating the Answer via mtching the newly scrambled Tems with their original parings

    const frenchTerms = arrayOfTestTerms.map((term: UserSelectedData) => {
      return term.french;
    });
    const englishTerms = arrayOfTestTerms.map((term: UserSelectedData) => {
      return term.english;
    });
    const tempAnswerKey = scrambledTestOnTerms.map(() => {
      return "";
    });

    for (
      let indexOfScrambledAnswer = 0;
      indexOfScrambledAnswer < scrambledTestOnTerms.length;
      indexOfScrambledAnswer++
    ) {
      let termToFind = "";
      // Step 1: finding out which type  the scambled term is
      const indexOfAnswerTermInFrench = frenchTerms.indexOf(
        promptTerms[indexOfScrambledAnswer]
      );
      const indexOfAnswerTermInEnglish = englishTerms.indexOf(
        promptTerms[indexOfScrambledAnswer]
      );

      // Step 2. Finding the correlated French / English Term
      if (indexOfAnswerTermInFrench === -1) {
        // answer is in english, so the term we need to find is french to match the cooresponding answer
        // This id due to indexof returning a -1 if no response was found
        termToFind = frenchTerms[indexOfAnswerTermInEnglish];
      } else {
        // answer is in french, so the term we need to find is english
        termToFind = englishTerms[indexOfAnswerTermInFrench];
      }
      // Step 3. Finding the terms position inside the arrayOfTestTerms variable

      const positionOfAnswer = scrambledTestOnTerms.indexOf(termToFind);

      tempAnswerKey[indexOfScrambledAnswer] =
        answerLettersArray[positionOfAnswer];
    }
    console.log(tempAnswerKey);
    const tempRenderReadyItems = [];
    for (
      let questionIndex = 0;
      questionIndex < arrayOfTestTerms.length;
      questionIndex++
    ) {
      tempRenderReadyItems[questionIndex] = (
        <MatchingRowContainer key={`${questionIndex} Question Index`}>
          <StyledTypography
            sx={{ textAlign: "left" }}
            key={`${questionIndex} A`}
          >
            {questionIndex + 1}. {promptTerms[questionIndex]}
          </StyledTypography>
          <StyledSelect>{renderReadyStyledOptions}</StyledSelect>
          <StyledTypography
            sx={{ textAlign: "right" }}
            key={`${questionIndex} B`}
          >
            {answerLettersArray[questionIndex]}.{"  "}
            {scrambledTestOnTerms[questionIndex]}
          </StyledTypography>
        </MatchingRowContainer>
      );
    }

    setFinalRenderReadyItems(tempRenderReadyItems);
    setAnswerKey(tempAnswerKey);
    setProcessingState(1);
  }

  return <MatchingTopContainer>{finalrenderReadyItems}</MatchingTopContainer>;
};
export default QuizMatchingCreator;
