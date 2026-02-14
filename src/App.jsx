import { useState } from 'react'
import './App.css'

const questions = [
  {
    id: 1,
    question: "What was my favourite place to eat in Berkeley?",
    options: [
      { text: "Toss 🥘", emoji: "🥢" },
      { text: "My-o-My 🥙", emoji: "🌯" },
      { text: "Tane Izakaya 🍣", emoji: "🍱" },
      { text: "Thai Basil 🍛", emoji: "🌶️" }
    ]
  },
  {
    id: 2,
    question: "Which date was the best?",
    options: [
      { text: "East Bay Spice", emoji: "🌶️" },
      { text: "Yurt on Top", emoji: "⛺" },
      { text: "Harlequin", emoji: "🎭" },
      { text: "Lawrence in the backseat ;)", emoji: "🚗" }
    ]
  },
  {
    id: 3,
    question: "Do you want to know your Valentine's Day gift?",
    options: [
      { text: "Yes", emoji: "🎁" },
      { text: "No", emoji: "🙅" }
    ]
  },
  {
    id: 4,
    question: "When did u first start liking me?",
    options: [
      { text: "Always", emoji: "💕" }
    ]
  }
];

function App() {
  const [step, setStep] = useState('welcome'); // welcome, questions, final, celebration, reasons
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [showGutterMessage, setShowGutterMessage] = useState(false);
  const [gutterMessageText, setGutterMessageText] = useState("");
  const [messagesScheduled, setMessagesScheduled] = useState(false);
  const [schedulingStatus, setSchedulingStatus] = useState("");
  const [revealedHearts, setRevealedHearts] = useState([]);

  const handleStart = () => {
    setStep('questions');
  };

  const handleAnswer = (answer) => {
    const questionIndex = currentQuestion;

    // Check if they picked Toss on question 1 (correct answer)
    if (questionIndex === 0 && answer === "Toss 🥘") {
      setGutterMessageText("Proud of you :)");
      setShowGutterMessage(true);
      setTimeout(() => {
        setShowGutterMessage(false);
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
        if (questionIndex < questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStep('final');
        }
      }, 2000);
      return;
    }

    // Check if they picked wrong answer on question 1
    if (questionIndex === 0 && answer !== "Toss 🥘") {
      setGutterMessageText("You are making me meals everyday when I come for guessing this wrong 😤");
      setShowGutterMessage(true);
      setTimeout(() => {
        setShowGutterMessage(false);
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
        if (questionIndex < questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStep('final');
        }
      }, 3000);
      return;
    }

    // Check answers for question 2
    if (questionIndex === 1 && answer === "Yurt on Top") {
      setGutterMessageText("Yurt part 2 has to be done this time hehe");
      setShowGutterMessage(true);
      setTimeout(() => {
        setShowGutterMessage(false);
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
        if (questionIndex < questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStep('final');
        }
      }, 2000);
      return;
    }

    if (questionIndex === 1 && (answer === "East Bay Spice" || answer === "Harlequin")) {
      setGutterMessageText("Damn really 😢");
      setShowGutterMessage(true);
      setTimeout(() => {
        setShowGutterMessage(false);
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
        if (questionIndex < questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStep('final');
        }
      }, 2000);
      return;
    }

    if (questionIndex === 1 && answer === "Lawrence in the backseat ;)") {
      setGutterMessageText("get ur head out of the gutter 🤨");
      setShowGutterMessage(true);
      setTimeout(() => {
        setShowGutterMessage(false);
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
        if (questionIndex < questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStep('final');
        }
      }, 2000);
      return;
    }

    // Check if they picked "Yes" or "No" on question 3
    if (questionIndex === 2 && answer === "Yes") {
      setGutterMessageText("In your dreams 😠");
      setShowGutterMessage(true);
      setTimeout(() => {
        setShowGutterMessage(false);
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
        if (questionIndex < questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStep('final');
        }
      }, 2000);
      return;
    }

    if (questionIndex === 2 && answer === "No") {
      setGutterMessageText("Good, u better not 😌");
      setShowGutterMessage(true);
      setTimeout(() => {
        setShowGutterMessage(false);
        setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
        if (questionIndex < questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
        } else {
          setStep('final');
        }
      }, 2000);
      return;
    }

    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));

    if (questionIndex < questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setStep('final');
    }
  };

  const handleYes = () => {
    setStep('celebration');
  };

  const handleNoHover = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonSize(Math.max(0.3, noButtonSize - 0.1));
  };

  const handleScheduleMessages = async () => {
    // IMPORTANT: Replace this with her actual phone number
    const phoneNumber = "+1XXXXXXXXXX"; // TODO: Add her phone number in format +1234567890

    setSchedulingStatus("Scheduling messages...");

    try {
      const response = await fetch('/api/schedule-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (data.success) {
        setMessagesScheduled(true);
        setSchedulingStatus(`✅ ${data.scheduled.length} sweet messages scheduled!`);
      } else {
        setSchedulingStatus(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      setSchedulingStatus(`❌ Error: ${error.message}`);
    }
  };

  const handleRevealHeart = (index) => {
    if (!revealedHearts.includes(index)) {
      setRevealedHearts([...revealedHearts, index]);
    }
  };

  const handleNextToReasons = () => {
    setStep('reasons');
  };

  if (step === 'welcome') {
    return (
      <div className="container">
        <div className="hearts-background">
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
        </div>
        <div className="card welcome-card">
          <h1 className="title">💝</h1>
          <h2 className="subtitle">HI KASHU</h2>
          <p className="description">Answer a few questions before I ask you something important...</p>
          <button className="start-button" onClick={handleStart}>
            Let's Begin
          </button>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    const question = questions[currentQuestion];
    return (
      <div className="container">
        <div className="hearts-background">
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
        </div>
        <div className="card question-card">
          {showGutterMessage ? (
            <div className="gutter-message">
              <h2 className="gutter-text">{gutterMessageText}</h2>
            </div>
          ) : (
            <>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <h2 className="question-title">{question.question}</h2>
              <div className="options">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button"
                    onClick={() => handleAnswer(option.text)}
                  >
                    <span className="option-emoji">{option.emoji}</span>
                    <span className="option-text">{option.text}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (step === 'final') {
    return (
      <div className="container">
        <div className="hearts-background active">
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
        </div>
        <div className="card final-card">
          <h1 className="final-question">Will You Be My Valentine? 💕</h1>
          <div className="final-buttons">
            <button className="yes-button" onClick={handleYes}>
              Yes! 💖
            </button>
            <button
              className="no-button"
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonSize})`,
                transition: 'transform 0.3s ease'
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'celebration') {
    // Calculate score
    const correctAnswers = {
      0: "Toss 🥘",
      1: "Yurt on Top"
    };

    let score = 0;
    let total = 2; // Only questions 1 and 2 have correct answers

    console.log("Answers object:", answers); // Debug log

    if (answers[0] === correctAnswers[0]) score++;
    if (answers[1] === correctAnswers[1]) score++;

    const percentage = (score / total) * 100;

    return (
      <div className="container celebration">
        <div className="confetti">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#ff6b9d', '#c44569', '#f8b500', '#ff006e', '#ffd166'][Math.floor(Math.random() * 5)]
            }}></div>
          ))}
        </div>
        <div className="card celebration-card">
          <h1 className="celebration-title">🎉 Yay! 🎉</h1>
          <p className="celebration-message">
            Love u so much cutie pie 💖
          </p>
          <div className="big-heart">❤️</div>

          <div className="score-summary">
            <h3 className="score-title">Quiz Results:</h3>
            <p className="score-text">
              Question 1: {answers[0] ? `${answers[0]} - ${answers[0] === correctAnswers[0] ? "✅ Correct" : "❌ Wrong"}` : "❌ No answer"}<br/>
              Question 2: {answers[1] ? `${answers[1]} - ${answers[1] === correctAnswers[1] ? "✅ Correct" : "❌ Wrong"}` : "❌ No answer"}
            </p>
            <p className="score-percentage">Score: {score}/{total} ({percentage}%)</p>
            {percentage === 100 ? (
              <p className="good-job-message">good job, u got all right hehe :)</p>
            ) : (
              <p className="shame-message">shame on u 😠</p>
            )}
          </div>

          <div className="surprise-section">
            <h3 className="surprise-title">One more thing... 💌</h3>
            {!messagesScheduled ? (
              <button className="surprise-button" onClick={handleScheduleMessages}>
                Click for a surprise!
              </button>
            ) : (
              <p className="surprise-success">
                You'll be getting sweet messages from me for the next week! 💕
              </p>
            )}
            {schedulingStatus && (
              <p className="scheduling-status">{schedulingStatus}</p>
            )}
          </div>

          <button className="next-button" onClick={handleNextToReasons}>
            Next →
          </button>
        </div>
      </div>
    );
  }

  if (step === 'reasons') {
    const heartReasons = [
      { text: "Because you're the cutest", top: 20, left: 15 },
      { text: "Your energy is contagious :)", top: 40, left: 70 },
      { text: "You understand me better than anyone 🥹", top: 60, left: 30 },
      { text: "ur tits ;)", top: 25, left: 80 },
      { text: "Need u for the cuddles hehe", top: 75, left: 50 }
    ];

    return (
      <div className="container reasons-page">
        <div className="reasons-background">
          {heartReasons.map((reason, index) => (
            <div
              key={index}
              className={`floating-heart ${revealedHearts.includes(index) ? 'revealed' : ''}`}
              style={{
                top: `${reason.top}%`,
                left: `${reason.left}%`
              }}
              onClick={() => handleRevealHeart(index)}
            >
              {revealedHearts.includes(index) ? (
                <div className="heart-text">{reason.text}</div>
              ) : (
                <div className="heart-icon">❤️</div>
              )}
            </div>
          ))}
        </div>
        <h1 className="reasons-title">Why I love you...</h1>
        <p className="reasons-subtitle">Click the hearts to find out 💕</p>
      </div>
    );
  }
}

export default App
