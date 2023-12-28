import React from 'react'
import { useParams } from 'react-router-dom';

const Diary = () => {

  const { id } = useParams();

  return (
    <div>
      <h2>Diary</h2>
      <p>상세 페이지</p>
    </div>
  )
}

export default Diary;
