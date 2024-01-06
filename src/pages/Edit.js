import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { DiaryStateContext } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import DiaryEditor from '../components/DiaryEditor'

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [originData, setOrigindata] = useState("");
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setOrigindata(diaryList);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </>
  )
}

export default Edit;