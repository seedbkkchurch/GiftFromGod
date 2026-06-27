import React, { useState, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { surveyQuestions } from '../data/qunstions'
import { spiritualGiftsKey, type SpiritualGifts } from '../data/spiritualGifts'
import type { Question } from '../@types/Question'
import HoverImage from './HoverImage'

type ExportTab = 'image' | 'text'
type TextFormat = 'markdown' | 'plain'


const STORAGE_KEY = 'tableSum_state'

export const TableSum: React.FC = () => {
  const [sums, setSums] = useState<number[]>(
    Array(spiritualGiftsKey.length).fill(0)
  )
  const [yourName, setYourName] = useState('')
  const [answers, setAnswers] = useState<{ [key: string]: string }>(() => {
    const defaults: { [key: string]: string } = {}
    surveyQuestions.forEach(q => {
      defaults[`${q.index}`] = '3'
    })
    return defaults
  })
  const [exportTab, setExportTab] = useState<ExportTab>('image')
  const [textFormat, setTextFormat] = useState<TextFormat>('markdown')
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle')
  const captureRef = React.useRef<HTMLDivElement>(null)
  const resultRef = React.useRef<HTMLDivElement>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.yourName !== undefined) setYourName(parsed.yourName)
      if (parsed.answers) setAnswers(parsed.answers)
      if (parsed.sums) setSums(parsed.sums)
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ yourName, answers, sums })
    )
  }, [yourName, answers, sums])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const selectedValues: { index: string; value: number }[] = Object.entries(
      answers
    )
      .filter(([key]) => key !== 'yourName')
      .map(([key, value]) => ({ index: key, value: parseInt(value) }))

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
    console.log('handleScreenshot')
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
  const buildMarkdownText = () => {
    const header = `| ชื่อของประทาน | รวม (คะแนนเต็ม 15) |\n| --- | --- |`
    const rows = spiritualGiftsKey
      .map((item: SpiritualGifts, index: number) => `| ${item.Gift} | ${sums[index]} |`)
      .join('\n')
    return `${yourName ? `Stat ของประทานของ ${yourName}\n\n` : ''}${header}\n${rows}`
  }

  const buildPlainText = () => {
    const col1Header = 'ชื่อของประทาน'
    const col2Header = 'รวม (คะแนนเต็ม 15)'
    // นับเฉพาะ character ที่มีความกว้างจริง — ตัด Thai combining marks ออก
    //
    const visualLen = (s: string) =>
      [...s].filter(c => {
        const code = c.charCodeAt(0)
        return !(
          code === 0x0e31 ||                        // ั
          (code >= 0x0e34 && code <= 0x0e3a) ||     // ิ ี ึ ื ุ ู ฺ
          (code >= 0x0e47 && code <= 0x0e4e)        // ็ ่ ้ ๊ ๋ ์ ํ ๎
        )
      }).length
    const maxLen = Math.max(
      visualLen(col1Header),
      ...spiritualGiftsKey.map((item: SpiritualGifts) => visualLen(item.Gift))
    )
    const pad = (s: string) => s + ' '.repeat(maxLen - visualLen(s) + 4)
    const header = `${pad(col1Header)}${col2Header}`
    const sep = '-'.repeat(maxLen + col2Header.length + 4)
    const rows = spiritualGiftsKey
      .map((item: SpiritualGifts, index: number) => `${pad(item.Gift)}${sums[index]}`)
      .join('\n')
    return `${yourName ? `Stat ของประทานของ ${yourName}\n\n` : ''}${header}\n${sep}\n${rows}`
  }

  const handleCopyText = () => {
    const text = textFormat === 'markdown' ? buildMarkdownText() : buildPlainText()
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus('copied')
      setTimeout(() => setCopyStatus('idle'), 2000)
    })
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
                  {['3', '2', '1', '0'].map(val => (
                    <td key={val}>
                      <input
                        type="radio"
                        name={`${item.index}`}
                        value={val}
                        checked={answers[`${item.index}`] === val}
                        onChange={() =>
                          setAnswers(prev => ({
                            ...prev,
                            [`${item.index}`]: val,
                          }))
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="card border-warning mb-3 mt-4"
            style={{ borderWidth: '2px' }}
          >
            <div className="card-header bg-warning text-dark fw-bold fs-5">
              📋 ขั้นตอน (กรุณาอ่านก่อนบันทึก)
            </div>
            <div className="card-body">
              <ol className="mb-0 fs-6" style={{ lineHeight: '2' }}>
                <li>
                  <strong>ทำให้ครบ 125 ข้อ</strong> — ตอบทุกข้อในตารางด้านบน
                </li>
                <li>
                  <strong>กด Calculate</strong> — เพื่อคำนวณคะแนนของประทาน
                </li>
                <li>
                  <strong>ใส่ชื่อในฟอร์ม</strong> —
                  พิมพ์ชื่อของตัวเองในช่องด้านล่าง
                </li>
                <li>
                  <strong>กด บันทึกรูปภาพหรือกดบันทึกเป็นtextตาราง Stat</strong> —
                  เพื่อบันทึกผลลัพธ์เก็บไว้ หรือคัดลอกข้อความตาราง Stat ไปใช้ต่อ
                </li>
                <li>
                  <strong>NOTE สำหรับการบันทึกภาพ</strong> —
                  ถ้ากด link จาก  message or facebook or ig จะมีปัญหาเรื่องการบันทึกภาพให้ copy link ของหน้าเว็บนี้ไปเปิดใน browser  หรือ copy text ไปจะง่ายกว่า
                </li>
              </ol>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Calculate
          </button>

          <input
            className="form-control form-control-lg mt-3"
            type="text"
            placeholder="พิมพ์ชื่อของตัวเอง..."
            name="yourName"
            value={yourName}
            onChange={handleInputChange}
          />

          {/* Export Tabs */}
          <div className="mt-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${exportTab === 'image' ? 'active' : ''}`}
                  onClick={() => setExportTab('image')}
                >
                  📷 บันทึกรูปภาพ
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${exportTab === 'text' ? 'active' : ''}`}
                  onClick={() => setExportTab('text')}
                >
                  📋 คัดลอกข้อความ
                </button>
              </li>
            </ul>

            <div className="border border-top-0 rounded-bottom p-3">
              {exportTab === 'image' && (
                <div>
                  <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                    ดาวน์โหลดตาราง Stat เป็นไฟล์รูปภาพ (.png)
                  </p>
                  <button
                    type="button"
                    onClick={handleScreenshot}
                    className="btn btn-secondary"
                  >
                    📥 บันทึกรูปภาพตาราง Stat
                  </button>
                  <div ref={resultRef} className="mt-3"></div>
                </div>
              )}

              {exportTab === 'text' && (
                <div>
                  {/* Format selector */}
                  <div className="mb-3">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="fmt-markdown"
                        name="textFormat"
                        checked={textFormat === 'markdown'}
                        onChange={() => setTextFormat('markdown')}
                      />
                      <label className="form-check-label" htmlFor="fmt-markdown">
                        Markdown Table
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="fmt-plain"
                        name="textFormat"
                        checked={textFormat === 'plain'}
                        onChange={() => setTextFormat('plain')}
                      />
                      <label className="form-check-label" htmlFor="fmt-plain">
                        Plain Text (เว้นวรรคตรงคอลัมน์)
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className={`btn mb-3 ${copyStatus === 'copied' ? 'btn-success' : 'btn-outline-primary'}`}
                  >
                    {copyStatus === 'copied' ? '✅ คัดลอกแล้ว!' : '📋 คัดลอกข้อความ'}
                  </button>

                  {/* Preview */}
                  <div
                    className="p-3 bg-light rounded"
                    style={{ fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre', overflowX: 'auto' }}
                  >
                    {textFormat === 'markdown' ? buildMarkdownText() : buildPlainText()}
                  </div>
                </div>
              )}
            </div>
          </div>
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
            {spiritualGiftsKey.map((item: SpiritualGifts, index: number) => (
              <tr key={item.Gift}>
                <td>{sums[index]}</td>
                <td>
                  {item.Gift} <HoverImage pathImages={item.pathImages} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
