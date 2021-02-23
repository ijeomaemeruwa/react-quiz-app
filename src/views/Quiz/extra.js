// const questionsPerPage = 4;
// const totalPages =
//   questions && Math.ceil(questions.length / questionsPerPage);

// const [currentPage, setCurrentPage] = useState(1);
// const [currentQuestions, setCurrentQuestions] = useState([]);
// const [userAnswers, setUserAnswers] = useState([]);

// Save Questions to LocalStorage
// useEffect(() => {
//   const questionsList = JSON.stringify(questions);
//   localStorage.setItem('questions', questionsList)
// }, [questions]);

// useEffect(() => {
//   const storedQuestions = JSON.parse(localStorage.getItem('questions'));
//   if (storedQuestions) setCurrentQuestions(storedQuestions);
// }, [setCurrentQuestions]);

// useEffect(() => {
//   const res = dispatch(getQuizData())
// }, [dispatch]);

//Pagination
//  useEffect(() => {
//    const indexOfLastQuestion = currentPage * questionsPerPage
//    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
//    if(questions) {
//     setCurrentQuestions(questions.slice(indexOfFirstQuestion, indexOfLastQuestion))
//    }
//    window.scrollTo(0, 0)
//  }, [currentPage, questions]);


//  const handleNext = () => {
//   setCurrentPage(prev => prev + 1);
//  }
//  const handlePrev = () => {
//   setCurrentPage(prev => prev - 1);
//  }

//Get Correct answer


// const submitForm = async () => {
//   try{
//     submitting(true);
//     const res = await axios.post('https://hasquiz-api.herokuapp.com/api/submit', 
//     {
//       quizAnswers,
//       quizId: questions[0].quizId
//     })
//     const correctAnsCount = res
//     Swal.fire({
//       icon: 'success',
//       title: 'Quiz Completed!',
//       text: `You scored ${correctAnsCount} out of ${totalQuestions}`,
//       // backdrop: rgba()
//     })
//     setSubmitting(false);
//     history.push('/start');
//   }catch(error){
//     console.log(error)
//     toast.error('Error, try again!')
//     setSubmitting(false);
//   }
// }
// const submit = () => {
//   if(quizAnswers.length < totalQuestions) {  
//     toast.error('Please answer all questions')
//   } else{
//     submitForm();
//   } 
// }
