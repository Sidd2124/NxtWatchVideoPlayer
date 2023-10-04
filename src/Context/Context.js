import React from 'react'

const LanguageContext = React.createContext({
  Active: true,
  changeLanguage: () => {},
})

export default LanguageContext
