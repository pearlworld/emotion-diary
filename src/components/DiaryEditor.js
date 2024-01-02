import React, { useState } from 'react'
import MyButton from './MyButton'
import { useNavigate } from 'react-router-dom';

const DiaryEditor = () => {
  const [data, setData] = useState(getStringDate(new Date()));

  return (
    <div>DiaryEditor</div>
  )
}

export default DiaryEditor