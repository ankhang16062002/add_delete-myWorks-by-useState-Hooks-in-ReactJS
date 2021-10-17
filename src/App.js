/*
   code by Vương An Khang, Học Viện Công Nghệ Bưu Chính Viễn Thông

   Thêm sửa xóa công việc hằng ngày sử dụng useState Hooks in ReactJS

   ------------------------------------------------------------------
   -----nhập tên công việc và add vào công việc hằng ngày
   -----click checkbox để chọn những công việc mà bạn cần xóa 
   -----Chú ý: - dữ liệu lưu xóa sẽ được lưu vào bộ nhớ localstorge tạm thời, và khi render lại trang sẽ không bị mất
   -----       - đây là code luyện khi mình học ReactJS nên có nhiều sai sót, mong các bạn thông cảm :3
 */



import React, {useState} from 'react'

function App() {
  //includes value of input type: input
  const [newinput, setNewInput] = useState('')
  //includes many works is added
  const [works, setWorks] = useState(() => {
    
    const oldWorks = localStorage.getItem('works')   //save to localstorge
    return JSON.parse(oldWorks)
  })
  //includes many works to delete when checkbox input
  const [worksdelete, setWorksdelete] = useState([])

  //slove to add works when button add is onClicked
  const handleAdd = () => {
    setWorks(pre => {
      const newWorks = [...pre, newinput]
      //store in localstorge
      localStorage.setItem('works', JSON.stringify(newWorks))
      //reset value input by ''
      setNewInput('')

      return newWorks
    })
  }

  //slove to remove works when button delete is onClicked
  const handleDelete = () => {
    let newworks = works
    //filter worksdelete in works
    worksdelete.forEach((workdelete) => {
      newworks = newworks.filter((work) => work !== workdelete)
    })

    localStorage.setItem('works', JSON.stringify(newworks))
    //include repeat- works
    setWorks(newworks)
    //reset worksdekete by []
    setWorksdelete([])
  }

  //slove when input checkbox is selected
  const handleChangeCheck = (work) => {
    let newworksdelete

    if(worksdelete.includes(work)) {
      newworksdelete = worksdelete.filter((item) => item !== work)
    }else {
      newworksdelete = [...worksdelete, work]
    }
    setWorksdelete(newworksdelete)
  }


  return (
    <div style = {{padding: 20}}>
      <input 
        value = {newinput}
        onChange = {(e) => setNewInput(e.target.value)}
      />

      <button 
        onClick = {() => handleAdd()}
        style = {{marginLeft: 10}}
      >Add
      </button>

      <button
        style = {{marginLeft: 10}}
        onClick = {() => handleDelete()}
      >Delete
      </button>

      <ul>
        {
          works.map((work) => {
             return (
               <div key = {work}>
                 <input 
                 type = 'checkbox'
                 onChange = {() => handleChangeCheck(work)}
                 checked = {worksdelete.includes(work) ? true : false}
                />
                 {work}
               </div>
             )
          })
        }
      </ul>
    </div>
  )
}

export default App;


