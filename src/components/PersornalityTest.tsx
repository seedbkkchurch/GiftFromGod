import React, { useState } from 'react'

// Note: Make sure to include Bootstrap 5 CSS in your project
// You can add it to your layout.tsx or import it here if needed
// import 'bootstrap/dist/css/bootstrap.min.css';

export const PersornalityTest = () => {
  const [personality, setPersonality] = useState({
    EI: '',
    SN: '',
    TF: '',
    JP: '',
  })

  const handleChange = (category: string, value: string) => {
    setPersonality(prev => ({ ...prev, [category]: value }))
  }

  const getPersonalityType = () => {
    return Object.values(personality).join('')
  }

  const personalityTraits = [
    {
      category: 'EI',
      question: 'How do you prefer to interact with the world?',
      options: [
        { value: 'E', label: 'Extrovert (E)' },
        { value: 'I', label: 'Introvert (I)' },
      ],
    },
    {
      category: 'SN',
      question: 'How do you prefer to process information?',
      options: [
        { value: 'S', label: 'Sensing (S)' },
        { value: 'N', label: 'Intuition (N)' },
      ],
    },
    {
      category: 'TF',
      question: 'How do you prefer to make decisions?',
      options: [
        { value: 'T', label: 'Thinking (T)' },
        { value: 'F', label: 'Feeling (F)' },
      ],
    },
    {
      category: 'JP',
      question: 'How do you prefer to organize your life?',
      options: [
        { value: 'J', label: 'Judging (J)' },
        { value: 'P', label: 'Perceiving (P)' },
      ],
    },
  ]

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">MBTI Personality Test</h1>
      <div className="card">
        <div className="card-body text-center">
          {personalityTraits.map(trait => (
            <div key={trait.category} className="mb-4">
              <p className="fw-bold" style={{fontSize:"1.25em"}}>{trait.question}</p>
              <div className="form-check form-check-inline" aria-label={trait.question}>
                {trait.options.map(option => (
                  <React.Fragment key={option.value}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name={trait.category}
                      id={`${trait.category}-${option.value}`}
                      checked={
                        personality[
                          trait.category as keyof typeof personality
                        ] === option.value
                      }
                      onChange={() =>
                        handleChange(trait.category, option.value)
                      }
                      style={{ width:"1.5em",height:"1.5em"}} 
                    />
                    <label
                      className="mr-4 form-check-label"
                      htmlFor={`${trait.category}-${option.value}`}
                    >
                      {option.label}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() =>
                alert(`Your MBTI type is: ${getPersonalityType()}`)
              }
              disabled={Object.values(personality).some(value => value === '')}
            >
              Get My Personality Type
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
