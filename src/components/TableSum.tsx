import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import { surveyQuestions } from '../data/qunstions'
import { spiritualGiftsKey } from '../data/spiritualGifts'
import type { Question } from '../@types/Question'

export const TableSum: React.FC = () => {
  const [sums, setSums] = useState<number[]>(
    Array(spiritualGiftsKey.length).fill(0)
  )
  const [yourName, setYourName] = useState('')
  const captureRef = React.useRef<HTMLDivElement>(null)
  const resultRef = React.useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const selectedValues: { index: string; value: number }[] = []

    for (let [name, value] of formData.entries()) {
      selectedValues.push({ index: name, value: parseInt(value as string) })
    }

    const spiritualGifts: { [key: string]: { list: number[]; sum: number } } = {
      เผยพระวจนะ: { list: [1, 26, 51, 76, 101], sum: 0 },
      อภิบาล: { list: [2, 27, 52, 77, 102], sum: 0 },
      การสอน: { list: [3, 28, 53, 78, 103], sum: 0 },
      ถ้อยคำประกอบด้วยสติปัญญา: { list: [4, 29, 54, 79, 104], sum: 0 },
      ถ้อยคำประกอบด้วยความรู้: { list: [5, 30, 55, 80, 105], sum: 0 },
      การตักเตือนและหนุนใจ: { list: [6, 31, 56, 81, 106], sum: 0 },
      การสังเกตวิญญาณ: { list: [7, 32, 57, 82, 107], sum: 0 },
      การบริจาค: { list: [8, 33, 58, 83, 108], sum: 0 },
      การปรนนิบัติ: { list: [9, 34, 59, 84, 109], sum: 0 },
      ความเมตตา: { list: [10, 35, 60, 85, 110], sum: 0 },
      มิชชันนารี: { list: [11, 36, 61, 86, 111], sum: 0 },
      ผู้ประกาศ: { list: [12, 37, 62, 87, 112], sum: 0 },
      การรับรองแขก: { list: [13, 38, 63, 88, 113], sum: 0 },
      ความเชื่อ: { list: [14, 39, 64, 89, 114], sum: 0 },
      ผู้ครอบครอง: { list: [15, 40, 65, 90, 115], sum: 0 },
      ผู้บริหาร: { list: [16, 41, 66, 91, 116], sum: 0 },
      การอัศจรรย์: { list: [17, 42, 67, 92, 117], sum: 0 },
      การรักษาโรค: { list: [18, 43, 68, 93, 118], sum: 0 },
      การพูดภาษาแปลก: { list: [19, 44, 69, 94, 119], sum: 0 },
      การแปลภาษาแปลก: { list: [20, 45, 70, 95, 120], sum: 0 },
      อัครทูต: { list: [21, 46, 71, 96, 121], sum: 0 },
      การอยู่เป็นโสด: { list: [22, 47, 72, 97, 122], sum: 0 },
      การอธิษฐานอ้อนวอน: { list: [23, 48, 73, 98, 123], sum: 0 },
      การขับผี: { list: [24, 49, 74, 99, 124], sum: 0 },
      ผู้อุปการะ: { list: [25, 50, 75, 100, 125], sum: 0 },
    }

    const keys = Object.keys(spiritualGifts)

    selectedValues.forEach(item => {
      keys.forEach(key => {
        const list = spiritualGifts[key].list
        if (list.includes(parseInt(item.index))) {
          spiritualGifts[key].sum += item.value
        }
      })
    })

    const newSums = keys.map(key => spiritualGifts[key].sum)
    setSums(newSums)
  }

  const handleScreenshot = async () => {
    console.log("handleScreenshot")
    if (captureRef.current && resultRef.current) {
      const canvas = await html2canvas(captureRef.current)
      const img = document.createElement('img')
      img.src = canvas.toDataURL('image/png')
      img.style.width = '300px' // Set the desired width
      img.style.height = 'auto' // Maintain aspect ratio
      resultRef.current.innerHTML = '' // Clear any previous image
      resultRef.current.appendChild(img) // Append the screenshot image

      // Create a link element to download the image
      const link = document.createElement('a')
      link.href = img.src
      link.download = 'screenshot.png' // Set the desired file name
      link.click() // Trigger the download
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYourName(e.target.value)
  }
  return (
    <div>
      <div className="container mt-5">
        <h1 className="mb-4">แบบสํารวจของประทานฝ่ายวิญญาณ</h1>
        <form onSubmit={handleSubmit}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ลำดับ</th>
                <th scope="col">คำถามสำรวจของประทาน</th>
                <th scope="col">มาก 3</th>
                <th scope="col">บ้าง 2</th>
                <th scope="col">น้อย 1</th>
                <th scope="col">ไม่มี 0</th>
              </tr>
            </thead>
            <tbody id="surveyQuestions">
              {surveyQuestions.map((item: Question) => (
                <tr key={item.index}>
                  <th scope="row">{item.index}</th>
                  <td>{item.question}</td>
                  <td>
                    <input
                      type="radio"
                      name={`${item.index}`}
                      value="3"
                      defaultChecked
                    />
                  </td>
                  <td>
                    <input type="radio" name={`${item.index}`} value="2" />
                  </td>
                  <td>
                    <input type="radio" name={`${item.index}`} value="1" />
                  </td>
                  <td>
                    <input type="radio" name={`${item.index}`} value="0" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="submit" className="btn btn-primary mt-3 mr-4">
              Calculate
            </button>
            <button
              onClick={handleScreenshot}
              className="btn btn-secondary mt-3 mr-4"
            >
              Take Screenshot
            </button>
          </div>
          <input
            className="form-control form-control-lg mt-2"
            type="text"
            placeholder="พิมพ์ชื่อของตัวเอง..."
            name="yourName"
            value={yourName}
            onChange={handleInputChange}
          />

          <div ref={resultRef} className="mt-3"></div> 
        </form>
      </div>
      <div className="container mt-5" ref={captureRef}>
        <h2>Stat ของประทานของ {yourName}</h2>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">รวม (คะแนนเต็ม 15)</th>
              <th scope="col">ชื่อของประทาน</th>
            </tr>
          </thead>
          <tbody>
            {spiritualGiftsKey.map((item: string, index: number) => (
              <tr key={index}>
                <td>{sums[index]}</td>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
