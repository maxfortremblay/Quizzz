import React, { useState } from 'react';
import { Timer } from 'lucide-react';

const QuestionTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  MULTIPLE: 'multiple'
};

const QuizQuestion = ({ question, onAnswer, timeLeft }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const renderMediaContent = () => {
    switch (question.type) {
      case QuestionTypes.IMAGE:
        return (
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={`/media/images/${question.media}`}
              alt={question.question}
              className="w-full h-full object-cover"
            />
          </div>
        );
      case QuestionTypes.AUDIO:
        return (
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 mb-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? 'Pause' : 'Écouter'}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {question.type !== QuestionTypes.TEXT && (
            <div className="p-2 bg-gray-100 rounded-lg">
              {question.type === QuestionTypes.IMAGE ? (
                <img src={`/media/images/${question.media}`} alt={question.question} className="w-5 h-5" />
              ) : (
                <audio controls src={`/media/audio/${question.media}`} className="w-5 h-5" />
              )}
            </div>
          )}
          <span className="text-sm text-gray-500">Question {question.order}/10</span>
        </div>
        <div className="flex items-center space-x-2 text-orange-500">
          <Timer className="w-5 h-5" />
          <span className="font-medium">{timeLeft}s</span>
        </div>
      </div>

      <div className="space-y-6">
        {renderMediaContent()}
        <h2 className="text-xl font-semibold text-gray-800">{question.question}</h2>

        <div className="grid grid-cols-1 gap-4">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedAnswer === answer
                  ? 'bg-purple-100 border-2 border-purple-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 font-medium text-gray-600">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{answer}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;